import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { HeaderBack } from "@components";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParse: this.props.route.params.data,
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    };
  }

  updatePasswordUser() {
    if (this.state.oldPassword === this.state.dataParse.password) {
      if (this.state.repeatPassword === this.state.newPassword) {
        let data = {
          email: this.state.dataParse.email,
          password: this.state.newPassword,
          isAdmin: this.state.dataParse.isAdmin,
          coursePurchased: [],
          courseOwned: [],
          cart: [],
          photoUrl: this.state.dataParse.photoUrl,
          name: this.state.dataParse.name,
        };
        const json = JSON.stringify(data);
        console.log(id);
        console.log(json);
        fetch(`http://10.10.0.252:8020/users/update/${id}`, {
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
            console.log(error);
            alert("There was an error updating your account.");
          })
          .done();
      } else {
        alert("Please repeat again your new password !");
      }
    } else {
      alert("Please check your old password again !");
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderBack title="Your Name" nav={this.props.navigation} />
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}>
            Old Password{" "}
          </Text>
          <TextInput
            placeholder="your name"
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "#f39c12",
              height: 35,
              paddingLeft: 10,
              marginTop: 5,
            }}
            onChangeText={(oldPassword) => this.setState({ oldPassword })}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#121d45",
              marginTop: 10,
            }}
          >
            New Password{" "}
          </Text>
          <TextInput
            placeholder="yourmail@mail.com"
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "#f39c12",
              height: 35,
              paddingLeft: 10,
              marginTop: 5,
            }}
            onChangeText={(newPassword) => this.setState({ newPassword })}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#121d45",
              marginTop: 10,
            }}
          >
            Repeat New Password{" "}
          </Text>
          <TextInput
            placeholder="yourmail@mail.com"
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "#f39c12",
              height: 35,
              paddingLeft: 10,
              marginTop: 5,
            }}
            onChangeText={(repeatPassword) => this.setState({ repeatPassword })}
          />
        </View>

        <View style={{ paddingLeft: 235 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#27AE60",
              height: 40,
              width: 100,
              borderRadius: 30,
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "#fff",
                paddingTop: 5,
              }}
            >
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
