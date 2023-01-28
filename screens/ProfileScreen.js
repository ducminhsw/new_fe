import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
const FormData = require('form-data')

import AppContext from '../context/AppContext'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import Separator from '../components/Separator'
import { BaseURL } from '../ultis/Constants'

const MAX_IMAGE_SIZE = 4 * 1024 * 1024

const ProfileScreen = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);

    // console.log(appContext.loginState)
    const data = appContext.loginState
    console.log(data)

    const [image, setImage] = useState(assets.avatar);
    const [avatarURL, setAUrl] = useState(data.avatarURL)
    const [coverURL, setCUrl] = useState(data.coverImgURL)

    let Data = []

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets[0].fileSize > MAX_IMAGE_SIZE) {
                Alert.alert(
                    "Lỗi kích thước ảnh",
                    "Chỉ chấp nhận ảnh có kích thước từ 4MB trở xuống",
                    {
                        text: "OK",
                        type: "cancel"
                    }
                )

                return
            }
            setImage(result.assets);

            const type = /\.(\w+)$/.exec(result.assets[0].uri)
            console.log(type)
            console.log(typeof type)

            let formdata = new FormData();
            formdata.append("image",
                {
                    name: "avatar",
                    type: "image/" + type[1],
                    uri: result.assets[0].uri
                });

            const res = await axios.post(
                `${BaseURL}/it4788/post/add_post`,
                formdata,
                {
                    params: {
                        described: "axios post",
                        token: data.token,
                        status: "được yêu"
                    },
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
            console.log(res)
        }
    };

    const get_list_friends = async () => {
        const res = await axios.post(
            `${BaseURL}/it4788/friend/get_user_friends`,
            {},
            {
                params: {
                    token: data.token,
                    index: 0,
                    count: 20,
                    user_id: data.user_id
                }
            }
        )
        Data = res.data.data.friends
        console.log(JSON.stringify(res.data.data.friends))
        console.log(Data)
    }

    const DATA = [
        {
            id: "1",
            avatar: assets.zoro_avatar,
            name: "Zoro",
        },
        {
            id: "2",
            avatar: assets.nami_avatar,
            name: "Nami",
        },
        {
            id: "3",
            avatar: assets.sanji_avatar,
            name: "Sanji",
        },
        {
            id: "4",
            avatar: assets.robin_avatar,
            name: "Robin",
        },
        {
            id: "5",
            avatar: assets.chopper,
            name: "Chopper",
        },
        {
            id: "6",
            avatar: assets.franky,
            name: "Franky",
        },
        {
            id: "7",
            avatar: assets.brook,
            name: "Brook",
        },
        {
            id: "8",
            avatar: assets.usopp_avatar,
            name: "Usopp",
        },
        {
            id: "9",
            avatar: assets.jimbei,
            name: "Jimbei",
        },
    ]

    const Item = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("ProfileView", { item })}
                style={{ alignItems: "center", marginHorizontal: 5 }}>
                <Image
                    source={item.avatar}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                        marginLeft: item.id === "1" ? 0 : -20,
                    }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View style={{
                    alignItems: "center"
                }}>
                    <Image
                        source={{ uri: coverURL }}
                        resizeMode="cover"
                        style={{ height: 250, width: "100%" }}
                    />
                    <View
                        style={{
                            backgroundColor: "white",
                            borderRadius: 300,
                            width: 170,
                            height: 170,
                            marginTop: -100,
                            justifyContent: "center"
                        }}>
                        <Image
                            source={{ uri: avatarURL }}
                            resizeMode="cover"
                            style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 300, }} />
                    </View>
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.extraLarge, marginTop: 10, }}>Nguyễn Đức Minh</Text>
                    <View style={{ width: "100%", height: 60, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Edit")}
                            style={{
                                flex: 5,
                                backgroundColor: "#1877f2",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Chỉnh sửa trang cá nhân</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Setting")}
                            style={{
                                flex: 1,
                                backgroundColor: "#DDDDDD",
                                height: 40,
                                marginVertical: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>...</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Separator />

                <View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{
                            width: 100,
                            height: 36,
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Giới thiệu</Text>
                        </View>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium, alignSelf: "center", color: "#BBBBBB" }}>Xem thông tin giới thiệu {'>'}</Text>
                        </TouchableOpacity>

                    </View>
                    <Separator />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{
                                height: 36,
                                justifyContent: "center",
                                margin: 10,
                                borderRadius: 24,
                            }}>
                                <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Bạn bè</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: 250, direction: "rtl", margin: 10 }}>
                                <FlatList
                                    data={DATA}
                                    renderItem={({ item }) => <Item item={item} />}
                                    horizontal={true}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={get_list_friends}
                            // onPress={() => navigation.navigate("FriendList", DATA)}
                            style={{
                                backgroundColor: "#DDDDDD",
                                height: 40,
                                marginHorizontal: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: "black", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Xem tất cả bạn bè</Text>
                        </TouchableOpacity>
                    </View>
                    <Separator />
                </View>
                <View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                        <View style={{
                            width: 100,
                            height: 36,
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Bài viết</Text>
                        </View>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium, alignSelf: "center", color: "#BBBBBB" }}>Thêm bài viết {'>'}</Text>
                        </TouchableOpacity>

                    </View>
                    <Separator />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen