import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";

export default Avatar = (props) => {
  const navigation = useNavigation()
  const imageUrl = props.avatar;
  const [onLoadImage, setLoadImage] = useState(false);
  const imageLoading = () => {
    setLoadImage(true);
  }
  return (
    <View style={styles.Container}>
        <Image
          style={
            props.big ? styles.User1 : (props.small ? styles.User2 : styles.User)
          }
          source={onLoadImage ? { uri: imageUrl ? imageUrl : "https://firebasestorage.googleapis.com/v0/b/danentang-1edea.appspot.com/o/stock_avatar.jpg?alt=media&token=778bec4b-00bb-481d-bdd9-e2b5ac55aa99" } : require('../assets/default_image.png')}
          story={props.story}
          onLoad={() => imageLoading()}
        />
        {props.online && <View style={styles.UserActive} />}
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    position: "relative",
  },
  User: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#1777f2",
  },
  User1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#1777f2",
  },
  User2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#1777f2",
  },
  UserActive: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: "#4bcb1f",
    position: "absolute",
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
});
