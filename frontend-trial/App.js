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
    file: null,
  };

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // alert("Dokument berhasil dipilih");
    this.setState({ file: result });
    // console.log(this.state.file);
  };

  uploadDocument = async () => {
    const formData = new FormData();
    formData.append("myfile", this.state.file);
    const data = {
      fieldname: "myfile",
      originalname: this.state.file.name,
    };
    console.log(formData.get("myfile"));
    console.log("file");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8020/course/upload/document", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Select Document" onPress={this.pickDocument} />
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={this.uploadDocument}
        >
          <Text style={styles.buttonTextStyle}>Upload File</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20 }}>
          <Button title="Select Image" onPress={this._pickImage} />
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
