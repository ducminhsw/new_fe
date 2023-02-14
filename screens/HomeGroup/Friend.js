import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert
} from "react-native";
import { avatar_basic, BaseURL } from "../../ultis/Constants";
import { FONTS, SIZES } from "../../constants";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const requestCheck = async (token, id, is_accept) => {
  try {
    const res = await axios.post(
      `${BaseURL}/it4788/friend/set_accept_friend`,
      {},
      {
        params: {
          token: token,
          user_id: id,
          is_accept: is_accept
        }
      }
    )
    console.log(res)
  } catch (error) {
    Alert.alert(
      "Không thể thao tác",
      "Kiểm tra lại thiết bị và kết nối của bạn, hiện tại không thể xứ lý yêu cầu",
      {
        text: "OK",
        style: 'cancel'
      }
    )
    console.log(error)
  }
}

const FriendRequestItem = ({ item }) => {
  const navigation = useNavigation()
  const appContext = useContext(AppContext)
  const get_item_info = async (userId) => {
    const res = await axios.post(
        `${BaseURL}/it4788/user/get_user_info`,
        {},
        {
            params: {
                token: appContext.loginState.token,
                user_id: userId
            }
        }
    )
    const user_info = res.data.data
    if (user_info.id == appContext.loginState.user_id) {
        navigation.navigate("Profile")
    } else {
        navigation.push("ProfileView", { user_info })
    }
}
  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 10, paddingStart: 5, marginBottom: 10 }}>
      <TouchableOpacity style={{ flex: 1, marginStart: 10 }}
      onPress={() => get_item_info(item.id)}>
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
            flex: 1, alignItems: "center", backgroundColor: "#2374e1", justifyContent: "center",
            marginHorizontal: 10, borderRadius: 8, margin: 10, height: 34, width: 160
          }}
            onPress={() => {
              requestCheck(appContext.loginState.token, item.id, 1)
            }}>
            <Text style={{ fontSize: 15, color: "white", fontFamily: FONTS.medium, color: "white" }}>Chấp nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1, alignItems: "center", backgroundColor: "#dddddd", justifyContent: "center",
            marginHorizontal: 10, borderRadius: 8, margin: 10, height: 34, width: 160
          }}
            onPress={() => {
              requestCheck(appContext.loginState.token, item.id, 0)
            }}>
            <Text style={{ fontSize: 15, color: "black", fontFamily: FONTS.medium }}>Từ chối</Text>
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
        <Text style={styles.label}>Lời mời kết bạn</Text>
      </View>
      <FlatList
        data={data.data}
        renderItem={({ item }) => <FriendRequestItem item={item} />}>
      </FlatList>
    </View>
  );
};
const Friend = () => {
  const appContext = useContext(AppContext)
  const navigation = useNavigation()
  const isFocus = useIsFocused()
  const [data, setData] = useState([])
  const [check, setCheck] = useState(0)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getRequest = async () => {
        try {
          const res = await axios.post(
            `${BaseURL}/it4788/friend/get_requested_friends`,
            {},
            {
              params: {
                token: appContext.loginState.token,
                index: 0,
                count: 50
              }
            }
          )
          setData(res.data.data.request)
        } catch (error) {
          setData([])
        }
      }
      getRequest()
    })
    return unsubscribe
  }, [navigation, isFocus, check])
  if (JSON.stringify(data) == JSON.stringify([])) {
    return (
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
        <Text style={{
          fontFamily: FONTS.regular,
          fontSize: 14,
          color: "#cccccc",
          alignSelf: "center",
          margin: 40
        }}>Không có yêu cầu kết bạn</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FriendRequestList data={data} />
    </View>
  );
};
export default Friend;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: -0.3,
  },
  textStyle: {
    fontSize: 18,
    letterSpacing: -0.3,
    fontFamily: FONTS.medium
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
  btn1: {
    borderRadius: 21,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 16,
  },
  btnAccept: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#2e87ff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  btnDeny: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#dddddd",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
