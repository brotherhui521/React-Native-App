import React, { Component } from "react";
import Menu from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import { View } from "react-native";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from './HomeComponent';

const Stack = createStackNavigator();
function MenuNavigator() {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Dishdetail" component={Dishdetail} />
    </Stack.Navigator>
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


const mainStack=createDrawerNavigator()
function MainStack(){
  return(
    <mainStack.Navigator
    initialRouteName="Home"
    >
        <mainStack.Screen name="Home" component={HomeNavigator}/>
        <mainStack.Screen name="Menu" component={MenuNavigator}/>
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
