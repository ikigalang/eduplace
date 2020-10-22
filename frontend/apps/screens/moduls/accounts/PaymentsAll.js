import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  ScrollView,
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
      course: [],
      delStorage: [],
      dataStorage: [],
    };
  }

  componentDidMount() {
    this.getProfile();
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    if (data !== null) {
      let resultParsed = JSON.parse(data);
      await this.checkUser(resultParsed._id);
      this.getCourse();
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
  getCourse() {
    fetch(HOST_URL + "/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ course: json });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addPayment = async () => {
    await this.state.dataParse.forEach(async (item, index) => {
      let myCourse = [];
      this.state.course.forEach((obj) => {
        if (item === obj._id) {
          myCourse = obj;
        }
      });
      let data = {
        courseId: item,
        accountId: this.state.profile._id,
        price: myCourse.price,
        status: false,
      };
      const json = JSON.stringify(data);

      console.log(json);
      await fetch(HOST_URL + "/transaction/add", {
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
          await this.addPurchased(res._id, index);
          // alert(res.response);
          // this.props.navigation.navigate("CartCourse");
        })
        .catch((error) => {
          console.log(error);
          alert("There was an error updating your transaksi.");
        })
        .done();
    });
    // await this.addPurchased();

    // this.props.navigation.navigate("CartCourse");
  };

  countData(idPurchased, index) {
    let delStorage = this.state.dataParse;
    delStorage.splice(index, 1);
    console.log(delStorage);
    let dataStorage = this.state.profile.coursePurchased;
    dataStorage.push(idPurchased);
    console.log(dataStorage);
    this.setState({
      delStorage: delStorage,
      dataStorage: dataStorage,
    });
  }
  addPurchased(idPurchased, index) {
    let password = this.state.password;
    let id = this.state.profile._id;
    let delStorage = this.state.dataParse;
    delStorage.splice(index, 1);
    console.log(delStorage);
    let dataStorage = this.state.profile.coursePurchased;
    dataStorage.push(idPurchased);
    console.log(dataStorage);
    let data = {
      email: this.state.profile.email,
      password: password,
      isAdmin: this.state.profile.isAdmin,
      coursePurchased: dataStorage,
      courseOwned: this.state.profile.courseOwned,
      cart: delStorage,
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
    // console.log(this.state.dataParse);
    return (
      <View style={styles.container}>
        <HeaderBack title="Payment" nav={this.props.navigation} />
        <ScrollView>
          <Text
            style={{
              color: "#121d45",
              fontWeight: "bold",
              fontSize: 16,
              paddingTop: 20,
              paddingLeft: 20,
            }}
          >
            Total Item : {this.state.dataParse.length} items
          </Text>
          {this.renderView()}
          <View
            style={{ flexDirection: "row", paddingTop: 10, paddingLeft: 20 }}
          >
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                marginLeft: 65,
              }}
            >
              : IDR {this.getPayment()}
            </Text>
          </View>
          <View
            style={{ paddingLeft: 20, paddingRight: 20, alignItems: "center" }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}
            >
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
                0987654321
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
            <Text style={{ fontSize: 16, color: "#121d45", paddingTop: 10 }}>
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
        </ScrollView>
      </View>
    );
  }

  getPayment() {
    let total = 0;
    this.state.dataParse.forEach((item) => {
      let price;
      this.state.course.forEach((obj) => {
        if (item === obj._id) {
          price = obj.price;
        }
      });
      total += price;
    });
    // console.log("total");
    // console.log(total);

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
      // console.log(this.state.result);
      if (this.state.dataParse.length > 0) {
        return (
          <FlatList
            data={this.state.dataParse}
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
                    flexDirection: "row",
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingTop: 5,
                    // justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderRadius: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "#121d45",
                        fontWeight: "bold",
                        fontSize: 16,
                        marginRight: 5,
                      }}
                    >
                      {index + 1} .
                    </Text>
                    <Text
                      style={{
                        color: "#121d45",
                        fontWeight: "bold",
                        fontSize: 16,
                        width: 150,
                      }}
                      numberOfLines={2}
                    >
                      {myCourse.title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#121d45",
                      fontWeight: "bold",
                      fontSize: 16,
                      marginLeft: 50,
                    }}
                  >
                    IDR {myCourse.price}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
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
  container: {
    flex: 1,
  },
});
