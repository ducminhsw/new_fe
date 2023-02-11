import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Image, StyleSheet, useWindowDimensions, SafeAreaView, TouchableOpacity, ImageComponent, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import io from "socket.io-client"

import Logo from "../assets/images/facebook_logo.png";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput"
import { BaseURL } from "../ultis/Constants"
import AppContext from "../context/AppContext";

const SignIn = () => {
    const navigation = useNavigation()
    const netinfo = useNetInfo()
    const appContext = useContext(AppContext)

    const { height } = useWindowDimensions();
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    const axios = require('axios').default

    const onLoginPressed = async () => {
        if (!netinfo.isConnected || !netinfo.isInternetReachable) {
            Alert.alert(
                "Lỗi mạng",
                "Kết nối không thành công, kiểm tra kết nối với mạng và thử lại",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ]
            )
            return
        }
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/auth/login`,
                {},
                {
                    params: {
                        phonenumber: phonenumber,
                        password: password
                    }
                }
            )
            const user_data = res.data.data
            appContext.dispatch({
                type: 'LOGIN',
                user_id: user_data.id,
                token: user_data.token,
                username: user_data.username,
                description: user_data.description,
                address: user_data.address,
                city: user_data.city,
                country: user_data.city,
                link: user_data.link,
                birthday: user_data.birthday.slice(0, 10),
                avatarURL: user_data.avatar,
                coverImgURL: user_data.coverImage,
                socket: io("http://192.168.1.11:3001")
            })
            navigation.navigate("Home")

            // get_list_friend
            try {
                const res_friend = await axios.post(
                    `${BaseURL}/it4788/friend/get_user_friends`,
                    {},
                    {
                        params: {
                            token: user_data.token,
                            index: 0,
                            count: 20,
                            user_id: user_data.user_id
                        }
                    }
                )
                console.log(res_friend.data.data.friends)
                appContext.dispatch({
                    type: 'SET_FRIEND_LIST',
                    friend_list: res_friend.data.data.friends
                })
            } catch (error) {
                appContext.dispatch({
                    type: 'SET_FRIEND_LIST_EMPTY'
                })
            }

            // get_list_block
            try {
                const res_block = await axios.post(
                    `${BaseURL}/it4788/friend/get_list_blocks`,
                    {},
                    {
                        params: {
                            token: user_data.token,
                            index: 0,
                            count: 10
                        }
                    }
                )
                console.log(res_block.data.data)
                appContext.dispatch({
                    type: 'SET_BLOCKED_LIST',
                    block_list: res_block.data.data.blockedList
                })
            } catch (error) {
                appContext.dispatch({
                    type: 'SET_BLOCKED_LIST_EMPTY'
                })
            }

            // get_request_received
            try {
                const res_block = await axios.post(
                    `${BaseURL}/it4788/friend/get_requested_friends`,
                    {},
                    {
                        params: {
                            token: user_data.token,
                            index: 0,
                            count: 100
                        }
                    }
                )
                console.log(res_block.data.data)
                appContext.dispatch({
                    type: 'SET_RECEIVE_LIST',
                    requested_receive: res_block.data.data.friendRequestReceived
                })
            } catch (error) {
                appContext.dispatch({
                    type: 'SET_RECEIVE_LIST_EMPTY'
                })
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            if (JSON.stringify(error) == "[AxiosError: timeout exceeded]") {
                Alert.alert(
                    "Lỗi mạng",
                    "Không thể gửi yêu cầu, kiểm tra lại kết nối mạng",
                    [
                        {
                            text: "OK",
                            style: 'cancel'
                        }
                    ]
                )
            }
            Alert.alert(
                "Lỗi",
                "Có lỗi về tài khoản, hoặc đường truyền  của bạn, xin vui lòng kiểm tra lại",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ]
            )
        }
    };

    const onSignUpPressed = () => {
        navigation.push("SignUp")
    };


    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={Logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />
            <View style={styles.inputGroup}>
                <CustomInput
                    placeholder="Số điện thoại"
                    value={phonenumber}
                    setValue={setPhoneNumber}
                />
                <View style={styles.password}>
                    <CustomInput
                        placeholder="Mật khẩu"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={secure}
                    />
                    <TouchableOpacity style={styles.visible} onPress={() => setSecure(!secure)} activeOpacity={0.7}>
                        {secure ?
                            <Image source={require('../assets/icons/visible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                            :
                            <Image source={require('../assets/icons/notvisible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.signInButtonGroup}>
                <CustomButton
                    text="Đăng nhập"
                    onPress={onLoginPressed}
                />
            </View>
            <View
                style={styles.line}
            />
            <View style={styles.registerGroup}>
                <CustomButton
                    text="Tạo tài khoản mới"
                    onPress={onSignUpPressed}
                    type="SECONDARY"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    root: {
        justifyContent: 'center',
        padding: 20,
        flex: 1
    },
    logo: {
        width: '30%',
        maxWidth: 300,
        height: 100,
        marginHorizontal: '35%'
    },
    inputGroup: {
        marginVertical: '10%'
    },
    signInButtonGroup: {
        marginTop: '25%'
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '80%',
        marginLeft: '10%',
        marginTop: 10,
    },
    registerGroup: {
        marginVertical: 10,
    },
    visible: {
        height: 30,
        width: 25,
        position: 'absolute',
        right: '8%',
        alignSelf: 'center',
    },
    password: {
        flexDirection: 'row'
    }
})

export default SignIn;