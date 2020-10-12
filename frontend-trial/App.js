import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

export default class App extends React.Component {
  state = {
    filename: "",
    type: "",
    match: [],
    file: null,
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    this.setState({
      filename: filename,
      type: type,
      match: match,
      file: result,
    });
  };

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    let document = "";
    let fileReader = new FileReader();
    fileReader.readAsDataURL(result.uri);
    fileReader.onload = function () {
      document = fileReader.result;
    };
    fileReader.onerror = function (error) {
      console.log("Error: ", error);
    };

    console.log(document);
  };

  uploadImage = async () => {
    const data = JSON.stringify({
      filename: this.state.filename,
      type: this.state.type,
      match: this.state.match,
      uri: this.state.file.uri,
      base64: this.state.file.base64,
    });
    const upload = await fetch(
      "http://10.10.0.67:8020/course/upload/document",
      {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await upload.json();
    alert(result);
    console.log(result);
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Select Document" onPress={this.pickDocument} />
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={this.uploadImage}
        >
          <Text style={styles.buttonTextStyle}>Upload File</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Button title="Select Image" onPress={this.pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
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
    marginTop: 100,
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
});
