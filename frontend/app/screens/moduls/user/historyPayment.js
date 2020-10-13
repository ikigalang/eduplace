import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
} from "react-native";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderBack } from "@components";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      purchased: [],
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
    //   result: resultParsed,
    //   purchased: resultParsed.coursePurchased,
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
          result: res,
          purchased: res.coursePurchased,
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
        <HeaderBack title="Purchase History" nav={this.props.navigation} />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#121d45" }}>
            Total Purchase : {this.state.purchased.length} items
          </Text>
        </View>
        <View style={{ height: 500 }}>
          <ScrollView scrollEventThrottle={16}>
            <View style={{ marginBottom: 10 }}>{this.renderView()}</View>
          </ScrollView>
        </View>
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
      if (this.state.purchased.length > 0) {
        return (
          <FlatList
            data={this.state.purchased}
            renderItem={({ item }) => {
              let courseId;
              let price;
              let status;
              this.state.transaction.forEach((obj) => {
                if (item === obj._id) {
                  courseId = obj.courseId;
                  price = obj.price;
                  status = obj.status;
                }
              });
              let title;
              this.state.course.forEach((objek) => {
                if (courseId === objek._id) {
                  title = objek.title;
                }
              });
              return (
                <View
                  style={{
                    width: 340,
                    backgroundColor: "#c5cde8",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "bold",
                      paddingTop: 10,
                      paddingLeft: 10,
                    }}
                  >
                    Purchase ID : {item}
                  </Text>
                  {this.checkStatus(status)}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ padding: 10 }}>
                      <Text style={styles.titleCourse} numberOfLines={3}>
                        {title}
                      </Text>

                      <Text style={{ fontSize: 12, color: "#121d45" }}>
                        Date :12/02/2020
                      </Text>
                    </View>
                    <View style={{ padding: 10 }}>
                      <Text style={styles.price}>IDR {price}</Text>
                    </View>
                  </View>
                </View>
              );
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

  checkStatus(status) {
    if (status) {
      return (
        <Text
          style={{
            color: "#fff",
            fontSize: 12,
            paddingLeft: 10,
          }}
        >
          Status : Accepted
        </Text>
      );
    } else {
      return (
        <Text
          style={{
            color: "#fff",
            fontSize: 12,
            paddingLeft: 10,
          }}
        >
          Status : In The Process
        </Text>
      );
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
    color: "#121d45",
    width: 200,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#121d45",

    fontWeight: "bold",
  },
});
