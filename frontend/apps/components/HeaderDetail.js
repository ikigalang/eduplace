import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.getProfile);
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");
    if (data !== null) {
      this.setState({ isCheck: true });
    } else {
      this.setState({ isCheck: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ paddingTop: 5 }}
            onPress={() => {
              this.props.nav.goBack();
            }}
          >
            <Icons name={"arrow-left"} size={24} color={"#fff"} />
          </TouchableOpacity>

          <Text style={styles.title} numberOfLines={1}>
            {this.props.title}
          </Text>
        </View>
        <TouchableOpacity
          style={{ paddingTop: 5 }}
          onPress={() => {
            this.state.isCheck
              ? this.props.nav.navigate("Cart")
              : alert("Sorry, you are not logged in !");
          }}
        >
          <Icons name={"cart"} size={24} color={"#fff"} />
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
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingTop: 5,
    width: 250,
  },
});
