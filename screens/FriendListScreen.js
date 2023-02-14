import { View, Text, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import AppContext from '../context/AppContext'
import { avatar_basic, BaseURL } from '../ultis/Constants'

const FriendListScreen = ({ route }) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const isFocus = useIsFocused()
    console.log(route.params)

    const user_id = route.params
    const [friendlist, setFriendList] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.post(
                    `${BaseURL}/it4788/friend/get_user_friends`,
                    {},
                    {
                        params: {
                            token: appContext.loginState.token,
                            user_id: user_id,
                            index: 0,
                            count: 20
                        }
                    }
                )
                console.log("We calling api friend for: " + user_id)
                setFriendList(res.data.data.friends)
            } catch (error) {
                console.log(error)
                setFriendList([])
            }
        }
        getFriends()
    }, [navigation, isFocus])

    // get_friend_info
    const get_item_info = async (userId) => {
        const res = await axios.post(
            `${BaseURL}/it4788/user/get_user_info`,
            {},
            {
                params: {
                    token: appContext.loginState.token,
                    user_id: userId
                }
            }
        )
        const user_info = res.data.data
        if (user_info.id == appContext.loginState.user_id) {
            navigation.navigate("Profile")
        } else {
            navigation.push("ProfileView", { user_info })
        }
    }

    if (JSON.stringify(friendlist) == JSON.stringify([])) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
                <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium }}>Bạn chưa có một người bạn nào</Text>
            </View>
        )
    }

    const FriendItem = ({ item }) => {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => get_item_info(item.id)}
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    margin: 10,
                    marginLeft: 20
                }}>
                <Image
                    source={{ uri: (item.avatar) ? item.avatar : avatar_basic.uri }}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 100,
                    }}
                />
                <Text style={{ marginLeft: 16, fontFamily: FONTS.medium }}>{item.username}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
                data={friendlist}
                renderItem={({ item }) => <FriendItem item={item} />} />
        </View>
    )
}

export default FriendListScreen