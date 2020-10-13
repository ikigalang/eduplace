import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderBack } from "@components";
import { AirbnbRating } from "react-native-ratings";

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
    // console.log(this.state.dataParse.rating);
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
              justifyContent: "flex-end",
              padding: 10,
            }}
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
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icons name={"pdf-box"} color={"#121d45"} size={16} />
                    <TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 14,
                          color: "#121d45",
                        }}
                      >
                        Part 1
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Icons name={"download"} color={"#121d45"} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icons name={"pdf-box"} color={"#121d45"} size={16} />
                    <TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 14,
                          color: "#121d45",
                        }}
                      >
                        Part 2
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Icons name={"download"} color={"#121d45"} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icons
                      name={"play-box-outline"}
                      color={"#121d45"}
                      size={16}
                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 14,
                          color: "#121d45",
                        }}
                      >
                        Part 3
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Icons name={"download"} color={"#121d45"} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icons
                      name={"play-box-outline"}
                      color={"#121d45"}
                      size={16}
                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 14,
                          color: "#121d45",
                        }}
                      >
                        Part 4
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Icons name={"download"} color={"#121d45"} size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Icons name={"help-circle"} color={"#121d45"} size={16} />
                  <Text
                    style={{ marginLeft: 5, fontSize: 14, color: "#121d45" }}
                  >
                    Community Support
                  </Text>
                </View>
                <Text style={{ marginTop: 5, fontSize: 14, color: "#121d45" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  facilisis diam tortor, eget semper ipsum pellentesque at.
                  Nullam eget magna non dui facilisis mollis vel vel leo. Morbi
                  finibus sodales nibh in rhoncus. Integer vehicula orci luctus
                  justo malesuada placerat. Nullam tempus tristique dolor quis
                  auctor. Phasellus quis dolor lorem. Sed volutpat nec est a
                  convallis. Suspendisse ornare elit convallis sem laoreet
                  rhoncus. Quisque consectetur nibh at felis luctus aliquet.
                  Nunc faucibus libero lectus, et egestas felis sagittis eget.
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
    console.log(dataStorage);
    // this.setState({ rating: dataStorage });
    // this.updateDataCourse();
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

    fetch(`http://10.10.0.252:8020/course/update/${id}`, {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
