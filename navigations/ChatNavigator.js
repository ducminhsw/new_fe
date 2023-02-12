import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeChatTabs from "./HomeChatTabs";
import { Button, Image, StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
// import HeaderButtons from "../components/HeaderButtons";
import ChatView from "../screens/ChatView";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import UserInfo from "../screens/UserInfo";
import axios from "axios";
import AppContext from "../context/AppContext";
import { BaseURL } from "../ultis/Constants";

const ChatNavigator = () => {
    const Stack = createStackNavigator();
    const appContext = useContext(AppContext)

    var USER_INFO = [{}];

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={
                        ({ navigation }) => ({
                            title: 'Message',
                            headerLeft: () => {
                                return <Image style={styles.image} source={{
                                        uri: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                                    }} />
                            },
                            headerLeftContainerStyle: {
                                paddingHorizontal: 10
                            },
                            headerRightContainerStyle: {
                                paddingHorizontal: 10
                            }
                        })
                    }
                    name="HomeChat"
                    component={HomeChatTabs}
                />
                <Stack.Screen
                    name="ChatView"
                    component={ChatView}
                    options={
                        ({ navigation, route }) => ({
                            title: null,
                            headerRight: () => {
                                const openUserInfo = async () => {

                                    console.log(route.params.partner_id);
                                    try {
                                        const res = await axios.post(
                                            `${BaseURL}/it4788/user/get_user_info`,
                                            {},
                                            {
                                                params: {   // Login token
                                                    token: appContext.loginState.token,
                                                    user_id: route.params.partner_id
                                                }
                                            }
                                        )
                                        console.log(res.data.data.username);
                                        const user_info = res.data.data
                                        navigation.navigate("ProfileView", { user_info });
                                    } catch (error) {
                                        console.log(`error: ${error}`);
                                        Alert.alert(
                                            "Lỗi lấy thông tin",
                                            "Không thể lấy thông tin User",
                                            [
                                                {
                                                    text: "OK",
                                                    style: 'cancel'
                                                }
                                            ]
                                        )
                                    }
                                }
                                return (
                                    <View style={styles.chatViewHeaderRightContainer}>
                                        <TouchableOpacity style={styles.info}>
                                            <FontAwesome5 onPress={openUserInfo} name="info-circle" size={responsiveFontSize(3)} color="#006AFF" />
                                        </TouchableOpacity>
                                    </View>
                                )
                            },
                            headerLeft: () => {
                                const openUserInfo = async () => {
                                    console.log(route.params.partner_id);
                                    try {
                                        const res = await axios.post(
                                            `${BaseURL}/it4788/user/get_user_info`,
                                            {},
                                            {
                                                params: {   // Login token
                                                    token: appContext.loginState.token,
                                                    user_id: route.params.partner_id
                                                }
                                            }
                                        )
                                        console.log(res.data.data.username);
                                        const user_info = res.data.data
                                        navigation.navigate("ProfileView", { user_info });
                                    } catch (error) {
                                        console.log(`error: ${error}`);
                                        Alert.alert(
                                            "Lỗi lấy thông tin",
                                            "Không thể lấy thông tin User",
                                            [
                                                {
                                                    text: "OK",
                                                    style: 'cancel'
                                                }
                                            ]
                                        )
                                    }
                                }
                                return (
                                    <View style={styles.chatViewHeaderLeftContainer}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                            <Ionicons name="md-arrow-back" size={responsiveFontSize(3)} color="#006AFF" />
                                        </TouchableOpacity>
                                        <View style={styles.chatViewProPicContainer}>
                                            <Image style={styles.profilePic} source={{ uri: 'https://i.imgur.com/6oU7JoG.jpg' }} />
                                        </View>
                                        <View>
                                            <Text onPress={openUserInfo} style={styles.name}>{route.params.username}</Text>
                                        </View>

                                    </View>
                                )
                            },
                            headerLeftContainerStyle: {
                                paddingHorizontal: 10
                            }
                        })
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ChatNavigator

const styles = StyleSheet.create({
    image: {
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        borderRadius: 200
    },
    profilePic: {
        borderRadius: 200,
        width: responsiveHeight(5),
        height: responsiveHeight(5),
    },
    chatViewHeaderLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold'
    },
    chatViewProPicContainer: {
        padding: 10
    },
    chatViewHeaderRightContainer: {
        flexDirection: 'row'
    },
    info: {
        paddingHorizontal: 10
    }
    // lastOnlineText: {
    //     fontSize: responsiveFontSize(1.5),
    //     color: 'gray'
    // },
    // call: {
    //     paddingHorizontal: 10
    // },
    // video: {
    //     paddingHorizontal: 10
    // },
})