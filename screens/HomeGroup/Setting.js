import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";
import { useContext, useState, useEffect, useCallback } from "react";
import { FONTS, SIZES } from "../../constants";
import { BaseURL, avatar_basic } from "../../ultis/Constants";

import AppContext from "../../context/AppContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";

const SuggestRequestItem = ({ item }) => {
  const appContext = useContext(AppContext)
  const [block, setBlock] = useState("Bỏ chặn")
  const unBlockUser = async (id) => {
    console.log(id)
    try {
      const res = await axios.post(
        `${BaseURL}/it4788/friend/set_request_friend`,
        {},
        {
          params: {
            token: appContext.loginState.token,
            user_id: id,
            type: 1
          }
        }
      )
      console.log(res.data)
      setBlock("Bỏ chặn thành công")
    } catch (error) {
      console.log(error)
      Alert.alert(
        "Không thể thao tác",
        "Kiểm tra lại thiết bị và kết nối của bạn, hiện tại không thể xứ lý yêu cầu",
        {
          text: "OK",
          style: 'cancel'
        }
      )
      console.log("unBlockUser " + error)
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 10, paddingStart: 5, marginBottom: 10 }}>
      <TouchableOpacity style={{ flex: 1, marginStart: 10 }}>
        <Image
          source={{ uri: item.avatar ? item.avatar : avatar_basic.uri }}
          style={{ height: 60, width: 60, borderRadius: 200 }} />
      </TouchableOpacity>
      <View style={{ flexDirection: "column", flex: 4 }}>
        <TouchableOpacity style={{ flex: 1, marginStart: 10 }}>
          <Text style={{ fontFamily: FONTS.medium, fontSize: 16 }}>{item.username}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", flex: 2 }}>
          <TouchableOpacity style={{
            alignItems: "center", backgroundColor: "#2374e1", justifyContent: "center",
            marginHorizontal: 10, borderRadius: 8, height: 34, width: 160, margin: 10
          }}
            onPress={() => { unBlockUser(item.user_id) }}>
            <Text style={{ fontSize: 15, color: "white", fontFamily: FONTS.medium }}>{block}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FriendRequestList = (data) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Row}>
        <Text style={styles.label}>Những người bạn đang chặn</Text>
      </View>
      <FlatList
        data={data.data}
        renderItem={({ item }) => <SuggestRequestItem item={item} />}>
      </FlatList>
    </View>
  );
};
const Setting = () => {
  const appContext = useContext(AppContext)
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  const [data, setData] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getRequest = async () => {
        try {
          console.log("Calling api")
          const res = await axios.post(
            `${BaseURL}/it4788/friend/get_list_blocks`,
            {},
            {
              params: {
                token: appContext.loginState.token,
                index: 0,
                count: 50
              }
            }
          )
          setData(res.data.data)
          console.log(res.data.data)
          appContext.dispatch({
            type: 'SET_BLOCKED_LIST',
            block_list: res.data.data
          })
        } catch (error) {
          console.log(error)
          setData([])
        }
      }
      getRequest()
    })
    return unsubscribe
  }, [navigation, isFocus])
  if (JSON.stringify(data) == JSON.stringify([])) {
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
        <Text style={{
          fontFamily: FONTS.regular,
          fontSize: 14,
          color: "#cccccc",
          alignSelf: "center",
          margin: 40
        }}>Bạn đang không chặn ai cả</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FriendRequestList style={{ flex: 1 }} data={data} />
    </View>
  );
};
export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Row: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  Divider: {
    width: "100%",
    height: 5,
    backgroundColor: "#f0f2f5",
    backgroundColor: "black"
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: -0.3,
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
