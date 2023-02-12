import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import AppContext from "../context/AppContext";
import { avatar_basic, BaseURL } from "../ultis/Constants";
import { assets, COLORS, FONTS, SIZES } from '../constants'

const Users = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const [friends, setFriends] = useState(appContext.loginState.friend_list)
    const [room, setRoom] = useState("")
    let MSG_LIST = [{}]

    const generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.post(
                `${BaseURL}/it4788/friend/get_user_friends`,
                {},
                {
                    params: {
                        token: appContext.loginState.token,
                        index: 0,
                        count: 10
                    }
                }
            )
            const friend_list = res.data.data.friends
            setFriends(friend_list)
            console.log(friends)
        }
        getFriends()
    })

    const getItemChat = async (item) => {
        var conversationId = '';
        const resList = await axios.post(
            `${BaseURL}/it4788/chat/get_list_conversation`,
            {},
            {
                params: {
                    index: 0,
                    count: 50,
                    token: appContext.loginState.token
                }
            }
        )
        const listConversation = resList.data.data;
        for (var i in listConversation) {
            if (listConversation[i].partner.id == item.id) {
                conversationId = listConversation[i].id;
                break;
            }
        }
        if (conversationId != '') {
            const res = await axios.post(
                `${BaseURL}/it4788/chat/get_conversation`,
                {},
                {
                    params: {
                        token: appContext.loginState.token,
                        index: 0,
                        count: 100,
                        conversation_id: conversationId
                    }
                }
            )
            console.log('Get conversation with id: ' + res.data.data.conversationId);
            console.log(res.data.data.conversationId)

            MSG_LIST = res.data.data.conversation;
            setRoom("" + res.data.data.conversationId)
            appContext.loginState.socket.emit("join_room", room)
            navigation.navigate('ChatView', {
                data: MSG_LIST,
                partner_id: item.id,
                username: item.username,
                conversation_id: room,
                avatar: avatar ? avatar : avatar_basic.uri,
            })
            console.log(avatar_basic.uri)
        } else {
            console.log('create conversation')
            const newKey = generateKey(5);
            const res = await axios.post(
                `${BaseURL}/it4788/chat/create_conversation`,
                {},
                {
                    params: {
                        conversationId: newKey,
                        firstUser: appContext.loginState.user_id,   // My Id
                        secondUser: id
                    }
                }
            )
            console.log(res.data.data)
            MSG_LIST = [
                {
                    message_id: generateKey(8),
                    message: 'Giờ đây 2 bạn đã có thể nhắn tin cho nhau',
                    sender: {
                        id: appContext.loginState.user_id,  // My ID
                    }
                }
            ]
            setRoom("" + newKey)
            appContext.loginState.socket.emit("join_room", room)
            navigation.navigate('ChatView', {
                data: MSG_LIST,
                partner_id: item.id,
                username: item.username,
                conversation_id: room,
                avatar: avatar ? avatar : avatar_basic.uri,
            })
        }
    }

    const FriendItem = ({ item }) => {
        console.log(item)
        return (
            <TouchableOpacity
                onPress={() => getItemChat(item.id)}
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
        <View style={styles.container}>
            <FlatList
                data={friends}
                renderItem={({ item }) => <FriendItem item={item} />} />
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    container1: {
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