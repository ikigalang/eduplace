import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";

export default class Splash extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      txtEmail: "",
      txtPassword: "",
      profile: null,
      save: [],
    };
  }

  checkDataUser() {
    let email = this.state.txtEmail;
    let password = this.state.txtPassword;
    let data = {
      email: email,
      password: password,
    };

    this.setState({ save: data });
    const json = JSON.stringify(data);
    fetch("http://10.10.0.252:8020/users/login", {
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
        if (res.status) {
          if (res.isAdmin) {
            // console.log(res.isAdmin);
            this.setSessionListeners(res);
            this.props.navigation.navigate("MainAdmin");
          } else {
            // console.log(res.isAdmin);
            this.setSessionListeners(res);
            this.props.navigation.navigate("MainUser");
          }
        } else {
          alert(`Login failed ! Please check your email or password.`);
        }
      })
      .catch(() => {
        alert("There was an error logging in !");
      })
      .done();
  }

  setSessionListeners = (data) => {
    // console.log(data);
    return new Promise(async (resolve) => {
      let save = this.state.save;
      try {
        await AsyncStorage.setItem("user_session", JSON.stringify(data));
        // AsyncStorage.setItem("user_session", JSON.stringify(data), () => {
        //   AsyncStorage.mergeItem("user_session", JSON.stringify(save), () => {
        //     AsyncStorage.getItem("user_session", (err, result) => {
        //       AsyncStorage.setItem("user_session", JSON.stringify(result));
        //     });
        //   });
        // });
        return resolve(true);
      } catch (e) {
        return resolve(false);
      }
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Youremail@mail.com"
          autoCapitalize="none"
          onChangeText={(txtEmail) => this.setState({ txtEmail })}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(txtPassword) => this.setState({ txtPassword })}
        />
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.checkDataUser.bind(this)}
          >
            <Text style={styles.textButton}>SIGN IN</Text>
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
