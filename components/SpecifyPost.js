import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Avatar from "./Avatar";
import Hyperlink from "react-native-hyperlink";
import * as WebBrowser from "expo-web-browser";
import PostImage from "./PostImage";
import { postLike } from "../api";
import AppContext from "../context/AppContext";
const DefaultLink = (props) => {
  const [result, setResult] = useState(null);
  const _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };
  return (
    <Hyperlink
      onPress={(url) => _handlePressButtonAsync(url)}
      linkStyle={{ color: "#2980b9", fontSize: 15 }}
    >
      <Text style={{ fontSize: 15, padding: 16 }}>{props.description}</Text>
    </Hyperlink>
  );
};
const PostContent = ({ description, images }) => {
  return (
    <View style={styles.postContainer}>
      <DefaultLink description={description} />
      <PostImage images={images} />
    </View>
  );
};
export default SpecifyPost = (props) => {
  const [likeDisplay, setLikeDisplay] = useState(props.numLike);
  const [liked, setLiked] = useState(props.is_liked === "1");
  const numLike = props.numLike2;
  const samePer = props.samePer;
  var timeDisplay = props.timeCreated;
  const removeLike = () => {
    // console.log(samePer);
    if (props.is_liked != 1) setLikeDisplay(props.numLike);
    else if (samePer) {
      setLikeDisplay(parseInt(numLike) - 1);
    } else setLikeDisplay(props.numLike.replace("Bạn, ", ""));
  };
  const addLike = () => {
    if (props.is_liked == "1") setLikeDisplay(props.numLike);
    else if (numLike == 0) setLikeDisplay("Bạn");
    else setLikeDisplay(`Bạn và ${numLike} người khác`);
  };
  const navigation = useNavigation();
  const appContext = useContext(AppContext)
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <View style={styles.Row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Feed");
            }}
            style={{ marginRight: 8 }}
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Avatar avatar={props.avatar} online={props.active} />
          <View style={{ paddingLeft: 8 }}>
            <Text style={styles.Text}>{props.userName}</Text>
            <View style={styles.Row}>
              <Text style={styles.Time}>{timeDisplay}</Text>
              <Entypo name="dot-single" size={12} color="#747476" />
              <Entypo name="globe" size={12} color="#747476" />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => props.setModalVisible(true)}>
          <Entypo name="dots-three-horizontal" size={15} color="#222121" />
        </TouchableOpacity>
      </View>
      <PostContent description={props.description} images={props.images} />
      <View style={styles.Footer}>
        <View style={styles.FooterCount}>
          <View style={styles.Row}>
            <View style={styles.IconCount}>
              <AntDesign name="like1" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.TextCount}>{likeDisplay}</Text>
          </View>
        </View>
        <View style={styles.Separator} />
        <View style={styles.FooterMenu}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              if (!liked) {
                addLike();
              } else {
                removeLike();
              }
              setLiked(!liked);
              postLike(props.id, appContext.loginState.token);
            }}
          >
            <View style={styles.Icon}>
              <AntDesign
                name="like2"
                size={20}
                color={!liked ? "#424040" : "#3a86e9"}
              />
            </View>
            <Text style={{ color: !liked ? "#424040" : "#3a86e9" }}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button}>
            <View style={styles.Icon}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={20}
                color="#424040"
              />
            </View>
            <Text>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    width: "100%",
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  Header: {
    backgroundColor: "#ffffff",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    paddingLeft: 11,
    paddingRight: 11,
  },
  Row: {
    alignItems: "center",
    flexDirection: "row",
  },
  User: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#222121",
  },
  Time: {
    fontSize: 12,
    color: "#747476",
  },
  Post: {
    fontSize: 12,
    color: "#222121",
    lineHeight: 16,
    paddingLeft: 11,
    paddingRight: 11,
  },
  Photo: {
    marginTop: 9,
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  FooterCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 11,
    paddingRight: 11,
  },
  IconCount: {
    backgroundColor: "#1878f3",
    width: 20,
    height: 20,
    bordeRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  TextCount: {
    fontSize: 13,
    color: "#424040",
  },
  Separator: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#f0f2f5",
  },
  FooterMenu: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 11,
    paddingRight: 11,
  },
  Button: {
    flexDirection: "row",
    alignItems: "center",
  },
  Icon: {
    marginRight: 6,
  },
  Text: {
    fontSize: 14,
    color: "#000000",
  },
  BottomDivider: {
    width: "100%",
    height: 9,
    backgroundColor: "#f0f2f5",
  },
});
