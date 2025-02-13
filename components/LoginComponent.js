import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { Button, Icon, Input, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {baseUrl} from "../shared/baseUrl";
import { color } from "react-native-reanimated";

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }
  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    else
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />

        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                color="white"
              />
            }
            buttonStyle={{
              backgroundColor: "#512DA8",
            }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            clear
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                size={24}
                color="blue"
              />
            }
            titleStyle={{
              color: "blue",
            }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: baseUrl+ "images/logo.png",
    };
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const camerarollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      camerarollPermission.status === "granted"
    ) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        console.log(result);
        this.processImage(result.uri );
      }
    }
  };

  getImageFromGallery=async()=>{
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const camerarollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if(cameraPermission.status==="granted"&&camerarollPermission.status==="granted"){
      let result=await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if(!result.cancelled){
        this.processImage(result.uri);
      }
    }
  }

  processImage=async(imageUrl)=>{
    let processedImage=await ImageManipulator.manipulateAsync(
      imageUrl,
      [{resize:{width: 400}}],
      {format: 'png'}
    );
    console.log(processedImage);
    this.setState({imageUrl: processedImage.uri})
  }

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri:this.state.imageUrl}}
              loadingIndicatorSource={require('./images/logo.png')}
              style={styles.image}
            />
            <View style={{flex:1, flexDirection:'row' ,alignContent:'center', marginRight:2}}><Button title="Camera" onPress={this.getImageFromCamera} /></View>
            <View style={{flex:1, flexDirection:'row'}}><Button title="Gallery" onPress={this.getImageFromGallery}/></View>
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  size={24}
                  color="white"
                />
              }
              buttonStyle={{
                backgroundColor: "#512DA8",
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const tab = createBottomTabNavigator();

function Login() {
  return (
    <tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: "#9575CD",
        inactiveBackgroundColor: "#D1C4E9",
        activeTintColor: "#ffffff",
        inactiveTintColor: "gray",
      }}
    >
      <tab.Screen
        name="Sign-in"
        component={LoginTab}
        options={{
          tabBarLabel: "Sign-in",
          tabBarIcon: () => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={24}
              color="#ffffff"
            ></Icon>
          )
        }}
      ></tab.Screen>
      <tab.Screen
        name="Register"
        component={RegisterTab}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: () => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={24}
              color="#ffffff"
            ></Icon>
          ),
        }}
      ></tab.Screen>
    </tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  imageContainer: {
    flex: 3,
    flexDirection: "row",
    margin: 10,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
    flex:1
  },
  formInput: {
    margin: 10,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 40,
  },
});
export default Login;
