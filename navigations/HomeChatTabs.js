import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeChat from "../screens/HomeChat";
import Users from "../screens/UserList";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const HomeChatTabs = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({ color }) => {
                    if(route.name === 'Main'){
                        return <MaterialCommunityIcons name="chat" color={color} size={responsiveFontSize(3)} />
                    } else if(route.name === 'Users'){
                        return <FontAwesome5 name="user-friends" color={color} size={responsiveFontSize(3)}/>
                    }
                },
                // tabBarActiveTintColor: 'rgba(211,211,211,0.7)',
                tabBarActiveTintColor: '#325FFC',
                tabBarStyle:{
                    height: 80
                },
                tabBarItemStyle:{
                    padding: 8
                },
                tabBarLabelStyle:{
                    fontSize: responsiveFontSize(1.5)
                }
            })}>
            
            <Tab.Screen
                name="Main"
                options={{ title: 'Chats' }}
                component={HomeChat}/>
            <Tab.Screen
                name="Users"
                component={Users}/>
        </Tab.Navigator>
    )
}

export default HomeChatTabs