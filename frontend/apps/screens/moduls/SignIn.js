import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image,
} from "react-native";
import { HeaderBack } from "@components";
import { HOST_URL } from "@env";
import Constants from "expo-constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

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
  componentDidMount = async () => {
    this.setState({
      txtEmail: "",
      txtPassword: "",
    });
  };
  checkDataUser = async () => {
    let email = this.state.txtEmail;
    let password = this.state.txtPassword;
    let data = {
      email: email,
      password: password,
    };
    this.setState({ save: data });
    const json = JSON.stringify(data);
    await fetch(HOST_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        if (res.status) {
          await this.setSessionListeners(res);
          this.setState({
            txtEmail: "",
            txtPassword: "",
          });
          // await alert("Welcome to the EduPlace application !");
          this.props.navigation.navigate("Mains");
        } else {
          alert(`Login failed ! Please check your email or password.`);
        }
      })
      .catch(() => {
        alert("There was an error logging in !");
      })
      .done();
  };

  setSessionListeners = (data) => {
    return new Promise(async (resolve) => {
      try {
        await AsyncStorage.setItem("user_session", JSON.stringify(data));

        return resolve(true);
      } catch (e) {
        return resolve(false);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <HeaderBack title="Sign In" nav={this.props.navigation} /> */}
        <View
          style={{
            paddingTop: 20,
            marginTop: Constants.statusBarHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={require("./images/icons.png")} />
        </View>
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
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
          <View
            style={{
              borderTopWidth: 2,
              marginTop: 20,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#121d45" }}>
              Belum punya akun ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <Text style={{ fontSize: 14, color: "#e67e22" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 210,
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
