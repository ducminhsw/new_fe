import { Text } from "react-native";
import ViewMoreText from "react-native-view-more-text";
import Hyperlink from "react-native-hyperlink";
import { TextUtility } from "../ultis/TextUtility";
import * as WebBrowser from "expo-web-browser";
export default CustomText = ({ text }) => {
  const custom_text = TextUtility.replaceStringWithIcon(text);
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  function renderViewMore(onPress) {
    return (
      <Text style={{ marginLeft: 16, color: "#3a86e9" }} onPress={onPress}>
        View more
      </Text>
    );
  }
  function renderViewLess(onPress) {
    return (
      <Text style={{ marginLeft: 16, color: "#3a86e9" }} onPress={onPress}>
        View less
      </Text>
    );
  }
  return (
    <Hyperlink
      onPress={(url) => _handlePressButtonAsync(url)}
      linkStyle={{ color: "#2980b9", fontSize: 15 }}
    >
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        textStyle={{ fontSize: 15, padding: 16 }}
      >
        <Text>{custom_text}</Text>
      </ViewMoreText>
    </Hyperlink>
  );
};
