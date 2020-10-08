import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
class Scroller extends Component {
  render() {
    return (
      <ScrollView horizontal={true}>
        <View style={styles.scroll}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Youremail@mail.com"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopWidth: 2,
              marginTop: 20,
              padding: 10,
              borderTopColor: "#121d45",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: "#121d45" }}>
                Do you have an account ?{" "}
              </Text>

              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#121d45" }}
              >
                Sign Up
              </Text>
            </View>
            <Icons name={"chevron-right"} color={"#e67e22"} size={24} />
          </View>
        </View>
        <View style={styles.scroll}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Your Name" />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Youremail@mail.com"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    padding: 20,
    width: 340,
  },
  card: {
    height: "100%",
    width: 200,
  },
  label: {
    fontSize: 12,
    color: "#121d45",
    paddingTop: 10,
    paddingBottom: 5,
  },
  input: {
    backgroundColor: "#121d45",
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 10,
    color: "#fff",
  },
  viewButton: {
    paddingTop: 30,
    paddingLeft: 180,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "#e67e22",
    borderRadius: 30,
  },
  textButton: {
    fontSize: 14,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Scroller;
