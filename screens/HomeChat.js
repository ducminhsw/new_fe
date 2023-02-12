import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Chat from "../components/Chat";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/AppContext";
import axios from "axios";
import { BaseURL } from "../ultis/Constants";

const HomeChat = () => {
  const navigation = useNavigation();
  const appContext = useContext(AppContext);

  const [listData, setListData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  var MSG_LIST = [{}];

  const getListConversation = async () => {
    console.log("get list conversations...");
    try {
      const res = await axios.post(
        `${BaseURL}/it4788/chat/get_list_conversation`,
        {},
        {
          params: {
            index: 0,
            count: 50,
            token: appContext.loginState.token,
          },
        }
      );
      setListData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListConversation();
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIconContainer}>
          <Ionicons
            name="ios-search"
            size={responsiveFontSize(3)}
            color="gray"
          />
        </View>
        <TextInput style={styles.search} placeholder="Search" />
      </View>
      <FlatList
        contentContainerStyle={{ alignItems: "center" }}
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                try {
                  const res = await axios.post(
                    `${BaseURL}/it4788/chat/get_conversation`,
                    {},
                    {
                      params: {
                        token: appContext.loginState.token,
                        index: 0,
                        count: 50,
                        conversation_id: item.id,
                      },
                    }
                  );
                  console.log("get conversation");

                  MSG_LIST = res.data.data.conversation;

                  navigation.navigate("ChatView", {
                    data: MSG_LIST,
                    partner_id: item.partner.id,
                    username: item.partner.username,
                    conversation_id: item.id,
                    avatar: item.partner.avatar,
                  });
                } catch (error) {
                  console.log(`error: ${error}`);
                }
              }}
              activeOpacity={0.7}
              style={styles.containerItem}
            >
              <Chat
                profilePicture={item.partner.avatar}
                name={item.partner.username}
                isLastMessageYours={false}
                hasSeen={item.lastMessage.unread == 0}
                time={`${new Date(item.lastMessage.created * 1000)
                  .toLocaleTimeString()
                  .slice(0, -3)} ${new Date(
                  item.lastMessage.created * 1000
                ).toLocaleDateString()}`}
                message={item.lastMessage.message}
              />
            </TouchableOpacity>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default HomeChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "white"
  },
  containerItem: {
    flexDirection: "row",
    width: "100%",
    height: responsiveHeight(9),
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  searchContainer: {
    width: responsiveWidth(94),
    height: responsiveHeight(5),
    backgroundColor: "rgba(211, 211, 211, 0.2)",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    // backgroundColor : 'red'
  },
  search: {
    flex: 1,
  },
  searchIconContainer: {
    paddingHorizontal: 10,
  },
  // activeUsersContainer : {
  //     height : responsiveHeight(13),
  //     width : responsiveWidth(100),
  //     marginVertical : 5
  // }
});
