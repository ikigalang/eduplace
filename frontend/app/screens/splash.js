import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      profile: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true }, this.checkLoading);
  }
  getProfile = async () => {
    let data = await AsyncStorage.getItem("user_session");

    if (data !== null) {
      this.setState({ profile: data });
      let resultParsed = JSON.parse(data);
      if (resultParsed.isAdmin) {
        this.props.navigation.navigate("MainAdmin");
        console.log("admin");
        console.log(resultParsed);
      } else {
        this.props.navigation.navigate("MainUser");
        console.log("user");
        console.log(resultParsed);
      }
      // this.props.navigation.navigate("MainAdmin");
    } else {
      this.setState({ profile: null });
      this.props.navigation.navigate("Mains");
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
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fff" }}>
          EduPlace
        </Text>
        <ActivityIndicator color="#4c505c" size={"large"} />
      </View>
    );
  }

  tampilanLoading() {
    if (this.state.isLoading) {
      <ActivityIndicator color="#4c505c" size={"large"} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121d45",
    alignItems: "center",
    justifyContent: "center",
  },
});
