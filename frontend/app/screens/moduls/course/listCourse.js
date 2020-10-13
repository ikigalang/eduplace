import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  AsyncStorage,
} from "react-native";
import { Header } from "@components";
import { AirbnbRating } from "react-native-ratings";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      course: [],
      transaction: [],
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
    //   result: resultParsed.coursePurchased,
    // });
    this.checkUser(resultParsed._id);
    this.getTransaction();
    this.getCourse();
  };

  checkUser(id) {
    // let id = this.state.id;
    console.log(id);
    fetch(`http://10.10.0.252:8020/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          result: res.coursePurchased,
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

  getTransaction() {
    fetch("http://10.10.0.252:8020/transaction/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ transaction: json });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  _onRefresh = () => {
    this.setState({ isLoading: true, result: [] }, this.getProfile);
  };
  render() {
    return (
      <View>
        <Header title="List Course" nav={this.props.navigation} />
        <ScrollView scrollEventThrottle={16}>
          <View style={{ marginBottom: 100 }}>{this.renderView()}</View>
        </ScrollView>
      </View>
    );
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
            renderItem={({ item }) => {
              let courseTransaksi;
              let priceCourse;
              let status;
              this.state.transaction.forEach((obj) => {
                if (obj._id === item) {
                  courseTransaksi = obj.courseId;
                  priceCourse = obj.price;
                  status = obj.status;
                }
              });
              let myCourse = [];
              let rating = [];
              this.state.course.forEach((obj) => {
                if (courseTransaksi === obj._id) {
                  myCourse = obj;
                  rating = obj.rating;
                }
              });

              let total = 0;
              rating.forEach((objku) => {
                total += objku.rate;
              });
              total /= rating.length;

              if (status) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("MyCourse", {
                        data: myCourse,
                      });
                    }}
                  >
                    <View style={{ width: 322, marginLeft: 20, marginTop: 20 }}>
                      <View style={styles.cover}>
                        <Image
                          source={{ uri: myCourse.posterUrl }}
                          style={{ width: 322, height: 128, borderRadius: 20 }}
                        />
                      </View>
                      <View
                        style={{ flex: 1, paddingTop: 10, paddingLeft: 10 }}
                      >
                        <Text style={styles.titleCourse} numberOfLines={3}>
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
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
            refreshing={this.state.isLoading}
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
    alignItems: "center",
    justifyContent: "center",
  },
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
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#121d45",
  },
});
