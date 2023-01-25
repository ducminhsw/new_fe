import React, {useState} from "react";
import { Text, View, Image, StyleSheet, useWindowDimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigationContainerRef } from "@react-navigation/native";
import Logo from "../assets/images/Facebook_f_logo_(2019).svg.png";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import * as RootNavigation from "../navigation/RootNavigation"


const SignIn = () => {
    const {height} = useWindowDimensions();
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);

    const axios = require('axios').default
    const baseUrl = 'https://91ed-2402-800-6173-d69d-9970-5275-891d-26df.ap.ngrok.io'
    // const baseUrl = 'http://localhost:8080'
    const ref = useNavigationContainerRef()

    const onLoginPressed = () => {
    axios.post(`${baseUrl}/it4788/auth/login?phonenumber=${phonenumber}&password=${password}`)
        .then((response) => {
            let token = response.data.data.token
            console.log(token)
        }).catch((error) => {
            console.log(JSON.stringify(error))
        })
    };
    const onForgotPasswordPressed = () => {

    };
    const onSignUpPressed = () => {
        RootNavigation.navigate("SignUp")
    };


    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source = {Logo} 
                style = {[styles.logo, {height: height * 0.3}]}
                resizeMode = "contain" 
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
                        {secure?
                            <Image source={require('../assets/visible.jpg')} style={{width: '100%', height: '100%', color: '#E8E8E8'}} resizeMode='contain'/> 
                            :
                            <Image source={require('../assets/notvisible.jpg')} style={{width: '100%', height: '100%', color: '#E8E8E8'}} resizeMode='contain'/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.signInButtonGroup}>
                <CustomButton
                    text="Đăng nhập"
                    onPress={onLoginPressed}
                />
                <CustomButton
                    text="Quên mật khẩu?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
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