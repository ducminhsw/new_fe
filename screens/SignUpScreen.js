import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Logo from '../assets/images/facebook_logo.png'
import MyDatePicker from '../components/DatePicker'
import { useNavigation } from '@react-navigation/native'
import { BaseURL } from '../ultis/Constants'
import { useNetInfo } from '@react-native-community/netinfo'

const SignUp = () => {
    const navigation = useNavigation()
    const netinfo = useNetInfo()

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [secure, setSecure] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');

    const axios = require('axios').default
    const checkConnect = () => {
        return (!netinfo.isConnected || !netinfo.isInternetReachable)
    }

    var checkUserPassword = (password) => {
        var regex = /^[A-Za-z\d]{6,10}$/;
        return regex.test(password);
    }

    const onRulePressed = () => {

    };
    const onReturnPressed = () => {
        navigation.navigate('SignIn')
    };
    const onNextPressed = async () => {
        if (passwordRe != password) {
            Alert.alert("Lỗi mật khẩu",
                "Mật khẩu không khớp",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ])
        } else if (password == '' || passwordRe == '' || username == '' || phoneNumber == '' || selectedDate == '') {
            Alert.alert("Lỗi bỏ trống",
                "Bạn chưa điền đầy đủ thông tin",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ])
        } else if (phoneNumber == password || phoneNumber == passwordRe) {
            Alert.alert("Lỗi dữ liệu",
                "Mật khẩu không thể trùng số điện thoại",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ])
        } else if (!checkUserPassword(password)) {
            Alert.alert("Lỗi dữ liệu",
                "Mật khẩu chứa 6 ~ 10 ký tự, không chứa ký tự đặc biệt",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ])
        } else if (!netinfo.isConnected || !netinfo.isInternetReachable) {
            console.log(checkConnect)
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
        } else {
            try {
                const res = await axios.post(
                    `${BaseURL}/it4788/auth/signup`,
                    {},
                    {
                        params: {
                            name: username,
                            password: password,
                            phonenumber: phoneNumber,
                            birthday: selectedDate
                        }
                    })
                console.log(res.data)
                navigation.navigate('SignIn')
            } catch (error) {
                console.log(error)
                Alert.alert("Lỗi số điện thoại",
                    "Số điện thoại đã được sử dụng",
                    [
                        {
                            text: "OK",
                            style: 'cancel'
                        }
                    ])
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <Text style={styles.header}>Đăng ký tài khoản</Text>
                <Image
                    source={Logo}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <View style={styles.form}>
                    <CustomInput
                        placeholder="Tên đăng nhập"
                        value={username}
                        setValue={setUsername}
                    />
                    <CustomInput
                        placeholder="Số điện thoại"
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                    />
                    <View style={styles.password}>
                        <CustomInput
                            placeholder="Mật khẩu"
                            value={password}
                            setValue={setPassword}
                            secureTextEntry={secure}
                        />
                        <TouchableOpacity style={styles.visible} onPress={() => setSecure(!secure)}>
                            {secure ?
                                <Image source={require('../assets/icons/visible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                                :
                                <Image source={require('../assets/icons/notvisible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.password}>
                        <CustomInput
                            placeholder="Nhập lại mật khẩu"
                            value={passwordRe}
                            setValue={setPasswordRe}
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.visible} onPress={() => setSecure(!secure)}>
                            {secure ?
                                <Image source={require('../assets/icons/visible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                                :
                                <Image source={require('../assets/icons/notvisible.jpg')} style={{ width: '100%', height: '100%', color: '#E8E8E8' }} resizeMode='contain' />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.birthdayText}>Sinh nhật</Text>
                    <MyDatePicker
                        date={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </View>
                <View style={styles.rule}>
                    <Text style={styles.ruleText}>
                        Nhấn xác nhận đồng nghĩa với bạn đã đọc và đồng ý với{' '}
                        <Text style={styles.link} onPress={onRulePressed}>điều khoản dịch vụ{' '}</Text>
                        và{' '}
                        <Text style={styles.link}>chính sách bảo mật{' '}</Text>
                        của chúng tôi.
                    </Text>
                </View>
                <View style={styles.naviButton}>
                    <CustomButton
                        text="Quay lại"
                        onPress={onReturnPressed}
                        type="LEFT"
                    />
                    <CustomButton
                        text="Xác nhận"
                        onPress={onNextPressed}
                        type="RIGHT"
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

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
    header: {
        marginTop: 60,
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',

    },
    link: {
        color: 'blue',
        fontStyle: 'italic'
    },
    logo: {
        width: '30%',
        maxWidth: 300,
        height: 100,
        marginHorizontal: '35%',
        marginTop: 15,
    },
    form: {
        marginTop: '10%',
        justifyContent: "center"
    },
    naviButton: {
        flexDirection: 'row',
    },
    birthdayText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginHorizontal: '5%'
    },
    rule: {
        marginHorizontal: '5%',
        textAlign: 'center'
    },
    ruleText: {
        fontSize: 15,
        alignSelf: 'center',
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
});

export default SignUp;