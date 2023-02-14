import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { appColor } from "../../ultis/Constants";
import Feed from "./Feed";
import Notification from "./Notification";
import Setting from "./Setting";
import Friend from "./Friend";
// import { NavigationContext } from "../../App";
import { useNavigation } from "@react-navigation/native";
import Statusbar from "../../components/Statusbar";
const TopBar = ({ setEnable }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.subContainer}>
      <Text style={styles.appName}>facebook</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn}>
          <Feather name="search" size={23} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => { navigation.navigate("HomeChat") }}>
          <MaterialCommunityIcons name="facebook-messenger" size={23} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const HomeTab = createMaterialTopTabNavigator();
const HomeNavigator = () => {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Feed") {
            return (
              <Entypo
                name="home"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          } else if (route.name === "Friend") {
            return (
              <MaterialIcons
                name="group"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          } else if (route.name === "Notification") {
            return (
              <Entypo
                name="bell"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          } else {
            return (
              <Entypo
                name="menu"
                size={26}
                color={focused ? appColor.LIGHT_BLUE : "black"}
              />
            );
          }
        },
      })}
    >
      <HomeTab.Screen name="Feed" component={Feed} />
      <HomeTab.Screen name="Friend" component={Friend} />
      <HomeTab.Screen name="Notification" component={Notification} />
      <HomeTab.Screen name="Setting" component={Setting} />
    </HomeTab.Navigator>
  );
};
export default Home = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TopBar />
        <HomeNavigator />
      </SafeAreaView>
    </View>
  );
};
export { Feed, Friend, Notification, Setting };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  subContainer: {
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#ffffff",
  },
  appName: {
    color: "#3a86e9",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  row: {
    flexDirection: "row",
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 21,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
});
