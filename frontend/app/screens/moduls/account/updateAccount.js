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
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParse: this.props.route.params.data,
      image: null,
      email: "",
      name: "",
      password: "",
    };
  }

  updateDataUser() {
    let email = "";
    let name = "";
    let image = "";
    let id = this.state.dataParse._id;
    if (this.state.email === "") {
      email = this.state.dataParse.email;
    } else {
      email = this.state.email;
    }
    if (this.state.name === "") {
      name = this.state.dataParse.name;
    } else {
      name = this.state.email;
    }
    if (this.state.image === null) {
      image = this.state.dataParse.photoUrl;
    } else {
      image = this.state.image;
    }
    let data = {
      email: email,
      password: this.state.password,
      isAdmin: this.state.dataParse.isAdmin,
      coursePurchased: [],
      courseOwned: [],
      cart: [],
      photoUrl: image,
      name: name,
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
        alert(res);
        this.props.navigation.navigate("AccountUser");
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating your account.");
      })
      .done();
  }

  render() {
    let { image } = this.state;
    // console.log(this.state.dataParse.password);
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
            {/* <Icons name={'account-circle'} color={'#fff'} size={150}/> */}

            {image ? (
              <Image
                source={{ uri: image }}
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                marginTop: 10,
              }}
            >
              Please enter your password to be able to update data !{" "}
            </Text>
            <TextInput
              placeholder="your password"
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#f39c12",
                height: 35,
                paddingLeft: 10,
                marginTop: 5,
              }}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password })}
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
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
