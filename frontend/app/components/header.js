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
    this.getProfile();
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
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity
          style={{ paddingTop: 5, paddingRight: 10 }}
          onPress={() => {
            this.state.isCheck
              ? this.props.nav.navigate("CartCourse")
              : alert("Sorry, you are not logged in !");
          }}
          //   disabled={this.state.isCheck}
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
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
