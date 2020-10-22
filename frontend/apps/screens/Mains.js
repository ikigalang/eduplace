import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./moduls/Home";
import Search from "./moduls/Search";
import Account from "./moduls/accounts/MyAccount";
import Course from "./moduls/courses/Course";

const Tab = createMaterialBottomTabNavigator();

export default function Mains() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      inactiveColor="#f39c12"
      activeColor="#fff"
      barStyle={{
        backgroundColor: "#121d45",
        paddingTop: 10,
        paddingBottom: 15,
        height: 67,
        borderTopColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Icons name={"home"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused, color, size }) => (
            <Icons name={"magnify"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarLabel: "Course",
          tabBarIcon: ({ focused, color, size }) => (
            <Icons name={"google-classroom"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused, color, size }) => (
            <Icons name={"account-circle"} color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
