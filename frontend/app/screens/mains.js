import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './moduls/home'
import Search from './moduls/search'
import Course from './moduls/course/course'
import Account from './moduls/account/account'

const Tab=createBottomTabNavigator()

export default function Mains(){
    return(
        <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    activeTintColor: '#fff',
                    inactiveTintColor: '#f39c12',
                    showLabel: true,
                    scrollEnabled: true,
                    upperCaseLabel: false,
                    showIcon: true,
                    allowFontScaling: true,
                    style: {
                        backgroundColor: "#121d45",
                        paddingTop: 10,
                        paddingBottom: 15,
                        height: 67,
                        borderTopColor: '#fff'
                    },
                    labelStyle: { 
                        fontSize: 10,
                    },
                }}
            >
            <Tab.Screen name="Home" component={Home} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => ( 
                        <Icons name={'home'} color={color} size={24}/>
                    ),
                }}
            />
            <Tab.Screen name="Search" component={Search} 
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, color, size }) => ( 
                        <Icons name={'magnify'} color={color} size={24}/>
                    ),
                }}
            />
            <Tab.Screen name="Course" component={Course} 
                options={{
                    tabBarLabel: 'Course',
                    tabBarIcon: ({ focused, color, size }) => ( 
                        <Icons name={'google-classroom'} color={color} size={24}/>
                    ),
                }}
            />
            <Tab.Screen name="Account" component={Account} 
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ focused, color, size }) => ( 
                        <Icons name={'account-circle'} color={color} size={24}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

