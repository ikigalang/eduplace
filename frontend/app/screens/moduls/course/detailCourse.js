import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  AsyncStorage,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderDetail } from "@components";
import { AirbnbRating } from "react-native-ratings";
import DialogInput from "react-native-dialog-input";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    // this.addCart = this.addCart.bind(this);
    this.state = {
      dataParse: this.props.route.params.data,
      isLoading: false,
      profile: [],
      isCheck: true,
      isDialogVisible: false,
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
      this.setState({ isCheck: true, profile: resultParsed });
    } else {
      this.setState({ isCheck: false });
      this.setState({ profile: null });
    }
  };

  showDialog(isShow) {
    this.setState({ isDialogVisible: isShow });
  }
  sendInput(inputText) {
    console.log("sendInput (DialogInput#1): " + inputText);
    // this.setState({ password: inputText });
    this.addCart(inputText);
    // this.showDialog(false);
  }

  addCart(pass) {
    let idCourse = this.state.dataParse._id;
    let id = this.state.profile._id;
    let dataStorage = this.state.profile.cart;
    dataStorage.push(idCourse);
    console.log(dataStorage);
    let data = {
      email: this.state.profile.email,
      password: pass,
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
    console.log(this.state.profile);
    let total = 0;
    this.state.dataParse.rating.forEach((obj) => {
      total += obj.rate;
    });
    total /= this.state.dataParse.rating.length;
    return (
      <View style={styles.container}>
        <HeaderDetail
          title={this.state.dataParse.title}
          nav={this.props.navigation}
        />
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"Please Confirm !"}
          message={
            "Are you sure you add them to cart? if sure, then enter your password"
          }
          hintInput={"Password"}
          submitInput={(inputText) => {
            this.sendInput(inputText);
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
        <ScrollView scrollEventThrottle={16}>
          <View style={{ height: 192, backgroundColor: "#c5cde8" }}>
            <ImageBackground
              source={{ uri: this.state.dataParse.posterUrl }}
              style={{ height: 192 }}
            >
              <View
                style={{ height: 192, justifyContent: "flex-end", padding: 10 }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}
                  numberOfLines={3}
                >
                  {this.state.dataParse.title}
                </Text>
                <View style={{ alignItems: "flex-start" }}>
                  <AirbnbRating
                    defaultRating={total}
                    isDisabled={true}
                    showRating={false}
                    size={10}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>

          {this.renderView()}
        </ScrollView>
      </View>
    );
  }

  renderView() {
    if (this.state.dataParse.price > 0) {
      return (
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#121d45",
              marginBottom: 10,
            }}
          >
            IDR {this.state.dataParse.price}
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#f39c12",
                height: 45,
                width: 330,
                borderRadius: 30,
              }}
              onPress={() => {
                this.state.isCheck
                  ? this.props.navigation.navigate("Payment", {
                      data: this.state.dataParse,
                    })
                  : alert("Sorry, you are not logged in !");
              }}
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
            <TouchableOpacity
              style={{
                backgroundColor: "#27AE60",
                height: 32,
                width: 330,
                borderRadius: 30,
                marginTop: 10,
              }}
              onPress={() => {
                this.state.isCheck
                  ? this.showDialog(true)
                  : alert("Sorry, you are not logged in !");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#fff",
                  paddingTop: 5,
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20 }}>
            <View
              style={{
                borderWidth: 1,
                borderStyle: "dashed",
                borderRadius: 20,
              }}
            >
              <View style={{ padding: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}
                >
                  This course includes
                </Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Icons name={"book-multiple"} color={"#121d45"} size={16} />
                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 14,
                      color: "#121d45",
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.dataParse.document.length} Files
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 14,
                    color: "#121d45",
                    fontWeight: "bold",
                  }}
                >
                  Description :
                </Text>
                <Text style={{ fontSize: 14, color: "#121d45" }}>
                  {this.state.dataParse.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ padding: 10 }}>
          <View
            style={{
              backgroundColor: "#e84f41",
              width: 70,
              height: 30,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
              }}
            >
              Free
            </Text>
          </View>
          <View style={{ padding: 20 }}>
            <View
              style={{
                borderWidth: 1,
                borderStyle: "dashed",
                borderRadius: 20,
                borderColor: "#f39c12",
              }}
            >
              <View style={{ padding: 10 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#121d45" }}
                >
                  This course includes
                </Text>
                {this.renderDoc()}
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 14,
                    color: "#121d45",
                    fontWeight: "bold",
                  }}
                >
                  Description :
                </Text>
                <Text style={{ fontSize: 14, color: "#121d45" }}>
                  {this.state.dataParse.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  renderDoc() {
    //console.log(this.state.dataParse.documentUrl[1])
    if (this.state.dataParse.document.length > 0) {
      return (
        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={this.state.dataParse.document}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  {this.renderIcon(item)}
                  <TouchableOpacity>
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 14,
                        color: "#121d45",
                        fontWeight: "bold",
                      }}
                    >
                      {item.documentTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            refreshing={this.state.isLoading}
            contentContainerStyle={{ paddingTop: 5 }}
            onRefresh={this._onRefresh}
            // onEndReached={this._onLoadMore}
            // onEndThreshold={300}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Icons name={"book-multiple"} color={"#121d45"} size={16} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 14,
              color: "#121d45",
              fontWeight: "bold",
            }}
          >
            No Files
          </Text>
        </View>
      );
    }
  }

  renderIcon(obj) {
    console.log(obj);
    if (obj.documentUrl.includes(".pdf")) {
      return <Icons name={"pdf-box"} color={"#121d45"} size={16} />;
    } else if (obj.documentUrl.includes(".ppt")) {
      return <Icons name={"play-box-outline"} color={"#121d45"} size={16} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
