import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { HeaderBack } from "@components";
import { AirbnbRating } from "react-native-ratings";
import { HOST_URL } from "@env";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      result: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getDataFromServer);
  }

  getDataFromServer = () => {
    fetch(HOST_URL + "/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ result: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _onRefresh = () => {
    this.setState({ isLoading: true, result: [] }, this.getDataFromServer);
  };

  render() {
    return (
      <View>
        <HeaderBack title="Free Course" nav={this.props.navigation} />
        <ScrollView>
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
      if (this.state.result.length > 0) {
        return (
          <FlatList
            data={this.state.result}
            renderItem={({ item }) => {
              if (item.price === 0) {
                let total = 0;
                item.rating.forEach((obj) => {
                  total += obj.rate;
                });
                total /= item.rating.length;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("CourseDetail", {
                        data: item,
                      });
                    }}
                  >
                    <View style={{ width: 322, marginLeft: 20, marginTop: 20 }}>
                      <View style={styles.cover}>
                        <Image
                          source={{
                            uri: HOST_URL + "/course/image/" + item.posterUrl,
                          }}
                          style={{ width: 322, height: 128, borderRadius: 20 }}
                        />
                      </View>
                      <View
                        style={{ flex: 1, paddingTop: 10, paddingLeft: 10 }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingRight: 10,
                          }}
                        >
                          <View>
                            <Text style={styles.titleCourse} numberOfLines={3}>
                              {item.title}
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
                          <View
                            style={{
                              backgroundColor: "#e84f41",
                              width: 50,
                              height: 25,
                              borderRadius: 20,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#fff",
                                textAlign: "center",
                              }}
                            >
                              Free
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
            keyExtractor={(item) => item._id}
            refreshing={this.state.isLoading}
            contentContainerStyle={{ paddingTop: 5 }}
            onRefresh={this._onRefresh}
          />
        );
      } else {
        return (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <Icons name={"alert-octagram"} color={"#e84f41"} size={32} />
            <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
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
