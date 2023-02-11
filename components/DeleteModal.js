import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const HEIGHT_MODAL = 200;
const WIDTH_MODAL = Dimensions.get("window").width;
export default DeleteModal = ({ setDeleModalVisible }) => {
  const hideModal = () => setDeleModalVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View
          style={{
            backgroundColor: "#ffffff",
            alignItems: "center",
            borderRadius: 10,
            paddingBottom: 20,
          }}
        >
          <Text style={styles.header}>
            Bài viết này sẽ bị xoá nên bạn sẽ không thể tìm được nữa. Bạn cũng
            có thể chỉnh sửa bài viết nếu như chỉ muốn thay đổi chi tiết nào đó{" "}
          </Text>

          <View style={styles.Divider} />
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={{ fontSize: 20, color: "red" }}>Xoá bài viết</Text>
          </TouchableOpacity>
          <View style={styles.Divider} />
          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={{ fontSize: 20, color: "#3a86e9" }}>
              Chỉnh sửa bài viết
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Bottom}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => hideModal()}
          >
            <Text style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>
              Huỷ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modal: {
    position: "absolute",
    width: WIDTH_MODAL - 8,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "column",
    bottom: 0,
  },
  header: {
    margin: 5,
    fontSize: 13,
    fontWeight: "250",
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    marginTop: 8,
  },
  Divider: {
    width: "100%",
    height: 0.3,
    backgroundColor: "#000000",
    marginTop: 16,
    marginBottom: 16,
  },
  Bottom: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
});
