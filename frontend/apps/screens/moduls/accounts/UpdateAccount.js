import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { HeaderBack } from "@components";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { HOST_URL } from "@env";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParse: this.props.route.params.data,
      image: this.props.route.params.data.photoUrl,
      email: this.props.route.params.data.email,
      name: this.props.route.params.data.name,
      imgFilename: "",
      imgMatch: [],
      imgFile: null,
    };
  }

  updateDataUser() {
    let email = "";
    let name = "";
    let id = this.state.dataParse._id;
    if (this.state.email === "") {
      email = this.state.dataParse.email;
    } else {
      email = this.state.email;
    }
    if (this.state.name === "") {
      name = this.state.dataParse.name;
    } else {
      name = this.state.name;
    }
    let data = {
      email: email,
      password: this.state.dataParse.password,
      isAdmin: this.state.dataParse.isAdmin,
      coursePurchased: this.state.dataParse.coursePurchased,
      courseOwned: this.state.dataParse.courseOwned,
      cart: this.state.dataParse.cart,
      photoUrl: this.state.image,
      name: name,
    };
    const json = JSON.stringify(data);
    fetch(HOST_URL + `/users/update/${id}`, {
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
        alert("Your account has successfully updated !");
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating your account.");
      })
      .done();
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <HeaderBack
          title={this.state.dataParse.name}
          nav={this.props.navigation}
        />
        <ScrollView>
          <View
            style={{
              height: 210,
              backgroundColor: "#c5cde8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image ? (
              <Image
                source={{ uri: HOST_URL + "/users/image/" + this.state.image }}
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
            ) : (
              <Icons name={"account-circle"} color={"#fff"} size={150} />
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                height: 30,
                width: 125,
                borderRadius: 30,
                marginTop: 5,
              }}
              onPress={this._pickImage}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#c5cde8",
                  paddingTop: 5,
                }}
              >
                Change photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
              }}
            >
              Username{" "}
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
              defaultValue={this.state.dataParse.name}
              onChangeText={(name) => this.setState({ name })}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
                marginTop: 10,
              }}
            >
              Email{" "}
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
              autoCapitalize="none"
              defaultValue={this.state.dataParse.email}
              onChangeText={(email) => this.setState({ email })}
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
              onPress={this.updateDataUser.bind(this)}
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
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});
    let file = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);

    this.setState({
      imgFilename: filename,
      imgMatch: match,
      imgFile: await file,
    });
    console.log("filename: " + filename + "\nmatch" + match);
    this.uploadImage();
  };

  uploadImage = async () => {
    const data = JSON.stringify({
      filename: this.state.imgFilename,
      match: this.state.imgMatch,
      base64: this.state.imgFile,
    });
    const upload = await fetch(HOST_URL + "/users/upload/image", {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await upload.json();
    console.log(result);
    this.setState({ image: result.filename });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
