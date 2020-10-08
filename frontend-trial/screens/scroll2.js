import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Your name" />
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} placeholder="Youremail@mail.com" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Password" />
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("MainUser")}
          >
            <Text style={styles.textButton}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
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
