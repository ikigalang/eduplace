import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { SearchBar } from "react-native-elements";
import { AirbnbRating } from "react-native-ratings";
import { HOST_URL } from "@env";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

class FlatListWithSearch extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: [],
      search: "",
    };
  }

  componentDidMount() {
    fetch(HOST_URL + "/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchAction = (text) => {
    const newData = this.state.data.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      search: text,
    });
  };

  renderItem = (item) => {
    let total = 0;
    item.rating.forEach((obj) => {
      total += obj.rate;
    });
    total /= item.rating.length;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("DetailCourse", {
            data: item,
          });
        }}
      >
        <View key={item._id} style={styles.item}>
          <Image
            source={{ uri: HOST_URL + "/course/image/" + item.posterUrl }}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <View style={{ marginLeft: 20 }}>
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
            <View>{this.renderView(item.price)}</View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderView(price) {
    if (price > 0) {
      return <Text style={styles.price}>IDR {price}</Text>;
    } else {
      return (
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
        </View>
      );
    }
  }

  render() {
    const { search } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: Constants.statusBarHeight }}>
          <SearchBar
            placeholder="Search Here"
            lightTheme
            onChangeText={(text) => this.searchAction(text)}
            // onClear={({ item }) => this.renderItem(item)}
            autoCorrect={false}
            value={search}
          />
        </View>
        <View style={{ paddingRight: 10, paddingLeft: 10 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      </SafeAreaView>
    );
  }

  renderData() {
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
      if (this.state.data.length > 0) {
        return (
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={this.renderHeader}
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
export default FlatListWithSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(225, 231, 239)",
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#f39c12",
    marginTop: 10,
    flexDirection: "row",
  },
  titleCourse: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#121d45",
  },
  price: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#121d45",
  },
});
