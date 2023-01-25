import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

const ActiveUsers = ({ name, profile, navigation }) => {

    const onPressHanlder = () => {
        navigation.navigate('ChatView')
    }

    return (
        <TouchableOpacity onPress={onPressHanlder} activeOpacity={0.7} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: profile }} />
            </View>
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

export default ActiveUsers

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    imageContainer: {
        position: 'relative'
    },
    image: {
        width: responsiveHeight(5),
        height: responsiveHeight(5),
        borderRadius: 200
    },
    name: {
        paddingHorizontal: 10,
        fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold'
    },
})