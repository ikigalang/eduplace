import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
  FlatList,
} from "react-native";
import { HeaderBack } from "@components";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { HOST_URL } from "@env";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      title: "",
      description: "",
      price: "",
      file: [],
      image: null,
      selectCategory: [
        "Programming",
        "Design",
        "Business",
        "Science",
        "Social",
      ],
      imgFilename: "",
      imgMatch: [],
      imgFile: null,
      docFilename: "",
      docMatch: [],
      docFile: null,
      docName: "",
      document: [],
    };
  }
  onSelectionsChange = (category) => {
    this.setState({ category });
  };
  addDataCourse() {
    let data = {
      category: this.state.category,
      description: this.state.description,
      document: this.state.file,
      posterUrl: this.state.image,
      price: this.state.price,
      rating: [],
      title: this.state.title,
    };
    console.log(data);
    const json = JSON.stringify(data);
    fetch(HOST_URL + `/course/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        alert(res);
        this.props.navigation.navigate("ManageCourse");
      })
      .catch((error) => {
        console.log(error);
        alert("Sorry, there was an error.");
      })
      .done();
  }

  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <HeaderBack title="Add Course" nav={this.props.navigation} />
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
              }}
            >
              Category{" "}
            </Text>
            <SelectMultiple
              items={this.state.selectCategory}
              selectedItems={this.state.category}
              onSelectionsChange={this.onSelectionsChange}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
                marginTop: 10,
              }}
            >
              Title{" "}
            </Text>
            <TextInput
              placeholder="title"
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#f39c12",
                height: 35,
                paddingLeft: 10,
                marginTop: 5,
              }}
              onChangeText={(title) => this.setState({ title })}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
                marginTop: 10,
              }}
            >
              Description{" "}
            </Text>
            <TextInput
              placeholder="description"
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#f39c12",
                height: 35,
                paddingLeft: 10,
                marginTop: 5,
                height: 100,
                padding: 5,
              }}
              multiline={true}
              onChangeText={(description) => this.setState({ description })}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
                marginTop: 10,
              }}
            >
              Price{" "}
            </Text>
            <TextInput
              placeholder="0000"
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "#f39c12",
                height: 35,
                paddingLeft: 10,
                marginTop: 5,
              }}
              onChangeText={(price) => this.setState({ price })}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
                marginTop: 10,
              }}
            >
              Upload File{" "}
            </Text>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#121d45",
                }}
              >
                List of documents added : {this.state.file.length} files
              </Text>
              {this.listAddDoc()}
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: "#f39c12",
                height: 35,
                paddingLeft: 10,
                marginTop: 5,
              }}
              onPress={this._pickDocument}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  marginTop: 5,
                }}
              >
                Choose File
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
                width: 100,
                marginTop: 10,
              }}
            >
              Upload Cover{" "}
            </Text>
            <View>
              {image && (
                <Image
                  source={{ uri: HOST_URL + "/course/image/" + image }}
                  style={{ width: 320, height: 128, borderRadius: 20 }}
                />
              )}
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 20,
                backgroundColor: "#f39c12",
                height: 35,
                paddingLeft: 10,
                marginTop: 5,
              }}
              onPress={this._pickImage}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                  marginTop: 5,
                }}
              >
                Choose Image
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingLeft: 185, marginBottom: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#27AE60",
                height: 40,
                width: 150,
                borderRadius: 30,
              }}
              onPress={this.addDataCourse.bind(this)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#fff",
                  paddingTop: 5,
                }}
              >
                PUBLISH
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({});

    let file = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);

    this.setState({
      imgFilename: filename,
      imgMatch: match,
      imgFile: await file,
    });
    console.log("filename: " + filename + "\nmatch" + match);
    this.uploadImage();
  };

  uploadImage = async () => {
    const data = JSON.stringify({
      filename: this.state.imgFilename,
      match: this.state.imgMatch,
      base64: this.state.imgFile,
    });
    const upload = await fetch(HOST_URL + "/course/upload/image", {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await upload.json();
    console.log(result);
    this.setState({ image: result.filename });
  };

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    let file = await FileSystem.readAsStringAsync(result.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);

    this.setState({
      docName: result.name,
      docFilename: filename,
      docMatch: match,
      docFile: await file,
    });

    console.log("filename: " + filename + "\nmatch" + match);

    this.uploadDocument();
  };

  uploadDocument = async () => {
    const data = JSON.stringify({
      filename: this.state.docFilename,
      match: this.state.docMatch,
      base64: this.state.docFile,
    });
    const upload = await fetch(HOST_URL + "/course/upload/document", {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await upload.json();

    console.log(result);

    let dataStorage = [
      { documentTitle: this.state.docName, documentUrl: result.filename },
      ...this.state.file,
    ];

    this.setState({ file: dataStorage });
  };

  listAddDoc() {
    return (
      <FlatList
        data={this.state.file}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                marginBottom: 5,
                marginRight: 10,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#121d45",
                  marginRight: 5,
                }}
              >
                {index + 1}.
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#121d45",
                }}
              >
                {item.documentTitle}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 5 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
