import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";
import { HeaderBack } from "@components";
import { HOST_URL } from "@env";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParse: this.props.route.params.data,
      isLoading: false,
      profile: [],
      password: "",
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getProfile);
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    if (data !== null) {
      let resultParsed = JSON.parse(data);
      await this.checkUser(resultParsed._id);
    } else {
      this.setState({ profile: null });
    }
  };
  checkUser(id) {
    // let id = this.state.id;
    console.log(id);
    fetch(HOST_URL + `/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          profile: res,
        });
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  addPayment() {
    let data = {
      courseId: this.state.dataParse._id,
      accountId: this.state.profile._id,
      price: this.state.dataParse.price,
      status: false,
    };
    const json = JSON.stringify(data);

    console.log(json);
    fetch(HOST_URL + "/transaction/add", {
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
        this.addPurchased(res._id);
        alert(res.response);
        this.props.navigation.navigate("DetailCourse");
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating your transaksi.");
      })
      .done();
  }

  addPurchased(idPurchased) {
    let id = this.state.profile._id;
    let dataStorage = this.state.profile.coursePurchased;
    dataStorage.push(idPurchased);
    console.log(dataStorage);
    let data = {
      email: this.state.profile.email,
      password: this.state.password,
      isAdmin: this.state.profile.isAdmin,
      coursePurchased: dataStorage,
      courseOwned: this.state.profile.courseOwned,
      cart: this.state.profile.cart,
      photoUrl: this.state.profile.photoUrl,
      name: this.state.profile.name,
    };
    const json = JSON.stringify(data);
    console.log(id);
    console.log(json);
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
        // alert(res);
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating your purchased.");
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBack title="Payment" nav={this.props.navigation} />
        <View style={{ flexDirection: "row", padding: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#121d45",
              width: 150,
            }}
          >
            Total Payment{" "}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}>
            : IDR {this.state.dataParse.price}
          </Text>
        </View>
        <View
          style={{ paddingLeft: 20, paddingRight: 20, alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}>
            Please make a payment with the following code:
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              backgroundColor: "#f39c12",
              height: 35,
              width: 300,
              paddingLeft: 10,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
                marginTop: 5,
              }}
            >
              {this.state.dataParse._id}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            borderTopWidth: 1,
            borderTopColor: "#121d45",
            paddingTop: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 16, color: "#121d45" }}>
            Please enter your password when you have completed the payment:
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
        <View style={{ paddingTop: 20, paddingLeft: 255 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#27AE60",
              height: 40,
              width: 75,
              borderRadius: 30,
            }}
            onPress={this.addPayment.bind(this)}
          >
            <View style={{ alignItems: "center" }}>
              <Icons name={"check-bold"} color={"#fff"} size={32} />
            </View>
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
