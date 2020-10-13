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
import SelectMultiple from "react-native-select-multiple";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataParse: this.props.route.params.data,
      // x: this.props.route.params.data.document,
      category: [],
      title: "",
      description: "",
      price: "",
      file: this.props.route.params.data.document,
      image: this.props.route.params.data.posterUrl,
      fileImage:null,
      filenameImage: "",
    typeImage: "",
    matchImage: [],
      selectCategory: ["Programming", "Java", "Design", "JavaScript", "MySQL"],
    };
  }

  onSelectionsChange = (category) => {
    // selectedFruits is array of { label, value }
    this.setState({ category });
    console.log(this.state.category);
  };

  uploadImage = async () => {
    const data = JSON.stringify({
      filename: this.state.filenameImage,
      type: this.state.typeImage,
      match: this.state.matchImage,
      uri: this.state.fileImage.uri,
      base64: this.state.fileImage.base64,
    });
    const upload = await fetch(
      "http://10.10.0.252:8020/course/upload/document",
      {
        method: "post",
        body: data, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await upload.json();
    // alert(result.filename);
    console.log(result);
    this.setState({image:result.filename})
    // this.updateDataCourse(result.filename)
  };

  updateDataCourse() {
    
    // let id = this.state.dataParse._id;
    // let description;
    // if (this.state.description == "") {
    //   description = this.state.dataParse.description;
    // } else {
    //   description = this.state.description;
    // }
    // let price;
    // if (this.state.price == "") {
    //   price = this.state.dataParse.price;
    // } else {
    //   price = this.state.price;
    // }
    // let cover;
    // if (this.state.image === '') {
    //   cover = this.state.dataParse.posterUrl;
    // } else {
    //   cover = this.state.image;
    // }

    // let data = {
    //   category: this.state.category,
    //   description: description,
    //   document: this.state.file,
    //   posterUrl: cover,
    //   price: price,
    //   rating: this.state.dataParse.rating,
    //   title: this.state.dataParse.title,
    // };
    // console.log(data);
    // const json = JSON.stringify(data);
    // // console.log(id);
    // // console.log(json);
    // fetch(`http://10.10.0.252:8020/course/update/${id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: json,
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log(res);
    //     alert(res);
    //     this.props.navigation.navigate("ManageCourse");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("There was an error updating your account.");
    //   })
    //   .done();
  }

  render() {
    let { image } = this.state;
    // console.log("check");
    console.log(this.state.file);
    return (
      <View style={styles.container}>
        <HeaderBack title="Update Course" nav={this.props.navigation} />
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
              editable={false}
              defaultValue={this.state.dataParse.title}
              onChangeText={(title) => this.setState({ title })}
            />

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#121d45",
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
                height: 50,
                paddingLeft: 10,
                marginTop: 5,
                height: 100,
                padding: 5,
              }}
              multiline={true}
              defaultValue={this.state.dataParse.description}
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
              defaultValue={this.state.dataParse.price.toString()}
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
                List of documents : {this.state.file.length} files
              </Text>
              {this.listDoc()}
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
                  source={{ uri: image }}
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
                Add Cover
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
              onPress={this.updateDataCourse.bind(this)}
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
                UPDATE
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
      filenameImage: filename,
      typeImage: type,
      matchImage: match,
      fileImage: result,
      // image:result.uri
    });
  };

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // alert(result.uri);
    console.log(result);
    let dataStorage = [
      { documentTitle: result.name, documentUrl: result.uri },
      ...this.state.file,
    ];
    console.log(dataStorage);
    this.setState({ file: dataStorage });

    let data = new FormData();
    data.append("myfile", result);
    console.log(data);
    let res = await fetch("http://10.10.1.79:8020/course/upload/document", {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    let responseJson = await res.json();
    if (responseJson.status == 1) {
      alert("Upload Successful");
    }
  };

  listDoc() {
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
        // refreshing={this.state.isLoading}
        contentContainerStyle={{ paddingTop: 5 }}
        onRefresh={this._onRefresh}
        // onEndReached={this._onLoadMore}
        // onEndThreshold={300}
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
