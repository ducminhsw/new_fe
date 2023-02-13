import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Statusbar from "../../components/Statusbar";
import Avatar from "../../components/Avatar";
import CustomText from "../../components/CustomText";
import ImageGallery from "../../components/ImageGallery";
import { StatusToEmoji } from "../../constants/emoji";
import { useNavigation } from "@react-navigation/native";
const TopBar = ({ name }) => {
  const navigation= useNavigation();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 18 }}>
        Bài viết của {name}
      </Text>
      <TouchableOpacity style={{ position: "absolute", left: 8, top: 15 }} onPress={()=>navigation.navigate('Feed')}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
function FlatListHeader({ params }) {
  return (
    <View style={styles.ContentContainer}>
      <View style={styles.ContentHeader}>
        <View style={styles.Row}>
          <Avatar avatar={params.avatar} online={params.active} />
          <View style={{ paddingLeft: 8 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.Text}>{params.userName}</Text>
              {params.status && (
                <Text style={{ fontSize: 14 }}>
                  hiện đang{StatusToEmoji[params.status]} cảm thấy
                  <Text style={{ fontWeight: "600" }}> {params.status}.</Text>
                </Text>
              )}
            </View>
            <View style={styles.Row}>
              <Text style={styles.Time}>{params.timeCreated}</Text>
              <Entypo name="dot-single" size={12} color="#747476" />
              <Entypo name="globe" size={12} color="#747476" />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.ContentMain}>
        <CustomText text={params.description} />
      </View>
      <View style={styles.Bottom}>
        <View style={styles.FooterCount}>
          <View style={styles.Row}>
            <View style={styles.IconCount}>
              <AntDesign name="like1" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.TextCount}>{params.numLike}</Text>
          </View>
          <Text style={styles.TextCount}>{params.numComment} comment</Text>
        </View>
      </View>
    </View>
  );
}
export default ImagePost = ({ route }) => {
  const params = route.params;
  const data = params.images;
  const [gallery, setGallery] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  return (
    <>
      <Statusbar />
      <View style={styles.Container}>
        <TopBar name={params.userName} />
        <View style={styles.ImageContainer}>
          <ScrollView>
            <View style={styles.Divider} />
            <FlatListHeader params={params} />
            <View style={styles.SmallDivider} />
            {data.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      setInitialIndex(index);
                      setGallery(true);
                    }}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={styles.ImageStyle}
                    />
                  </TouchableOpacity>
                  <View style={styles.SmallDivider} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      {gallery && (
        <View
          style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <ImageGallery
            images={data}
            setGallery={setGallery}
            initialIndex={initialIndex}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  Row: {
    alignItems: "center",
    flexDirection: "row",
  },
  Divider: {
    width: "100%",
    height: 10,
    backgroundColor: "#f0f2f5",
  },
  SmallDivider: {
    width: "100%",
    height: 8,
    backgroundColor: "#f0f2f5",
  },
  ContentContainer: {
    padding: 8,
  },
  Text: {
    fontSize: 14,
    color: "#000000",
    marginRight: 3,
  },
  Time: {
    fontSize: 12,
    color: "#747476",
  },
  TextCount: {
    fontSize: 13,
    color: "#424040",
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
  FooterCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 3,
  },
  ImageStyle: {
    width: "100%",
    height: 400,
  },
  ImageContainer: {
    flex: 1,
  },
});
