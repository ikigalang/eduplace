import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  AsyncStorage,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { AirbnbRating } from "react-native-ratings";
import { HOST_URL } from "@env";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      id: "",
      name: "",
      email: "",
      image: null,
      result: [],
      cart: [],
      course: [],
      transaction: [],
      purchase: [],
      isCheck: false,
      isAdmin: false,
    };
  }

  componentDidMount = async () => {
    await this.setState({ isLoading: true }, this.getProfile);
    // this.setState({ isLoading: true });
    // await this.getProfile;
  };

  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    let resultParsed = JSON.parse(data);
    console.log("async");
    console.log(resultParsed);
    if (data !== null) {
      this.setState({ isCheck: true });
      this.checkUser(resultParsed._id);
      this.getTransaction();
      this.getCourse();
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  checkUser(id) {
    fetch(HOST_URL + `/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          result: res,
          name: res.name,
          email: res.email,
          image: res.photoUrl,
          cart: res.cart,
          purchase: res.coursePurchased,
          isAdmin: res.isAdmin,
        });
        // this.getTransaction();
        // this.getCourse();
        console.log("api");
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCourse = () => {
    fetch(HOST_URL + "/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ course: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getTransaction() {
    fetch(HOST_URL + "/transaction/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ transaction: json });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _onRefresh = () => {
    this.setState(
      { isLoading: true, result: [], cart: [], purchase: [] },
      this.getProfile
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#fff",
            borderWidth: 5,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderStartWidth: 1,
            borderBottomColor: "rgba(18, 29, 69, 0.7)",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: Constants.statusBarHeight,
              padding: 10,
            }}
          >
            {this.renderImage()}
            <View
              style={{
                padding: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "#121d45" }}
              >
                {this.state.name}
              </Text>
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#121d45" }}
              >
                {this.state.email}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Icons name={"book-multiple"} color={"#f39c12"} size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#f39c12",
                }}
              >
                History Of Course : {this.state.purchase.length} items
              </Text>
            </View>
            <View>{this.renderPurchased()}</View>
          </View>
          <View style={{ paddingTop: 10 }}>
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Icons name={"cart"} color={"#f39c12"} size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#f39c12",
                }}
              >
                Cart Of Course : {this.state.cart.length} items
              </Text>
            </View>
            <View>{this.renderCart()}</View>
          </View>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", marginBottom: 10 }}
              onPress={() => {
                this.state.isCheck
                  ? this.props.navigation.navigate("UpdateAccount", {
                      data: this.state.result,
                    })
                  : alert("Sorry, you are not logged in !");
              }}
            >
              <Icons name={"account-edit"} color={"#f39c12"} size={20} />
              <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
                Change Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", marginBottom: 10 }}
              onPress={() => {
                this.state.isCheck
                  ? alert("Sorry, feature not yet available !")
                  : alert("Sorry, you are not logged in !");
              }}
            >
              <Icons name={"lock-reset"} color={"#f39c12"} size={20} />
              <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
                Change Password
              </Text>
            </TouchableOpacity>
            {this.isCheckAdmin()}
            <TouchableOpacity
              style={{ flexDirection: "row", marginBottom: 10 }}
              onPress={() => {
                this.state.isCheck
                  ? alert("Sorry, feature not yet available !")
                  : alert("Sorry, you are not logged in !");
              }}
            >
              <Icons name={"cogs"} color={"#f39c12"} size={20} />
              <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
                Settings
              </Text>
            </TouchableOpacity>
            {/* {this.checkLogin()} */}

            <TouchableOpacity
              style={{ flexDirection: "row", marginBottom: 10 }}
              onPress={this.handleLogOut}
            >
              <Icons name={"logout"} color={"#f39c12"} size={20} />
              <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderImage() {
    if (this.state.image === null) {
      return <Icons name={"account-circle"} color={"#121d45"} size={100} />;
    } else {
      return (
        <Image
          source={{ uri: HOST_URL + "/users/image/" + this.state.image }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      );
    }
  }

  isCheckAdmin() {
    if (this.state.isAdmin) {
      return (
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 10 }}
            onPress={() => {
              this.props.navigation.navigate("ManageCourse");
            }}
          >
            <Icons name={"book-plus-multiple"} color={"#f39c12"} size={20} />
            <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
              Manage Course
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 10 }}
            onPress={() => {
              this.props.navigation.navigate("ManageTransactions");
            }}
          >
            <Icons name={"cash-multiple"} color={"#f39c12"} size={20} />
            <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
              Manage Transaction
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 10 }}
            onPress={() => {
              this.state.isCheck
                ? this.props.navigation.navigate("PurchaseHistory")
                : alert("Sorry, you are not logged in !");
            }}
          >
            <Icons name={"book-plus-multiple"} color={"#f39c12"} size={20} />
            <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
              Purchase History
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  handleLogOut = async () => {
    await AsyncStorage.removeItem("user_session");
    // await alert("You have successfully logged out of your account !");
    await this.props.navigation.navigate("Feature");
  };

  checkLogin() {
    if (!this.state.isCheck) {
      return (
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 10 }}
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          >
            <Icons name={"login"} color={"#f39c12"} size={20} />
            <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row", marginBottom: 10 }}
            onPress={this.handleLogOut}
          >
            <Icons name={"logout"} color={"#f39c12"} size={20} />
            <Text style={{ fontSize: 16, color: "#121d45", marginLeft: 10 }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderPurchased() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: 50,
          }}
        >
          <ActivityIndicator color="#4c505c" size={"large"} />
          <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
            Mengambil data dari server
          </Text>
        </View>
      );
    } else {
      if (this.state.purchase.length > 0) {
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              contentContainerStyle={{ alignSelf: "flex-start" }}
              numColumns={this.state.purchase.length}
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row" }}
              data={this.state.purchase}
              renderItem={({ item }) => {
                let myCourse = [];
                let courseId;
                let price;
                let status;
                // console.log(this.state.transaction);
                this.state.transaction.forEach((obj) => {
                  if (item === obj._id) {
                    courseId = obj.courseId;
                    price = obj.price;
                    if (obj.status) {
                      status = "Accepted";
                    } else {
                      status = "In The Process";
                    }
                  }
                });

                this.state.course.forEach((objek) => {
                  if (courseId === objek._id) {
                    myCourse = objek;
                  }
                });
                return (
                  <View
                    style={{
                      height: 100,
                      width: 130,
                      marginLeft: 20,
                      padding: 10,
                      backgroundColor: "#121d45",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#fff",
                        marginBottom: 5,
                      }}
                      numberOfLines={2}
                    >
                      {myCourse.title}
                    </Text>

                    <Text
                      style={{
                        fontSize: 12,
                        marginBottom: 5,
                        color: "#fff",
                      }}
                    >
                      IDR {price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                    >
                      Status: {status}
                    </Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              refreshing={this.state.isLoading}
              contentContainerStyle={{ paddingTop: 5 }}
              onRefresh={this._onRefresh}
            />
          </ScrollView>
        );
      } else {
        return (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                padding: 20,
                fontSize: 14,
                color: "#7f8c8d",
                textAlign: "center",
              }}
            >
              Sorry, data not available !
            </Text>
          </View>
        );
      }
    }
  }

  renderCart() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: 50,
          }}
        >
          <ActivityIndicator color="#4c505c" size={"large"} />
          <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
            Mengambil data dari server
          </Text>
        </View>
      );
    } else {
      if (this.state.cart.length > 0) {
        return (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              contentContainerStyle={{ alignSelf: "flex-start" }}
              numColumns={this.state.cart.length}
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: "row" }}
              data={this.state.cart}
              renderItem={({ item }) => {
                let myCourse = [];
                let rating = [];
                this.state.course.forEach((obj) => {
                  if (item === obj._id) {
                    myCourse = obj;
                    rating = obj.rating;
                  }
                });
                let total = 0;
                rating.forEach((rtg) => {
                  total += rtg.rate;
                });
                total /= rating.length;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("DetailCourse", {
                        data: myCourse,
                      });
                    }}
                  >
                    <View
                      style={{
                        height: 100,
                        width: 130,
                        marginLeft: 20,
                        padding: 10,
                        backgroundColor: "#121d45",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                        numberOfLines={3}
                      >
                        {myCourse.title}
                      </Text>

                      <View style={{ alignItems: "flex-start" }}>
                        <AirbnbRating
                          defaultRating={total}
                          isDisabled={true}
                          showRating={false}
                          size={10}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        IDR {myCourse.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              refreshing={this.state.isLoading}
              contentContainerStyle={{ paddingTop: 5 }}
              onRefresh={this._onRefresh}
            />
          </ScrollView>
        );
      } else {
        return (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                padding: 20,
                fontSize: 14,
                color: "#7f8c8d",
                textAlign: "center",
              }}
            >
              Sorry, data not available !
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
    backgroundColor: "#fff",
  },
});
