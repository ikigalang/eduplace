import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "./moduls/home";
import Search from "./moduls/search";
import CourseList from "./moduls/course/listCourse";
import AccountAdmin from "./moduls/admin/accountAdmin";

const Tab = createBottomTabNavigator();

export default class Mains extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#f39c12",
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
            borderTopColor: "#fff",
          },
          labelStyle: {
            fontSize: 10,
          },
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
          name="CourseList"
          component={CourseList}
          options={{
            tabBarLabel: "Course",
            tabBarIcon: ({ focused, color, size }) => (
              <Icons name={"google-classroom"} color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountAdmin"
          component={AccountAdmin}
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
}
