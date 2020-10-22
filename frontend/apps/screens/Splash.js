import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  AsyncStorage,
} from "react-native";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.checkLoading);
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");

    if (data !== null) {
      this.setState({ profile: data });
      this.props.navigation.navigate("Mains");
    } else {
      this.setState({ profile: null });
      this.props.navigation.navigate("Feature");
    }
  };
  checkLoading() {
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.getProfile();
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./moduls/images/logo.png")} />
        <ActivityIndicator color="#4c505c" size={"large"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
