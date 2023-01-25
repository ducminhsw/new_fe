import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import Logo from '../assets/imagesFacebook_f_logo_(2019).svg.png'
import MyDatePicker from './DatePicker'
import * as RootNavigation from '../navigation/RootNavigation'


const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [secure, setSecure] = useState(true);
    const [selectedDate, setSelectedDate] = useState('');
    const [open, setOpen] = useState(true);

    const axios = require('axios').default
    const baseUrl = 'https://91ed-2402-800-6173-d69d-9970-5275-891d-26df.ap.ngrok.io'
    // const baseUrl = 'http://localhost:8080'

    const onRulePressed = () => {

    };
    const onReturnPressed = () => {
        RootNavigation.navigate('SignIn')
    };
    const onNextPressed = () => {
        if (passwordRe != password) {
            console.warn("Mật khẩu nhập lại không khớp!")
        } else {
            axios.post(`${baseUrl}/it4788/auth/signup?name=${username}&password=${password}&phonenumber=${phoneNumber}&birthday=${selectedDate}`)
                .then((response) => {
                    let verifyCode = response.data.data.verifyCode
                    console.log(verifyCode)
                }).catch((error) => {
                    console.log(error)
                    console.log(JSON.stringify(error))
                })
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Đăng ký tài khoản</Text>
            <Image 
                source = {Logo} 
                resizeMode = "contain"
                style={styles.logo}
            />
            <View style={styles.form}>
                <CustomInput
                    placeholder="Tên"
                    value={firstName}
                    setValue={setFirstName}
                />
                <CustomInput
                    placeholder="Họ"
                    value={lastName}
                    setValue={setLastName}
                />
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
                        {secure?
                            <Image source={require('../assets/visible.jpg')} style={{width: '100%', height: '100%', color: '#E8E8E8'}} resizeMode='contain'/> 
                            :
                            <Image source={require('../assets/notvisible.jpg')} style={{width: '100%', height: '100%', color: '#E8E8E8'}} resizeMode='contain'/>
                        }
                    </TouchableOpacity>
                </View>
                <CustomInput
                    placeholder="Nhập lại mật khẩu"
                    value={passwordRe}
                    setValue={setPasswordRe}
                    secureTextEntry
                />
            </View>
            <Text style={styles.birthdayText}>Sinh nhật</Text>
            <MyDatePicker
                date={selectedDate}
                setSelectedDate={setSelectedDate}
            />
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
        </SafeAreaView>
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
        marginTop: '10%'
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