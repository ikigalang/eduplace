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
import { HeaderMain } from "@components";
import { HOST_URL } from "@env";
import { AirbnbRating } from "react-native-ratings";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      course: [],
      transaction: [],
      isLoading: true,
      isCheck: false,
    };
  }

  componentDidMount = async () => {
    await this.getProfile();
  };
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    if (data !== null) {
      this.setState({ isCheck: true });
      let resultParsed = JSON.parse(data);
      this.checkUser(resultParsed._id);
      this.getTransaction();
      this.getCourse();
    } else {
      this.setState({ isCheck: false });
    }
  };

  checkUser(id) {
    fetch(HOST_URL + `/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          result: res.coursePurchased,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCourse() {
    fetch(HOST_URL + "/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ course: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
    this.setState({ isLoading: true, result: [] }, this.getProfile);
  };
  render() {
    return (
      <View>
        <HeaderMain title="List Course" nav={this.props.navigation} />
        {this.checkData()}
      </View>
    );
  }

  checkData() {
    if (this.state.isCheck) {
      return (
        <ScrollView scrollEventThrottle={16}>
          <View style={{ marginBottom: 100 }}>{this.renderView()}</View>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{
            height: 500,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icons name={"alert-octagram"} color={"#e84f41"} size={32} />
          <Text style={{ fontSize: 14, color: "#121d45" }}>
            You are not logged in !
          </Text>
        </View>
      );
    }
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
      if (this.state.result.length > 0) {
        let jumlah = 0;
        this.state.result.forEach((cek) => {
          this.state.transaction.forEach((tr) => {
            if (tr._id === cek) {
              if (tr.status) {
                jumlah += 1;
              }
            }
          });
        });

        if (jumlah > 0) {
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
                      <View
                        style={{ width: 322, marginLeft: 20, marginTop: 20 }}
                      >
                        <View style={styles.cover}>
                          <Image
                            source={{
                              uri:
                                HOST_URL +
                                "/course/image/" +
                                myCourse.posterUrl,
                            }}
                            style={{
                              width: 322,
                              height: 128,
                              borderRadius: 20,
                            }}
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
              keyExtractor={(item, index) => index.toString()}
              refreshing={this.state.isLoading}
              contentContainerStyle={{ paddingTop: 5 }}
              onRefresh={this._onRefresh}
            />
          );
        } else {
          return (
            <View
              style={{
                height: 500,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Icons name={"alert-octagram"} color={"#e84f41"} size={32} />
              <Text style={{ fontSize: 14, color: "#7f8c8d", width: 200 }}>
                There is no course that has been approved by the admin !
              </Text>
            </View>
          );
        }
      } else {
        return (
          <View
            style={{
              height: 500,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Icons name={"alert-octagram"} color={"#e84f41"} size={32} />
            <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
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
