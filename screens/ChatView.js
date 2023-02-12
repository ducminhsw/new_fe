import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import axios from 'axios'
import io from "socket.io-client"
import AppContext from "../context/AppContext";
import { avatar_basic, BaseURL } from "../ultis/Constants";

const ChatView = ({ route }) => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const height = useHeaderHeight()
    const messEndRef = useRef(null)

    var MSG_LIST = route.params.data
    const partner_id = route.params.partner_id
    const conversation_id = route.params.conversation_id
    const avatarChat = route.params.avatar

    useEffect(() => {
        appContext.loginState.socket.on("receive_message", (data) => {
            console.log("data is reset " + data)
            const newKey = generateKey(8);
            const newMessage = {
                message_id: newKey,
                message: data.message,
                sender: {
                    id: data.senderId
                }
            };
            MSG_LIST.push(newMessage);
            refreshFlatList(newKey);
            messEndRef.current?.scrollToEnd()
        })
    }, [appContext.loginState.socket])

    const refreshFlatList = (activeKey) => {
        setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
        console.log("croll to the end")
        messEndRef.current?.scrollToEnd()
    }

    const [state, setState] = useState({
        newMsg: '',
        idCate: 1
    })

    const generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 10 }}
                ref={messEndRef}
                data={MSG_LIST}
                keyExtractor={item => item.message_id}
                renderItem={({ item, index }) => {
                    return (<View>{item.sender.id == appContext.loginState.user_id ? // My ID
                        <View style={styles.sendContainer}>
                            <View style={styles.msgContainer}>
                                <Text style={styles.sendMsg}>{item.message}</Text>
                            </View>
                        </View>
                        :
                        <View style={styles.receivedContainer}>
                            <View style={styles.proPicContainer}>
                                <Image style={styles.proPic} source={{ uri: avatarChat ? avatarChat : avatar_basic }} />
                            </View>
                            <View style={styles.receivedMsgContainer}>
                                <Text style={styles.receivedMsg}>{item.message}</Text>
                            </View>
                        </View>
                    }
                    </View>
                    )

                }}>
            </FlatList>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 0.1 }}
                keyboardVerticalOffset={height}
                enabled>
                <View style={styles.inputContainer}>
                    <View style={styles.sendMsgContainer}>
                        <TextInput
                            placeholder="Aa"
                            style={styles.input}
                            onChangeText={newText => setState({ newMsg: newText })}
                            value={state.newMsg} />
                        <Entypo name="emoji-happy" size={responsiveFontSize(2.5)} color="gray" />
                    </View>

                    <TouchableOpacity onPress={async () => {
                        if (state.newMsg != "") {
                            const newKey = generateKey(8);
                            const newMessage = {
                                message_id: newKey,
                                message: state.newMsg,
                                sender: {
                                    id: appContext.loginState.user_id,
                                }
                            };
                            MSG_LIST.push(newMessage);
                            refreshFlatList(newKey);
                            messEndRef.current?.scrollToEnd()
                            try {
                                const res = await axios.post(
                                    `${BaseURL}/it4788/chat/add_dialog`,
                                    {},
                                    {
                                        params: {
                                            dialogId: generateKey(8),
                                            conversationId: "" + conversation_id,  // conversationId
                                            senderId: appContext.loginState.user_id,   // My ID => firstUser or secondUser
                                            content: state.newMsg
                                        }
                                    }
                                )
                                appContext.loginState.socket.emit("send_message", {
                                    room: conversation_id,
                                    senderId: appContext.loginState.user_id,
                                    message: state.newMsg
                                })
                                messEndRef.current?.scrollToEnd()
                            } catch (error) {
                                console.log(`error: ${error}`);
                            }
                        }
                    }} style={styles.icon}>
                        <FontAwesome5 name="paper-plane" size={responsiveFontSize(3.5)} color="#006AFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default ChatView

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    inputContainer: {
        height: responsiveHeight(7),
        flexDirection: 'row',
        alignItems: 'center',
        shadowRadius: 20,
        elevation: 3,
        paddingLeft: 10,
        paddingBottom: 5
    },
    input: {
        flex: 1,
        fontSize: responsiveFontSize(2)
    },
    sendMsgContainer: {
        width: '86%',
        backgroundColor: '#DDDDDD',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: '70%'
    },
    icon: {
        padding: 5,
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgContainer: {
        backgroundColor: '#006AFF',
        borderRadius: 20,
        padding: 10,
        maxWidth: '80%'
    },
    sendMsg: {
        color: 'white',
        fontWeight: '500',
        fontSize: responsiveFontSize(1.9)
    },
    sendContainer: {
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end'
    },
    receivedContainer: {
        paddingHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        maxWidth: '80%'
    },
    receivedMsgContainer: {
        backgroundColor: '#F1F0F0',
        borderRadius: 20,
        padding: 10,
    },
    receivedMsg: {
        color: 'black',
        fontWeight: '500',
        fontSize: responsiveFontSize(1.9)
    },
    proPicContainer: {
        display: 'flex',
        paddingRight: 10,
        justifyContent: 'flex-end',
        // backgroundColor : 'red'
    },
    proPic: {
        width: responsiveHeight(4),
        height: responsiveHeight(4),
        borderRadius: 200
    }
})