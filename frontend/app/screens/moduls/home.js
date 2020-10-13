import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { SliderBox } from "react-native-image-slider-box";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      result: [],
      images: [
        "https://www.rasmussen.edu/-/media/images/blogs/school-of-technology/computerprogramminghard_banner.jpg",
        "https://dzone.com/storage/temp/12334613-971.jpg",
        "https://miro.medium.com/max/1000/1*unmVsOH7qujPeBwFN5Y2Zw.png",
        "https://miro.medium.com/max/700/1*HLGtY6O2vUHqIyEbWdmBgA.jpeg",
      ],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getDataFromServer);
  }

  getDataFromServer = () => {
    fetch("http://10.10.0.252:8020/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ result: json });
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({ isLoading: false });
  };

  _onRefresh = () => {
    this.setState({ isLoading: true, result: [] }, this.getDataFromServer);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
          <View style={{ height: 200, backgroundColor: "#c5cde8" }}>
            <SliderBox
              images={this.state.images}
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
            />
          </View>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Text style={styles.label}>Top courses</Text>
            <View style={{ height: 144 }}>{this.renderFav()}</View>
          </View>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Text style={styles.label}>All courses </Text>
            <View>{this.renderView()}</View>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "#c5cde8",
                borderWidth: 1,
                borderStyle: "dashed",
                padding: 20,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Free Resource Center
              </Text>
              <Text
                style={{ fontSize: 12, textAlign: "center", paddingTop: 10 }}
              >
                A collection of some of the free courses in our learning
                marketplace to support you through this uncertain time
              </Text>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("FreeCourse")}
              >
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "center",
                    color: "#2D9CDB",
                    paddingTop: 10,
                  }}
                >
                  View Course
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderFav() {
    if (this.state.result.length > 0) {
      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            contentContainerStyle={{ alignSelf: "flex-start" }}
            numColumns={this.state.result.length}
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
            data={this.state.result}
            renderItem={({ item }) => {
              let total = 0;
              item.rating.forEach((obj) => {
                total += obj.rate;
              });
              total /= item.rating.length;
              if (total > 3) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("CourseDetail", {
                        data: item,
                      });
                    }}
                  >
                    <View style={{ height: 144, width: 154, marginLeft: 20 }}>
                      <View
                        style={{
                          height: 82,
                          flex: 1,
                          backgroundColor: "#c5cde8",
                          borderRadius: 20,
                        }}
                      >
                        <Image
                          source={{ uri: item.posterUrl }}
                          style={{
                            width: 154,
                            height: 72,
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      <View
                        style={{ flex: 1, paddingTop: 10, paddingLeft: 10 }}
                      >
                        <Text style={styles.titleCourse} numberOfLines={2}>
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
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
            refreshing={this.state.isLoading}
            contentContainerStyle={{ paddingTop: 5 }}
            onRefresh={this._onRefresh}
          />
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator color="#4c505c" size={"large"} />
          <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
            Tidak ada data dari server
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
        return (
          <FlatList
            numColumns={2}
            data={this.state.result}
            renderItem={({ item }) => {
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
                  <View
                    style={{
                      height: 154,
                      width: 154,
                      marginLeft: 20,
                      marginBottom: 20,
                      borderWidth: 1,
                      borderColor: "#121d45",
                    }}
                  >
                    <View
                      style={{
                        height: 82,
                        flex: 1,
                        backgroundColor: "#c5cde8",
                      }}
                    >
                      <Image
                        source={{ uri: item.posterUrl }}
                        style={{
                          width: 152,
                          height: 82,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingTop: 10,
                        paddingLeft: 10,
                        marginTop: 5,
                      }}
                    >
                      <Text style={styles.titleCourse} numberOfLines={2}>
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
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingLeft: 10,
    color: "#f39c12",
  },

  titleCourse: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#121d45",
  },
  price: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#121d45",
  },
});
