import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
export default ImageGallery = ({ images, setGallery,initialIndex}) => {
  const [indexSelected, setIndexSelected] = useState(initialIndex);
  const onSelect = (indexSelected) => {
    setIndexSelected(indexSelected);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black", alignItems: "center" }}>
      <TouchableOpacity
        style={{ position: "absolute", left: 20, top: 18 }}
        onPress={() => setGallery(false)}
      >
        <Ionicons name="ios-close-circle-outline" size={25} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          marginTop: 20,
        }}
      >
        {indexSelected + 1}/{images.length}
      </Text>
      <View style={{ flex: 1,alignItems:'center',justifyContent:'center',marginTop:20}}>
        <Carousel
          layout="default"
          data={images}
          sliderWidth={width}
          itemWidth={width}
          itemHeight={300}
          firstItem={initialIndex}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ width: "100%", height: '100%'}}
              source={{ uri: item.url }}
            />
          )}
          onSnapToItem={(index) => onSelect(index)}
        />
        <Pagination
          inactiveDotColor="gray"
          dotColor={"orange"}
          activeDotIndex={indexSelected}
          dotsLength={images.length}
          animatedDuration={20}
        />
      </View>
    </View>
  );
};
