import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import React, { useReducer, useRef } from "react";
import { reducer } from "./context/AppReducer";
import AppContext from "./context/AppContext";
import Home from "./screens/HomeGroup";
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
import { Post, DetailPost } from "./screens/PostGroup";
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
  Text
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { BaseURL } from "./ultis/Constants";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Statusbar from "./components/Statusbar";
import { HeaderShownContext } from "@react-navigation/elements";
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
    <SafeAreaProvider style={{ flex: 1 }}>
      <AppContext.Provider value={appContext}>
        <NavigationContext.Provider value={navigationRef}>
          <NavigationContainer ref={navigationRef}>
            <>
              <Statusbar />
              <Stack.Navigator initialRouteName="SignIn" >
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
                <Stack.Screen name="DetailPost" component={DetailPost} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Edit" component={EditScreen} />
                <Stack.Screen name="EditView" component={EditViewScreen} />
                <Stack.Screen name="Setting" component={SettingScreen} />
                <Stack.Screen name="ProfileView" component={ProfileViewScreen} />
                <Stack.Screen name="FriendList" component={FriendListScreen} />
                <Stack.Screen name="ChangePass" component={ChangePassScreen} />
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
                          <View style={{ padding: 10 }}>
                            <Image
                              style={styles.image}
                              source={{
                                uri: "https://firebasestorage.googleapis.com/v0/b/danentang-1edea.appspot.com/o/stock_avatar.jpg?alt=media&token=778bec4b-00bb-481d-bdd9-e2b5ac55aa99",
                              }}
                            />
                          </View>
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
                    headerRight: () => {
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
                          console.log(res.data.data.username);
                          navigation.navigate("UserInfo", {
                            name: res.data.data.username,
                            user_id: res.data.data.id,
                            birthday: res.data.data.birthday,
                            description: res.data.data.description,
                          });
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
                        <View style={styles.chatViewHeaderRightContainer}>
                          <TouchableOpacity style={styles.info}>
                            <FontAwesome5
                              onPress={openUserInfo}
                              name="info-circle"
                              size={responsiveFontSize(3)}
                              color="#006AFF"
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    },
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
                          console.log(res.data.data.username);
                          navigation.navigate("UserInfo", {
                            name: res.data.data.username,
                            user_id: res.data.data.id,
                            birthday: res.data.data.birthday,
                            description: res.data.data.description,
                          });
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
                              // appContext.loginState.socket.emit("disconnect")
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
                                uri: "https://cdn2.downdetector.com/static/uploads/logo/fb-messenger.png",
                              }}
                            />
                          </View>
                          <View>
                            <Text onPress={openUserInfo} style={styles.name}>
                              {route.params.username}
                            </Text>
                            {/* <Text style={styles.lastOnlineText}>Active 12 hour ago</Text> */}
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
  },
  name: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  chatViewProPicContainer: {
    padding: 10,
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
