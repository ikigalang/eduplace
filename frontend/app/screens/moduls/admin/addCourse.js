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
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import SelectMultiple from "react-native-select-multiple";
import * as DocumentPicker from "expo-document-picker";

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
      selectCategory: ["Programming", "Java", "Design", "JavaScript", "MySQL"],
    };
  }
  onSelectionsChange = (category) => {
    // selectedFruits is array of { label, value }
    this.setState({ category });
    //console.log(this.state.category);
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
    fetch(`http://10.10.0.252:8020/course/add`, {
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
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [7, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
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
