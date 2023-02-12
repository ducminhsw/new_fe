import React, { useContext, useState } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Button,
    Alert,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
const FormData = require('form-data')
import * as ImagePicker from 'expo-image-picker';
import { useNetInfo } from '@react-native-community/netinfo'
import axios from 'axios'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import { BaseURL } from '../ultis/Constants'
import AppContext from '../context/AppContext'
import { useNavigation } from '@react-navigation/native';

const MAX_AVATAR_SIZE = 4 * 1024 * 1024;
var avatarlink, coverlink, typeAvatar, typeCover

const EditScreen = () => {
    const netinfo = useNetInfo()
    const appContext = useContext(AppContext)
    const navigation = useNavigation()

    const data = appContext.loginState
    // { username, description, address, city, country, link, birthday }
    const [username, setUsername] = useState(data.username)
    const [description, setDescription] = useState(data.description)
    const [address, setAddress] = useState(data.address)
    const [city, setCity] = useState(data.city)
    const [country, setCountry] = useState(data.country)
    const [link, setLink] = useState(data.link)
    const [birthday, setBirthday] = useState(data.birthday)

    // avatar, coverImage
    const [avatar, setAvatar] = useState(data.avatarURL)
    const [cover, setCover] = useState(data.coverImgURL)

    const pickAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets[0].fileSize > MAX_AVATAR_SIZE) {
                Alert.alert(
                    "Alert: This image file is too big",
                    "Only accept image under 4MB",
                    {
                        text: "OK",
                        type: "cancel"
                    }
                )
                return
            }
            setAvatar(result.assets[0].uri)
            avatarlink = result.assets[0].uri
            console.log(avatarlink)
            typeAvatar = /\.(\w+)$/.exec(result.assets[0].uri)
            console.log(typeAvatar)
            console.log(typeAvatar[1])
        }
    };

    const pickCover = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets[0].fileSize > MAX_AVATAR_SIZE) {
                Alert.alert(
                    "Alert: This image file is too big",
                    "Only accept image under 4MB",
                    {
                        text: "OK",
                        type: "cancel"
                    }
                )
                return
            }
            setCover(result.assets[0].uri);
            coverlink = result.assets[0].uri
            console.log(coverlink)
            typeCover = /\.(\w+)$/.exec(result.assets[0].uri)
        }
    }

    const changeInfo = async () => {
        if (!netinfo.isConnected || !netinfo.isInternetReachable) {
            Alert.alert(
                "Lỗi mạng",
                "Kết nối không thành công, kiểm tra kết nối với mạng và thử lại",
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ]
            )
            return
        }

        let formdata = new FormData()
        console.log(typeAvatar[1])
        try {
            formdata.append("avatar",
                {
                    name: "ravatar",
                    type: "image/" + typeAvatar[1],
                    uri: avatarlink
                })
            formdata.append("cover_image",
                {
                    name: "rcover",
                    type: "image/" + typeCover[1],
                    uri: coverlink
                })
        } catch (error) {
            console.log(error)
        }

        try {
            const res = await axios.post(
                `${BaseURL}/it4788/user/set_user_info`,
                formdata,
                {
                    params: {
                        token: data.token,
                        username: username,
                        description: description,
                        address: address,
                        city: city,
                        country: country,
                        link: link,
                        birthday: birthday
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            appContext.dispatch({
                type: "CHANGE_INFO_USER",
                username: username,
                description: description,
                address: address,
                city: city,
                country: country,
                link: link,
                birthday: birthday,
                avatarURL: avatar,
                coverImgURL: cover
            })
            navigation.navigate("Profile")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <ScrollView>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Ảnh đại diện</Text>
                            <Button title='Chỉnh sửa'
                                onPress={pickAvatar}
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large }} />
                        </View>
                        <Image
                            source={{ uri: avatar }}
                            style={{
                                width: 180,
                                height: 180,
                                borderRadius: 100,
                                alignSelf: "center",
                                margin: 20,
                            }}
                        />
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Ảnh bìa</Text>
                            <Button title='Chỉnh sửa'
                                onPress={pickCover}
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10 }}>
                            <Image
                                source={{ uri: cover }}
                                resizeMode="cover"
                                style={{ height: 250, width: "100%", alignSelf: "center", borderRadius: 12 }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ fontFamily: FONTS.bold, fontSize: SIZES.extraLarge, }}>Chi tiết</Text>
                            <Button title='Chỉnh sửa'
                                style={{ fontFamily: FONTS.regular, fontSize: SIZES.large, }} />
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tên</Text>
                                <TextInput
                                    onChangeText={setUsername}
                                    value={username}
                                    placeholder={data.username}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Tiểu sử</Text>
                                <TextInput
                                    onChangeText={setDescription}
                                    value={description}
                                    placeholder={data.description}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Địa chỉ</Text>
                                <TextInput
                                    onChangeText={setAddress}
                                    value={address}
                                    placeholder={data.address}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Thành phố</Text>
                                <TextInput
                                    onChangeText={setCity}
                                    value={city}
                                    placeholder={data.city}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Quốc gia</Text>
                                <TextInput
                                    onChangeText={setCountry}
                                    value={country}
                                    placeholder={data.country}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Link</Text>
                                <TextInput
                                    onChangeText={setLink}
                                    value={link}
                                    placeholder={data.link}
                                    style={styles.infoInput}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', margin: 10, marginLeft: 20, alignItems: "center" }}>
                                <Text
                                    style={styles.infoText}>Ngày sinh</Text>
                                <TextInput
                                    onChangeText={setBirthday}
                                    value={birthday}
                                    placeholder={data.birthday}
                                    style={styles.infoInput}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <View>
                        <TouchableOpacity
                            onPress={changeInfo}
                            style={{
                                flex: 5,
                                backgroundColor: "#1877f2",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Chỉnh sửa thông tin</Text>
                        </TouchableOpacity>
                    </View>
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
export default EditScreen