import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderBack } from "@components";
import { AirbnbRating } from "react-native-ratings";
import { HOST_URL } from "@env";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.state = {
      dataParse: this.props.route.params.data,
      rating: [],
      idUser: "",
      result: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getProfile);
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    let resultParsed = JSON.parse(data);
    this.setState({
      result: resultParsed,
      idUser: resultParsed._id,
    });
  };

  render() {
    let total = 0;
    this.state.dataParse.rating.forEach((obj) => {
      total += obj.rate;
    });
    total /= this.state.dataParse.rating.length;
    return (
      <View style={styles.container}>
        <HeaderBack title="My Course" nav={this.props.navigation} />
        <ScrollView scrollEventThrottle={16}>
          <View
            style={{
              height: 192,
              backgroundColor: "#c5cde8",
            }}
          >
            <ImageBackground
              source={{
                uri:
                  HOST_URL + "/course/image/" + this.state.dataParse.posterUrl,
              }}
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
                {this.renderDoc()}
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Icons name={"help-circle"} color={"#121d45"} size={16} />
                  <Text
                    style={{ marginLeft: 5, fontSize: 14, color: "#121d45" }}
                  >
                    Community Support
                  </Text>
                </View>
                <Text style={{ marginTop: 5, fontSize: 14, color: "#121d45" }}>
                  {this.state.dataParse.description}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              marginBottom: 20,
            }}
          >
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#121d45" }}
            >
              Rate this course :
            </Text>
            <AirbnbRating
              defaultRating={0}
              showRating={false}
              onFinishRating={this.ratingCompleted}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
    let dataStorage = [
      { rate: rating, userId: this.state.idUser },
      ...this.state.dataParse.rating,
    ];
    let id = this.state.dataParse._id;
    let data = {
      category: this.state.dataParse.category,
      description: this.state.dataParse.description,
      document: this.state.dataParse.document,
      posterUrl: this.state.dataParse.posterUrl,
      price: this.state.dataParse.price,
      rating: dataStorage,
      title: this.state.dataParse.title,
    };

    const json = JSON.stringify(data);

    fetch(HOST_URL + `/course/update/${id}`, {
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
        // this.props.navigation.navigate("ListCourse");
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error updating your account.");
      })
      .done();
  }

  renderDoc() {
    if (this.state.dataParse.document.length > 0) {
      return (
        <View style={{ flexDirection: "row" }}>
          <FlatList
            data={this.state.dataParse.document}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icons name={"pdf-box"} color={"#121d45"} size={16} />
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("OpenCourse", {
                          data: item.documentUrl,
                        });
                      }}
                    >
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 14,
                          color: "#121d45",
                        }}
                      >
                        {item.documentTitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Icons name={"download"} color={"#121d45"} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item._id}
            refreshing={this.state.isLoading}
            contentContainerStyle={{ paddingTop: 5 }}
            onRefresh={this._onRefresh}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
