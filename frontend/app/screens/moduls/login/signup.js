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
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isAdmin: false,
      coursePurchased: [],
      courseOwned: [],
      cart: [],
      photoUrl: "",
      name: "",
    };
  }

  addDataUser() {
    let data = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: this.state.isAdmin,
      coursePurchased: [],
      courseOwned: [],
      cart: [],
      photoUrl: null,
      name: this.state.name,
    };
    const json = JSON.stringify(data);
    fetch("http://10.10.0.252:8020/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        alert("Success " + res + " You may now log in.");
      })
      .catch((error) => {
        alert("There was an error creating your account.");
      })
      .done();
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          onChangeText={(name) => this.setState({ name })}
        />
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Youremail@mail.com"
          autoCapitalize="none"
          onChangeText={(email) => this.setState({ email })}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(password) => this.setState({ password })}
        />
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.addDataUser.bind(this)}
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
