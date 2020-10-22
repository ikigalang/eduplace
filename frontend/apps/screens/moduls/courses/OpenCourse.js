import React, { Component } from "react";
import { View, Dimensions } from "react-native";

import PDFReader from "rn-pdf-reader-js";
import { HOST_URL } from "@env";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParse: this.props.route.params.data,
    };
  }

  render() {
    let data = HOST_URL + `/course/document/${this.state.dataParse}`;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#c5cde8",
        }}
      >
        <PDFReader
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
          source={{ uri: data }}
        />
      </View>
    );
  }
}
