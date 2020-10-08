import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AsyncStorage } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
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
      if (result) {
        let resultParsed = JSON.parse(result);
        this.setState({
          email: resultParsed.email,
        });
        console.log(resultParsed.email);
      }
    });
  }

  // Menyimpan ke local data, untuk test kamu bisa close aplikasi atau mematikan telepon mu dan lihat kembali data masih ada
  saveToLocal() {
    let email = this.state.textEmail;
    let password = this.state.textPassword;
    let data = {
      email: email,
      password: password,
    };
    // Menyimpan data ke storage
    const json = JSON.stringify(data);
    console.log(json);
    fetch("http://10.10.1.79:8020/users/login", {
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
          AsyncStorage.setItem("user", res);
          alert(`Success! `);
          // this.props.navigation.navigate("Mains");
          // this.props.navigator.pop();
        } else {
          //   AsyncStorage.setItem('jwt', res.token)
          alert(`Failes!`);
          // Redirect to home screen
          //   this.props.navigator.pop()
        }
      })
      .catch(() => {
        alert("There was an error logging in.");
      })
      .done();
  }

  //Mengahpus Data Local Storage, untuk meyakinkan dan tes silahkan close aplikasi dan buka lagi maka data akan hilang
  // async removeItemValue() {
  //   try {
  //     // Mengahpus data kdari local storage
  //     await AsyncStorage.removeItem("user");
  //     alert("Berhasil Menghapus Data");
  //   } catch (exception) {
  //     console.log(exception);
  //     alert("Gagal Menghapus Data");
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textWho}>Siapa Kamu ?.</Text>
        <Text style={styles.viewResult}>Email: {this.state.email}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(textEmail) => this.setState({ textEmail })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(textPassword) => this.setState({ textPassword })}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />

        <Button
          title="Simpan"
          onPress={this.saveToLocal.bind(this)}
          color="green"
        />
        {/* <View style={styles.viewRemove}>
          <Button
            title="Hapus Storage"
            onPress={this.removeItemValue}
            color="red"
          />
        </View> */}
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
