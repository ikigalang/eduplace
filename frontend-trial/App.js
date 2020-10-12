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
        <Button title="Select Document" />
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

// import React, { useState, useEffect } from "react";
// import { Button, Image, View, Platform } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";

// export default function ImagePickerExample() {
//   const [image, setImage] = useState(null);
//   const [base64, setBase64] = useState(null);

//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const {
//           status,
//         } = await ImagePicker.requestCameraRollPermissionsAsync();
//         if (status !== "granted") {
//           alert("Sorry, we need camera roll permissions to make this work!");
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       base64: true,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     setBase64({ base64: result.base64 });
//     console.log(base64);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const uploadDocument = async () => {
//     axios
//       .get("http://10.10.0.67:8020/course/", JSON.stringify(base64))
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && (
//         <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//       )}
//       <Button title="Upload" onPress={uploadDocument} />
//     </View>
//   );
// }
