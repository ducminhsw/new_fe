import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'

import AppContext from '../context/AppContext'

import { assets, COLORS, FONTS, SIZES } from '../constants'
import Separator from '../components/Separator'
import { avatar_basic, BaseURL, coverImage_basic } from '../ultis/Constants'

const ProfileViewScreen = ({ route }) => {
    const appContext = useContext(AppContext)
    const isFocus = useIsFocused()
    appContext.loginState.socket.on("connect", () => {
        console.log("this is socket id ");
    });
    const navigation = useNavigation()

    const { id, avatar, username, coverImage, is_friend, description, birthday } = route.params.user_info
    const user_state = route.params.user_info
    const [block, setBlock] = useState(0)
    const [friendState, setFriendState] = useState("")
    const [friend, setFriend] = useState(is_friend)
    const [state, setState] = useState(null);
    const [room, setRoom] = useState("")

    useEffect(() => {
        const is_block = () => {
            if (JSON.stringify(appContext.loginState.block_list) == JSON.stringify([])) {
                console.log("Not blocked yet")
                setBlock(0)
            } else {
                console.log("Blocked")
                let blockArr = appContext.loginState.block_list
                let index = blockArr.findIndex(e => e.id.equals(id))
                if (index >= 0) setBlock(1)
            }
        }
        is_block()
    }, [navigation, isFocus])

    const sentFriendRequest = async () => {
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/friend/set_request_friend`,
                {},
                {
                    params: {
                        token: appContext.loginState.token,
                        user_id: id
                    }
                }
            )
            console.log(res.data)
            setFriend('1')
        } catch (error) {
            Alert.alert(
                "Kh??ng th??? thao t??c",
                "Ki???m tra l???i thi???t b??? v?? k???t n???i c???a b???n, hi???n t???i kh??ng th??? x??? l?? y??u c???u",
                {
                    text: "OK",
                    style: 'cancel'
                }

            )
            console.log("sentFriendRequest " + error)
        }
    }

    const unFriend = async () => {
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/friend/delete_friend`,
                {},
                {
                    params: {
                        token: appContext.loginState.token,
                        user_id: id
                    }
                }
            )
            console.log(res.data)
            setFriend('0')
        } catch (error) {
            Alert.alert(
                "Kh??ng th??? thao t??c",
                "Ki???m tra l???i thi???t b??? v?? k???t n???i c???a b???n, hi???n t???i kh??ng th??? x??? l?? y??u c???u",
                {
                    text: "OK",
                    style: 'cancel'
                }

            )
            console.log("unFriend " + error)
        }
    }

    const unRequest = async () => {
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/friend/set_request_friend`,
                {},
                {
                    params: {
                        token: appContext.loginState.token,
                        user_id: id
                    }
                }
            )
            console.log(res)
            setFriend('0')
        } catch (error) {
            Alert.alert(
                "Kh??ng th??? thao t??c",
                "Ki???m tra l???i thi???t b??? v?? k???t n???i c???a b???n, hi???n t???i kh??ng th??? x??? l?? y??u c???u",
                {
                    text: "OK",
                    style: 'cancel'
                }

            )
            console.log("unRequest " + error)
        }
    }

    const denyRequest = async () => {
        try {
            const res = await axios.post(
                `${BaseURL}/it4788/friend/set_accept_friend`,
                {},
                {
                    params: {
                        token: appContext.loginState.token,
                        user_id: id
                    }
                }
            )
            console.log(res)
            setFriend('0')
        } catch (error) {
            Alert.alert(
                "Kh??ng th??? thao t??c",
                "Ki???m tra l???i thi???t b??? v?? k???t n???i c???a b???n, hi???n t???i kh??ng th??? x??? l?? y??u c???u",
                {
                    text: "OK",
                    style: 'cancel'
                }

            )
            console.log(error)
        }
    }

    const make_friend_choice = () => {
        if (friendState == "B??? Ch???n") {
            Alert.alert(
                "L???i",
                `????? thao t??c b???n c???n b??? ch???n ${username}`,
                [
                    {
                        text: "OK",
                        style: 'cancel'
                    }
                ]
            )
        } else if (friendState == "B???n b??") {
            Alert.alert(
                "H???y k???t b???n",
                `B???n mu???n h???y k???t b???n v???i ${username}`,
                [
                    {
                        text: "OK",
                        onPress: unFriend
                    },
                    {
                        text: "H???y",
                        style: 'cancel'
                    }
                ]
            )
        } else if (friendState == "H???y l???i m???i") {
            Alert.alert(
                "H???y k???t b???n",
                `B???n mu???n h???y l???i m???i k???t b???n g???i ?????n ${username}`,
                [
                    {
                        text: "OK",
                        onPress: unRequest
                    },
                    {
                        text: "H???y",
                        style: 'cancel'
                    }
                ]
            )
        } else if (friendState == "T??? ch???i l???i m???i") {
            Alert.alert(
                "T??? ch???i",
                `B???n mu???n t??? ch???i l???i m???i k???t b???n c???a ${username}`,
                [
                    {
                        text: "OK",
                        onPress: denyRequest
                    },
                    {
                        text: "H???y",
                        style: 'cancel'
                    }
                ]
            )
        } else if (friendState == "K???t b???n") {
            sentFriendRequest()
        }
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

    var MSG_LIST = [{}]

    const generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }

    useEffect(() => {
        if (friend == '3') setFriendState("B???n b??")
        else if (friend == '0') setFriendState("K???t b???n")
        else if (friend == '1') setFriendState("H???y l???i m???i")
        else if (friend == '2') setFriendState("T??? ch???i")

        if (block == 1) setFriendState("B??? Ch???n")
    }, [friend, block])

    const blockUser = async () => {
        const res = await axios.post(
            `${BaseURL}/friend/set_block`,
            {},
            {
                params: {
                    token: appContext.loginState.token,
                    user_id: id,
                    type: block
                }
            }
        )
        setBlock(1)
        console.log(res)
    }

    const blockAlert = () => {
        Alert.alert('Block Alert', 'Do you want to block/unblock this user?',
            [
                {
                    text: 'Yes',
                    onPress: () => blockUser,
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ])
    }

    const getFriends = async () => {
        navigation.push("FriendList", id)
        console.log("Another user_id: " + id)
    }

    const Item = ({ item }) => {
        return (
            <TouchableOpacity
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
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView>
                <View style={{
                    alignItems: "center"
                }}>
                    <Image
                        source={{ uri: coverImage ? coverImage : coverImage_basic.uri }}
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
                            source={{ uri: avatar ? avatar : avatar_basic.uri }}
                            resizeMode="cover"
                            style={{ width: 160, height: 160, alignSelf: "center", borderRadius: 300, }} />
                    </View>
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: SIZES.extraLarge, marginTop: 10, }}>{username}</Text>
                    <View style={{ width: "100%", height: 60, flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={make_friend_choice}
                            style={{
                                flex: 4,
                                flexDirection: 'row',
                                backgroundColor: "#1877f2",
                                height: 40,
                                margin: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"

                            }}>
                            <Image
                                source={assets.friend_ic}
                                style={{
                                    width: 28,
                                    height: 28,
                                    tintColor: "white",
                                    margin: 2
                                }}
                            />
                            <Text style={{ color: "white", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>{friendState}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => {
                                if (block == 1) {
                                    Alert.alert(
                                        "L???i",
                                        `????? nh???n tin b???n c???n b??? ch???n ${username}`,
                                        [
                                            {
                                                text: "OK",
                                                style: 'cancel'
                                            }
                                        ]
                                    )
                                    return
                                }
                                var conversationId='';
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
                                for(var i in listConversation){
                                    if(listConversation[i].partner.id == id){
                                        conversationId = listConversation[i].id;
                                        break;
                                    }
                                }
                                if(conversationId != '') {
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
                                        partner_id: id,
                                        username: username,
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
                                            message: 'Gi??? ????y 2 b???n ???? c?? th??? nh???n tin cho nhau',
                                            sender: {
                                                id: appContext.loginState.user_id,  // My ID
                                            }
                                        }
                                    ]
                                    setRoom("" + newKey)
                                    appContext.loginState.socket.emit("join_room", room)
                                    navigation.navigate('ChatView', {
                                        data: MSG_LIST,
                                        partner_id: id,
                                        username: username,
                                        conversation_id: room,
                                        avatar: avatar ? avatar : avatar_basic.uri,
                                    })
                                }
                            }}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: "#dddddd",
                                height: 40,
                                marginVertical: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Image
                                source={assets.mess_ic}
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: "black",
                                    margin: 2
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={blockAlert}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                backgroundColor: "#dddddd",
                                height: 40,
                                marginVertical: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: "black", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>...</Text>
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
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>Gi???i thi???u</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.push("EditView", user_state)}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                margin: 10,
                                marginBottom: 0,
                                borderRadius: 24,
                            }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium, alignSelf: "center", color: "#BBBBBB" }}>Xem th??ng tin gi???i thi???u {'>'}</Text>
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
                                <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>B???n b??</Text>
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
                            onPress={getFriends}
                            style={{
                                backgroundColor: "#DDDDDD",
                                height: 40,
                                marginHorizontal: 10,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: "black", fontFamily: FONTS.semiBold, fontSize: SIZES.medium }}>Xem t???t c??? b???n b??</Text>
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
                            <Text style={{ fontFamily: FONTS.medium, fontSize: SIZES.medium }}>B??i vi???t</Text>
                        </View>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            justifyContent: "center",
                            margin: 10,
                            marginBottom: 0,
                            borderRadius: 24,
                        }}>
                            <Text style={{ fontFamily: FONTS.regular, fontSize: SIZES.medium, alignSelf: "center", color: "#BBBBBB" }}>Th??m b??i vi???t {'>'}</Text>
                        </TouchableOpacity>

                    </View>
                    <Separator />
                </View>
            </ScrollView>
        </View>
    )
}

export default ProfileViewScreen