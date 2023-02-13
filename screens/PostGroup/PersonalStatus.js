import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState,useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation,useFocusEffect } from "@react-navigation/native";
import emoji from "../../constants/emoji";
export default PersonalStatus = ({ route }) => {
  const navigation = useNavigation();
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState("");
  useFocusEffect(
    useCallback(() => {
      if (route.params?.status) {
        setStatus(route.params.status);
        setIcon(route.params.icon);
        let a;
        route.params.status = a;
      }
    }, [route.params?.status])
  );
  function RenderItem({ item }) {
    return (
      <View style={styles.StatusContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate({
              name: "Post",
              params: { icon: item.icon1, status: item.status1 },
            });
          }}
        >
          <View style={styles.LeftItem}>
            <Text style={styles.icon}>{item.icon1}</Text>
            <Text style={styles.status}>{item.status1}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.BottomItem} />
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate({
              name: "Post",
              params: { icon: item.icon2, status: item.status2 },
            });
          }}
        >
          <View style={styles.RightItem}>
            <Text style={styles.icon}>{item.icon2}</Text>
            <Text style={styles.status}>{item.status2}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.Container}>
      <View style={styles.TopBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: "Post",
              params: { icon: icon, status: status },
            });
          }}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.Header}>Bạn thế nào rồi?</Text>
      </View>
      {icon && (
        <View
          style={{ padding: 8, flexDirection: "row",alignItems:'center' }}
        >
          <Text style={{ width: "90%" }}>
            Đang cảm thấy ...{icon}
            <Text style={{ fontWeight: "600" }}>{status}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIcon("");
              setStatus("");
            }}
          >
            <AntDesign name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.Content}>
        <FlatList
          data={emoji}
          keyExtractor={(item) => item.status1}
          renderItem={RenderItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  backgroundColor: "#eeeeee",
                  width: "100%",
                  height: 1.5,
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  TopBar: {
    marginTop:30,
    height: 60,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
  },
  Header: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 100,
  },
  Content: {
    marginTop: 2,
    borderTopWidth: 1.5,
    borderTopColor: "#eeeeee",
    borderBottomWidth: 1.5,
    borderBottomColor: "#eeeeee",
  },
  StatusContainer: {
    flexDirection: "row",
    height: 60,
  },
  LeftItem: {
    flexDirection: "row",
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  BottomItem: {
    backgroundColor: "#eeeeee",
    height: "100%",
    width: 1.5,
  },
  RightItem: {
    flexDirection: "row",
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
    marginRight: 8,
  },
  status: {
    fontWeight: "400",
  },
});
