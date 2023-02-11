import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default Avatar = (props) => {
  const imageUrl= props.avatar;
  // console.log(props)
  return (
    <View style={styles.Container}>
      <Image
        style={
          props.big ? styles.User1 :(props.small ? styles.User2 : styles.User)
        }
        source={imageUrl ? {uri: imageUrl} : {uri : "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&whttps://firebasestorage.googleapis.com/v0/b/danentang-1edea.appspot.com/o/stock_avatar.jpg?alt=media&token=778bec4b-00bb-481d-bdd9-e2b5ac55aa99=1000&q=80"}}
        story={props.story}
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
