import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderAccount } from "@components";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: "",
      image: null,
      email: "",
      result: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getProfile);
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    let resultParsed = JSON.parse(data);

    this.checkUser(resultParsed._id);
  };

  checkUser(id) {
    // let id = this.state.id;
    console.log(id);
    fetch(`http://10.10.0.252:8020/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          result: res,
          name: res.name,
          email: res.email,
          image: res.photoUrl,
        });
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    console.log(this.state.result);
    return (
      <View style={styles.container}>
        <HeaderAccount
          title={this.state.result.name}
          nav={this.props.navigation}
        />
        <View
          style={{
            height: 200,
            backgroundColor: "#c5cde8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.renderImage()}
        </View>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: "row" }}>
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
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}
            >
              : {this.state.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
              }}
            >
              Email{" "}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}
            >
              : {this.state.email}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#f39c12",
              height: 40,
              width: 250,
              borderRadius: 30,
            }}
            onPress={() =>
              this.props.navigation.navigate("UpdateAccount", {
                data: this.state.result,
              })
            }
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
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ alignItems: "center", paddingTop: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#e84f41",
              height: 40,
              width: 250,
              borderRadius: 30,
            }}
            onPress={() => this.props.navigation.navigate("UpdatePassword")}
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
              Edit Password
            </Text>
          </TouchableOpacity>
        </View> */}
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#27AE60",
              height: 40,
              width: 250,
              borderRadius: 30,
            }}
            onPress={() => this.props.navigation.navigate("HistoryPayment")}
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
              Manage Purchases
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderImage() {
    if (this.state.image === null) {
      return <Icons name={"account-circle"} color={"#fff"} size={150} />;
    } else {
      return (
        <Image
          source={{ uri: this.state.image }}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
