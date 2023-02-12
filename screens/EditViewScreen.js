import React, { useContext, useState } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image, Button,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { assets, COLORS, FONTS, SIZES } from '../constants'

const EditViewScreen = ({route}) => {

    const user_profile = route.params

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView
                behavior='padding'
                style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Chi tiết</Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Tên</Text>
                                <Text style={styles.infoInput}>{user_profile.username}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Tiểu sử</Text>
                                <Text style={styles.infoInput}>{user_profile.description}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Địa chỉ</Text>
                                <Text style={styles.infoInput}>{user_profile.address}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Thành phố</Text>
                                <Text style={styles.infoInput}>{user_profile.city}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Quốc gia</Text>
                                <Text style={styles.infoInput}>{user_profile.country}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Link</Text>
                                <Text style={styles.infoInput}>{user_profile.link}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20 }}>
                                <Text
                                    style={styles.infoText}>Ngày sinh</Text>
                                <Text style={styles.infoInput}>{user_profile.birthday}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    infoText: {
        flex: 2,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large
    },
    infoInput: {
        flex: 5,
        width: 100,
        height: 40,
        fontSize: 18
    }
})

export default EditViewScreen