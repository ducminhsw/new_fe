import { AntDesign, FontAwesome, Zocial } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import AppContext from '../context/AppContext'
import { BaseURL } from '../ultis/Constants'

export default function UserInfo({ route }) {
    const navigation = useNavigation();
    const appContext = useContext(AppContext)

    const username = route.params.name;
    const birthday = new Date(route.params.birthday * 1000).toLocaleDateString();
    const userId = route.params.user_id;
    const description = route.params.description;


    const deleteChat = () => {
        Alert.alert(
            'Alert',
            'Bạn có chắc muốn xóa đoạn hội thoại này?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Yes', onPress: async () => {
                        console.log(`Delete Conversation with ${username}`);
                        try {
                            const res = await axios.post(
                                `${BaseURL}/it4788/chat/delete_conversation`,
                                {},
                                {
                                    params: {
                                        token: appContext.loginState.token,
                                        partner_id: userId
                                    }
                                }
                            )
                            console.log(res.data)
                        } catch (error) {
                            console.log(error);
                        }
                        navigation.navigate('HomeChat');
                    }
                },
            ],
            { cancelable: true }
        )
    }

    const blockChat = () => {
        console.log('block')
    }

    return (
        <View style={styles.model}>

            <View style={styles.content}>
                <View style={styles.centerContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: 'https://i.imgur.com/6oU7JoG.jpg' }} />
                    </View>
                    <Text style={styles.name}>{username}</Text>
                    <Text style={styles.name}>{birthday}</Text>
                    <Text style={styles.name}>{description}</Text>
                </View>
                <TouchableOpacity onPress={deleteChat} style={styles.bottomBtn1}>
                    <Text style={styles.btnText}>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={blockChat} style={styles.bottomBtn}>
                    <Text style={styles.btnText}>BLOCk</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    model: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006aff4f',
        // backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 200,
        // paddingBottom : 20,
    },
    // topContainer: {
    //     height: '20%',
    //     justifyContent: 'flex-end',
    //     flexDirection : 'row',
    //     padding : 10
    // },
    icon: {
        paddingHorizontal: 10
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBtn: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006AFF'
    },
    bottomBtn1: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    btnText: {
        color: 'white',
        fontSize: 18,
    },
    name: {
        fontSize: 24
    },
    facebookTitle: {
        fontSize: 13
    },
    caption: {
        color: 'gray',
        fontSize: 14
    },
    close: {
        width: 35,
        height: 35,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white'
    },
    imageContainer: {
        paddingBottom: 20
    }
})