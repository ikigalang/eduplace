import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderBack } from "@components";
import DialogInput from "react-native-dialog-input";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      course: [],
      profile: [],
      isDialogVisible: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getProfile();
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    let resultParsed = JSON.parse(data);
    // this.setState({
    //   result: resultParsed.cart,
    //   profile: resultParsed,
    // });
    this.checkUser(resultParsed._id);
    this.getCourse();
  };

  checkUser(id) {
    // let id = this.state.id;
    console.log(id);
    fetch(`http://10.10.0.252:8020/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          result: res.cart,
          profile: res,
        });
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCourse() {
    fetch("http://10.10.0.252:8020/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ course: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }
  sendInput(inputText, idCourse, index) {
    console.log("sendInput (DialogInput#1)1: " + inputText);
    console.log("sendInput (DialogInput#1)2: " + index);
    console.log("sendInput (DialogInput#1)3: " + idCourse);
    // this.setState({ password: inputText });
    this.deleteCart(inputText, idCourse, index);
    // this.showDialog(false);
  }

  deleteCart(txtPass, txtxId, index) {
    let id = this.state.profile._id;
    let dataStorage = this.state.result;
    dataStorage.splice(index, 1);
    console.log(dataStorage);
    let data = {
      email: this.state.profile.email,
      password: txtPass,
      isAdmin: this.state.profile.isAdmin,
      coursePurchased: this.state.profile.coursePurchased,
      courseOwned: this.state.profile.courseOwned,
      cart: dataStorage,
      photoUrl: this.state.profile.photoUrl,
      name: this.state.profile.name,
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
        this.showDialog(false);
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating your cart.");
      })
      .done();
  }

  render() {
    console.log("hmm");
    // console.log(this.state.thisCourse);
    return (
      <View>
        <HeaderBack title="Cart" nav={this.props.navigation} />
        <View style={{ padding: 10 }}>
          <Text>items: {this.state.result.length} </Text>
        </View>
        <View style={{ height: 415 }}>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ marginBottom: 10 }}>{this.renderView()}</View>
          </ScrollView>
        </View>

        <View style={{ padding: 10, alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Total :</Text>
            <Text style={{ marginLeft: 30, fontWeight: "bold" }}>
              IDR {this.getPayment()}
            </Text>
          </View>
          <View style={{ alignItems: "center", paddingTop: 10 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#f39c12",
                height: 45,
                width: 250,
                borderRadius: 30,
              }}
              onPress={() =>
                this.props.navigation.navigate("PaymentCart", {
                  data: this.state.result,
                })
              }
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  color: "#fff",
                  paddingTop: 5,
                }}
              >
                BUY NOW
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  getPayment() {
    let total = 0;
    this.state.result.forEach((item) => {
      let price;
      this.state.course.forEach((obj) => {
        if (item === obj._id) {
          price = obj.price;
        }
      });
      total += price;
    });
    console.log("total");
    console.log(total);

    return total;
  }

  renderView() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator color="#4c505c" size={"large"} />
          <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
            Mengambil data dari server
          </Text>
        </View>
      );
    } else {
      console.log(this.state.result);
      if (this.state.result.length > 0) {
        return (
          <FlatList
            data={this.state.result}
            renderItem={({ item, index }) => {
              let myCourse = [];

              this.state.course.forEach((obj) => {
                if (item === obj._id) {
                  myCourse = obj;
                }
              });

              return (
                <View
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderStyle: "dotted",
                    borderWidth: 1,
                  }}
                >
                  <DialogInput
                    isDialogVisible={this.state.isDialogVisible}
                    title={"Please Confirm !"}
                    message={
                      "Are you sure you add them to cart? if sure, then enter your password"
                    }
                    hintInput={"Password"}
                    submitInput={(inputText) => {
                      this.sendInput(inputText, item, index);
                    }}
                    closeDialog={() => {
                      this.showDialog(false);
                    }}
                    textInputProps={{
                      autoCorrect: false,
                      autoCapitalize: false,
                      secureTextEntry: true,
                    }}
                    hintTextColor={"grey"}
                    dialogStyle={{ backgroundColor: "#c5cde8" }}
                  ></DialogInput>
                  <View style={{ padding: 10 }}>
                    <Text style={styles.titleCourse} numberOfLines={3}>
                      {myCourse.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginRight: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.price}>IDR {myCourse.price}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.showDialog(true);
                      }}
                    >
                      <Icons name={"delete"} color={"#121d45"} size={16} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            // refreshing={this.state.isLoading}
            contentContainerStyle={{ paddingTop: 5 }}
            onRefresh={this._onRefresh}
            // onEndReached={this._onLoadMore}
            // onEndThreshold={300}
          />
        );
      } else {
        return (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Icons name={"alert-octagram"} color={"#e84f41"} size={32} />
            <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
              Tidak ada data dari server
            </Text>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  cover: {
    height: 128,
    flex: 1,
    backgroundColor: "#c5cde8",
    borderRadius: 20,
  },
  titleCourse: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#121d45",
    width: 200,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#121d45",
    marginRight: 10,
  },
});
