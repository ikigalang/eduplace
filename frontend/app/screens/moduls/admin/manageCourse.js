import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { AirbnbRating } from "react-native-ratings";
import { HeaderBack } from "@components";
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
    fetch("http://10.10.0.252:8020/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ result: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
    // this.setState({ isLoading: true }, this.getProfile);
  }
  _onRefresh = () => {
    this.setState({ isLoading: true, result: [] }, this.componentDidMount);
  };
  render() {
    return (
      <View>
        <HeaderBack title="Course Owned" nav={this.props.navigation} />
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#121d45" }}>
            Total Course : {this.state.result.length} items
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("AddCourse", {
                data: this.state.result,
              })
            }
          >
            <Icons name={"plus-box"} color={"#f39c12"} size={36} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ marginBottom: 150 }}>{this.renderView()}</View>
        </ScrollView>
      </View>
    );
  }

  renderView() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: 20,
          }}
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
              let total = 0;
              item.rating.forEach((obj) => {
                total += obj.rate;
              });
              total /= item.rating.length;
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("UpdateCourse", {
                      data: item,
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#c5cde8",
                      marginBottom: 10,
                      marginLeft: 10,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,

                        textAlign: "right",
                      }}
                    >
                      12/02/2020
                    </Text>
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
                    {this.renderPrice(item.price)}
                  </View>
                </TouchableOpacity>
              );
            }}
            refreshing={this.state.isLoading}
            contentContainerStyle={{ paddingTop: 5 }}
            onRefresh={this._onRefresh}
          />
        );
      } else {
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              padding: 20,
            }}
          >
            <ActivityIndicator color="#4c505c" size={"large"} />
            <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
              Tidak ada data dari server
            </Text>
          </View>
        );
      }
    }
  }

  renderPrice(price) {
    if (price > 0) {
      <Text style={styles.price}>IDR {price}</Text>;
    } else {
      <View
        style={{
          backgroundColor: "#e84f41",
          width: 50,
          height: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Free
        </Text>
      </View>;
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
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#121d45",
  },
});
