import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderDetail } from "@components";

import SignIn from "./signin";
import SignUp from "./signup";

const Tab = createMaterialTopTabNavigator();

export default function Mains() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#f5f5f5",
        style: { backgroundColor: "#c5cde8", paddingTop: 150 },

        labelStyle: { fontSize: 16, fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="Sign In" component={SignIn} />
      <Tab.Screen name="Sign Up" component={SignUp} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2D9CDB",
  },
});
