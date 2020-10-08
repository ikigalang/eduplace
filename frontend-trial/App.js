import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  AsyncStorage,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default class App extends React.Component {
  state = {
    image: null,
    file: null,
    data: null,
  };
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // alert(result.uri);
    alert("Dokument berhasil dipilih");
    this.setState({ file: result });

    // let dataStorage = [
    //   { documentTitle: result.name, documentUrl: result.uri },
    //   ...this.state.file,
    // ];
    // console.log(dataStorage);
    // this.setState({ file: dataStorage });
  };
  uploadDocument = async () => {
    let formData = new FormData();
    let uri = this.state.file.uri;
    let name = this.state.file.name;
    let size = this.state.file.size;
    formData.append("myFile", this.state.file);

    fetch("http://10.10.1.79:8020/course/upload/document", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response");
        console.log(res);
      })
      .catch((e) => console.log(e))
      .done();

    //Check if any file is selected or not

    //If file selected then create FormData
    // let fileToUpload = this.state.file;
    // let data = new FormData();
    // data.append('name', 'Image Upload');
    // data.append("myfile", fileToUpload);
    // console.log(data);
    //Please change file upload URL
    // let res = await fetch("http://10.10.1.79:8020/course/upload/document", {
    //   method: "post",
    //   body: data,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // console.log(res);
    // let responseJson = await res.json();
    // if (responseJson.status == 1) {
    //   alert("Upload Successful");
    // }

    // fetch(`http://10.10.1.79:8020/course/upload/document`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: data,
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log(res);
    //     alert(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert(error);
    //   })
    //   .done();
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    alert(result.uri);
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <Button title="Select Document" onPress={this._pickDocument} />
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
        {/* <Text> {this.state.file.uri} </Text> */}
        {/* <FlatList
          data={this.state.file}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.documentTitle}</Text>
              </View>
            );
          }}
          // refreshing={this.state.isLoading}
          contentContainerStyle={{ paddingTop: 5 }}
          onRefresh={this._onRefresh}
          // onEndReached={this._onLoadMore}
          // onEndThreshold={300}
        /> */}
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
