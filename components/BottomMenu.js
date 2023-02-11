import React, { useState } from "react";
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
const BottomMenu = ({ setModalVisible, personal, setDeleModalVisible }) => {
  const disableModal = () => setModalVisible(false);
  return (
    <View style={styles.flexView}>
      <Modal
        onBackdropPress={() => disableModal()}
        onBackButtonPress={() => disableModal()}
        isVisible={true}
        swipeDirection="down"
        onSwipeComplete={disableModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />
            {personal && (
              <View style={styles.itemList}>
                <TouchableOpacity style={styles.item}>
                  <MaterialIcons name="mode-edit" size={24} color="black" />
                  <View style={styles.itemContent}>
                    <Text style={styles.Header}>Chỉnh sửa bài viết</Text>
                    <Text style={styles.Description}>
                      Tôi muốn thay đổi bài viết đã tạo
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    disableModal();
                    setDeleModalVisible(true);
                  }}
                >
                  <MaterialIcons name="delete" size={24} color="black" />
                  <View style={styles.itemContent}>
                    <Text style={styles.Header}>Xoá bài viết</Text>
                    <Text style={styles.Description}>
                      Tôi muốn xoá bài viết này
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.itemList}>
              <TouchableOpacity style={styles.item}>
                <MaterialIcons name="report" size={24} color="black" />
                <View style={styles.itemContent}>
                  <Text style={styles.Header}>Báo cáo bài viết</Text>
                  <Text style={styles.Description}>
                    Tôi lo ngại về bài viết này
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default BottomMenu;
const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#eeeeee",
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  itemList: {
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
    flexDirection: "column",
    marginVertical: 16,
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 10,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
  },
  itemContent: {
    marginLeft: 16,
    flexDirection: "column",
    marginVertical: 8,
  },
  Header: {
    fontSize: 16,
    fontWeight: "600",
  },
  Description: {
    fontSize: 12,
    fontWeight: "400",
  },
});
