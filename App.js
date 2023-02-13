import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React, { useReducer, useRef, useState } from "react";
import { reducer } from "./context/AppReducer";
import AppContext from "./context/AppContext";
import Home from "./screens/HomeGroup";
import {
  Post,
  DetailPost,
  PersonalStatus,
  ImagePost,
} from "./screens/PostGroup";
import ProfileScreen from "./screens/ProfileScreen";
import EditScreen from "./screens/EditScreen";
import EditViewScreen from "./screens/EditViewScreen";
import SettingScreen from "./screens/SettingScreen";
import ProfileViewScreen from "./screens/ProfileViewScreen";
import FriendListScreen from "./screens/FriendListScreen";
import ChangePassScreen from "./screens/ChangePassScreen";
import SignIn from "./screens/SignInScreen";
import SignUp from "./screens/SignUpScreen";
import HomeChatTabs from "./navigations/HomeChatTabs";
import ChatView from "./screens/ChatView";
import UserInfo from "./screens/UserInfo";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { avatar_basic, BaseURL } from "./ultis/Constants";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Statusbar from "./components/Statusbar";
import { Header, HeaderShownContext } from "@react-navigation/elements";
const Stack = createStackNavigator();
export const NavigationContext = React.createContext();
export default function App() {
  const initLoginState = {
    token: null,
    user_id: null,
    username: null,
    description: null,
    address: null,
    city: null,
    country: null,
    link: null,
    birthday: null,
    avatarURL: null,
    coverImgURL: null,
    friend_list: [],
    block_list: [],
    received: [],
    socket: null,
  };
  const [loginState, dispatch] = useReducer(reducer, initLoginState);
  const [messImg, setMessImg] = useState(null)
  const appContext = {
    loginState,
    dispatch,
  };
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });
  const navigationRef = useRef();
  if (!loaded) return null;
  return (
    <SafeAreaProvider>
      <AppContext.Provider value={appContext}>
        <NavigationContext.Provider value={navigationRef}>
          <NavigationContainer ref={navigationRef}>
            <>
              <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Post"
                  component={Post}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="DetailPost"
                  component={DetailPost}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PersonalStatus"
                  component={PersonalStatus}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ImagePost"
                  component={ImagePost}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignUp"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={({ navigation }) => ({
                    title: appContext.loginState.username,
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  name="Edit"
                  component={EditScreen}
                  options={({ navigation }) => ({
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  name="EditView"
                  component={EditViewScreen}
                  options={({ navigation }) => ({
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  name="Setting"
                  component={SettingScreen}
                  options={({ navigation }) => ({
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  name="ProfileView"
                  component={ProfileViewScreen}
                  options={({ navigation }) => ({
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  name="FriendList"
                  component={FriendListScreen}
                  options={({ navigation }) => ({
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  name="ChangePass"
                  component={ChangePassScreen}
                  options={({ navigation }) => ({
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen
                  options={({ navigation }) => ({
                    title: "Message",
                    headerMode: "screen",
                    headerLeft: () => {
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                    headerRightContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                  name="HomeChat"
                  component={HomeChatTabs}
                />
                <Stack.Screen
                  name="ChatView"
                  component={ChatView}
                  options={({ navigation, route }) => ({
                    title: null,
                    headerLeft: () => {
                      const openUserInfo = async () => {
                        console.log(route.params.partner_id);
                        try {
                          const res = await axios.post(
                            `${BaseURL}/it4788/user/get_user_info`,
                            {},
                            {
                              params: {
                                token: appContext.loginState.token,
                                user_id: route.params.partner_id,
                              },
                            }
                          );
                          const user_info = res.data.data;
                          console.log(user_info);
                          setMessImg(user_info.avatar)
                          if (user_info.id == appContext.loginState.user_id) {
                            navigation.navigate("Profile");
                          } else {
                            navigation.navigate("ProfileView", { user_info });
                          }
                        } catch (error) {
                          console.log(`error: ${error}`);
                          Alert.alert(
                            "Lỗi lấy thông tin",
                            "Không thể lấy thông tin User",
                            [
                              {
                                text: "OK",
                                style: "cancel",
                              },
                            ]
                          );
                        }
                      };
                      return (
                        <View style={styles.chatViewHeaderLeftContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.goBack();
                            }}
                          >
                            <Ionicons
                              name="md-arrow-back"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                          <View style={styles.chatViewProPicContainer}>
                            <Image
                              style={styles.profilePic}
                              source={{
                                uri: messImg ? messImg : avatar_basic.uri,
                              }}
                            />
                          </View>
                          <View>
                            <Text onPress={openUserInfo}>
                              {route.params.username}
                            </Text>
                          </View>
                        </View>
                      );
                    },
                    headerLeftContainerStyle: {
                      paddingHorizontal: 10,
                    },
                  })}
                />
                <Stack.Screen name="UserInfo" component={UserInfo} />
              </Stack.Navigator>
            </>
          </NavigationContainer>
        </NavigationContext.Provider>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    width: responsiveHeight(4),
    height: responsiveHeight(4),
    borderRadius: 200,
  },
  profilePic: {
    borderRadius: 100,
    width: responsiveHeight(3),
    height: responsiveHeight(3),
    resizeMode: "cover",
    margin: 5,
  },
  chatViewHeaderLeftContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginStart: 5
  },
  name: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  chatViewProPicContainer: {
  },
  chatViewHeaderRightContainer: {
    flexDirection: "row",
  },
  info: {
    paddingHorizontal: 10,
  },
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
});
