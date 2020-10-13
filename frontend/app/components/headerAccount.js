import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default class Toolbar extends React.Component {
  // async removeItemValue() {
  //   try {
  //     await AsyncStorage.removeItem("user_session");
  //     this.props.navigation.navigate("Mains");
  //   } catch (exception) {
  //     console.log(exception);
  //     alert("Gagal Menghapus Data");
  //   }
  // }

  _handleLogOut = () => {
    AsyncStorage.removeItem("user_session");
    //alert("You have been logged out.");
    this.props.nav.navigate("Mains");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity onPress={this._handleLogOut}>
          <Text style={{ fontSize: 20, paddingRight: 10, color: "#fff" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#121d45",
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
