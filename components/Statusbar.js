import * as React from 'react';
import {View,StatusBar,StyleSheet } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export default Statusbar = ({ backgroundColor = "white", barStyle = "dark-content" }) => {
   const insets = useSafeAreaInsets();
   return (
     <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
          barStyle={barStyle}
     />
     </View>
   );
}
