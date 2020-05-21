import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props}/>
    </SafeAreaView>
  </ScrollView>
);

const MenuStack = createStackNavigator();
function MenuNavigator() {
  return (
    <MenuStack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <MenuStack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
        name="Menu"
        component={Menu}
      />
      <MenuStack.Screen name="Dishdetail" component={Dishdetail} />
    </MenuStack.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <HomeStack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
        name="Home"
        component={Home}
      />
    </HomeStack.Navigator>
  );
}

const ContactStack = createStackNavigator();
function ContactNavigator() {
  return (
    <ContactStack.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <ContactStack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
        name="Contact"
        component={Contact}
      />
    </ContactStack.Navigator>
  );
}

const AboutStack = createStackNavigator();
function AboutNavigator() {
  return (
    <AboutStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <AboutStack.Screen
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
        name="About"
        component={About}
      />
    </AboutStack.Navigator>
  );
}

const mainStack = createDrawerNavigator();
function MainStack() {
  return (
    <mainStack.Navigator
      initialRouteName="Home"
      drawerStyle="slide"
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
      drawerContent={CustomDrawerContentComponent}
    >
      <mainStack.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <mainStack.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <mainStack.Screen
        name="Contact"
        component={ContactNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
      <mainStack.Screen
        name="About"
        component={AboutNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </mainStack.Navigator>
  );
}
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  render() {
    return <MainStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default Main;
