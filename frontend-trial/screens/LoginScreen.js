import React, { Component } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AsyncStorage } from "react-native";

export default class tutorialAsyncStorage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      textName: "",
      textemail: "",
    };

    AsyncStorage.getItem("user_session", (error, result) => {
      if (result) {
        let resultParsed = JSON.parse(result);
        this.setState({
          name: resultParsed.name,
          email: resultParsed.email,
        });
      }
    });
  }

  // Menyimpan ke local data, untuk test kamu bisa close aplikasi atau mematikan telepon mu dan lihat kembali data masih ada
  saveToLocal() {
    let name = this.state.textName;
    let email = this.state.textemail;
    let data = {
      name: name,
      email: email,
    };
    // Menyimpan data ke storage
    const json = JSON.stringify(data);
    fetch("http://10.10.0.69:8020/users/login", {
      method: "POST",

      body: json,
    })
      .then((response) => {
        console.log(response);
      })
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          AsyncStorage.setItem("jwt", res.token);
          alert(`Success! You may now access protected content.`);
          // Redirect to home screen
          this.props.navigator.pop();
        }
      })
      .catch(() => {
        alert("There was an error logging in.");
      })
      .done();
  }

  //  Mengahpus Data Local Storage, untuk meyakinkan dan tes silahkan close aplikasi dan buka lagi maka data akan hilang
  async removeItemValue() {
    try {
      // Mengahpus data kdari local storage
      await AsyncStorage.removeItem("user");
      alert("Berhasil Menghapus Data");
    } catch (exception) {
      console.log(exception);
      alert("Gagal Menghapus Data");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textWho}>Siapa Kamu ?.</Text>
        <Text style={styles.viewResult}>
          Nama: {this.state.name}
          {"\n"}
          Email: {this.state.email}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(textName) => this.setState({ textName })}
          placeholder="Nama"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(textemail) => this.setState({ textemail })}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Button
          title="Simpan"
          onPress={this.saveToLocal.bind(this)}
          color="green"
        />
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
