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

class FlatListWithSearch extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      search: "",
    };
  }

  componentDidMount() {
    fetch("http://10.10.0.252:8020/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
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
          this.props.navigation.navigate("CourseDetail", {
            data: item,
          });
        }}
      >
        <View key={item._id} style={styles.item}>
          <Image
            source={{ uri: item.posterUrl }}
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
    //console.log(this.state.data)
    const { search } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop: Constants.statusBarHeight }}>
          <SearchBar
            placeholder="Search Here"
            lightTheme
            // containerStyle={{backgroundColor: '#fff'}}
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
}
export default FlatListWithSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
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
