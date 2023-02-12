import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext } from 'react'

import AppContext from '../context/AppContext'
import { BaseURL } from '../ultis/Constants'

import { assets, COLORS, FONTS, SHADOWS, SIZES } from '../constants'

const SettingScreen = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    let token = appContext.loginState.token;

    const logout = async (token) => {
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/auth/logout`,
                {},
                {
                    params: {
                        token: token
                    }
                }
            )
            console.log(JSON.stringify(res.data.data))
            appContext.dispatch({
                type: 'LOGOUT'
            })
            navigation.navigate("SignIn")
        } catch (error) {
            console.log(JSON.stringify(error.message))
        }
    }

    const logoutButton = () => {
        Alert.alert("Alert", "Are you sure to logging out?", [
            {
                text: "Yes",
                onPress: () => logout(token)
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel logout"),
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.push("ChangePass")}
                    style={{
                        width: "90%",
                        height: 48,
                        backgroundColor: "#DDDDDD",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        marginVertical: 10,
                        marginTop: 20,
                        backgroundColor: "white",
                        ...SHADOWS.dark
                    }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>Đổi mật khẩu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logoutButton}
                    style={{
                        width: "90%",
                        height: 48,
                        backgroundColor: "#DDDDDD",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        marginVertical: 10,
                        backgroundColor: "white",
                        ...SHADOWS.dark
                    }}>
                    <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.medium }}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default SettingScreen