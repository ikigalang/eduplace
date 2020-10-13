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
import { HeaderSearch } from "@components";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderBack } from "@components";
import RadioForm from "react-native-simple-radio-button";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      result: [],
      thisCourse: [],
      isStatus: false,

      disablearrived: false,
      colorarrived: "#E5C454",
    };
  }

  componentDidMount() {
    fetch("http://10.10.0.252:8020/transaction/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ result: json });
      })
      .catch((error) => {
        console.error(error);
      });
    this.getCourse();
  }

  getCourse() {
    fetch("http://10.10.0.252:8020/course/")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ thisCourse: json, isLoading: false });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    // console.log(this.state.result);
    // console.log(this.state.thisCourse);
    return (
      <View>
        <HeaderBack title="Manage Transactions" nav={this.props.navigation} />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#121d45" }}>
            Total Transactions : {this.state.result.length} items
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

  updateTransaksi(item) {
    let courseId;
    let accountId;
    let price;
    this.state.result.forEach((obj) => {
      if (obj._id == item) {
        console.log(obj._id);
        courseId = obj.courseId;
        accountId = obj.accountId;
        price = obj.price;
      }
    });
    let data = {
      courseId: courseId,
      accountId: accountId,
      price: price,
      status: true,
    };

    const json = JSON.stringify(data);

    fetch(`http://10.10.0.252:8020/transaction/update/${item}`, {
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
        this.setState({ disablearrived: item });
        this.setState({ colorarrived: item });
      })

      .catch((error) => {
        console.log(error);
        alert("There was an error updating your transaksi.");
      })
      .done();
    // this.setState({ disablearrived: item });
    // this.setState({ colorarrived: item });
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
      // console.log(this.state.result);
      if (this.state.result.length > 0) {
        return (
          <FlatList
            data={this.state.result}
            renderItem={({ item }) => {
              let title = 0;

              this.state.thisCourse.forEach((obj) => {
                if (item.courseId === obj._id) {
                  title = obj.title;
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
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
                      Purchase ID : {item._id}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ padding: 10 }}>
                      <Text style={{ fontSize: 12, color: "#121d45" }}>
                        Date :12/02/2020
                      </Text>
                      <Text style={styles.titleCourse} numberOfLines={2}>
                        {title}
                      </Text>
                      <Text style={styles.price}>IDR {item.price}</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: "bold",
                          marginBottom: 5,
                        }}
                      >
                        Status :
                      </Text>

                      {this.checkStatus(item._id, item.status)}
                    </View>
                  </View>
                </View>
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
            <Icons name={"alert-octagram"} color={"#e84f41"} size={32} />
            <Text style={{ marginTop: 10, fontSize: 14, color: "#7f8c8d" }}>
              Tidak ada data dari server
            </Text>
          </View>
        );
      }
    }
  }

  checkStatus(id, status) {
    if (!status) {
      return (
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            backgroundColor: "#121d45",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
          onPress={() => {
            this.updateTransaksi(id);
          }}
          disabled={id === this.state.disablearrived ? true : false}
        >
          <Icons
            name={"check-bold"}
            color={id === this.state.colorarrived ? "grey" : "#27AE60"}
            size={32}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            backgroundColor: "#121d45",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
          }}
          disabled={true}
        >
          <Icons name={"check-bold"} color={"grey"} size={32} />
        </TouchableOpacity>
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
  },
});
