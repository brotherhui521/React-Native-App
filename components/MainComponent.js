import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import { View } from "react-native";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

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
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen name="Dishdetail" component={Dishdetail} />
    </MenuStack.Navigator>
  );
}

const HomeStack = createStackNavigator();
function HomeNavigator(){
  return(
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
      }}>
        <HomeStack.Screen name="Home" component={Home}/>
    </HomeStack.Navigator>
  )
}

const ContactStack = createStackNavigator();
function ContactNavigator(){
  return(
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
      }}>
        <ContactStack.Screen name="Contact" component={Contact}/>
    </ContactStack.Navigator>
  )
}

const AboutStack = createStackNavigator();
function AboutNavigator(){
  return(
    <AboutStack.Navigator
    
      screenOptions={{
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
      }}>
        <AboutStack.Screen name="About" component={About}/>
    </AboutStack.Navigator>
  )
}


const mainStack=createDrawerNavigator()
function MainStack(){
  return(
    <mainStack.Navigator
    initialRouteName="Home"
    >
        <mainStack.Screen name="Home" component={HomeNavigator}/>
        <mainStack.Screen name="Menu" component={MenuNavigator}/>
        <mainStack.Screen name="Contact" component={ContactNavigator}/>
        <mainStack.Screen name="About" component={AboutNavigator}/>
    </mainStack.Navigator>
  )
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
    return (
    
      <MainStack />
      
    );
  }
}

export default Main;
