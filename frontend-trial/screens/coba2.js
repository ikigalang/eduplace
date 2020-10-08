import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AsyncStorage } from "react-native";

export default class tutorialAsyncStorage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      textEmail: "",
      textPassword: "",
    };

    AsyncStorage.getItem("user", (error, result) => {
      console.log(result);
      if (result) {
        let resultParsed = JSON.parse(result);
        this.setState({
          email: resultParsed.email,
          password: resultParsed.password,
        });
        console.log(resultParsed.email);
      }
    });
  }

  //Mengahpus Data Local Storage, untuk meyakinkan dan tes silahkan close aplikasi dan buka lagi maka data akan hilang
  async removeItemValue() {
    try {
      // Mengahpus data kdari local storage
      await AsyncStorage.removeItem("user");
      alert("Berhasil Menghapus Data");
      this.props.navigation.navigate("Splash");
    } catch (exception) {
      console.log(exception);
      alert("Gagal Menghapus Data");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textWho}>Siapa Kamu ?.</Text>
        <Text style={styles.viewResult}>Email: {this.state.email}</Text>

        <View style={styles.viewRemove}>
          <Button
            title="Hapus Storage"
            onPress={this.removeItemValue}
            color="red"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 16,
    paddingTop: 32,
  },
  textWho: {
    fontWeight: "bold",
    fontSize: 16,
  },
  viewResult: {
    flexDirection: "row",
  },

  textInput: {
    height: 40,
    width: 300,
    backgroundColor: "white",
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 10,
  },
  viewRemove: {
    marginTop: 20,
  },
});
