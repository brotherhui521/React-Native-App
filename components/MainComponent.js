import React, { Component } from "react";
import Menu from "./MenuComponent";
import Favorites from "./FavoritesComponent";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  
  ToastAndroid
} from "react-native";
import { Icon } from "react-native-elements";
import Dishdetail from "./DishdetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import Reservation from "./ReservationComponent";
import Login from "./LoginComponent";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import Toast from 'react-native-tiny-toast';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

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
      <DrawerItemList {...props} />
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

const FavoritesStack = createStackNavigator();
function FavoritesNavigator() {
  return (
    <FavoritesStack.Navigator
      initialRouteName="Favorites"
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
      <FavoritesStack.Screen
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
        name="My Favorites"
        component={Favorites}
      />
      <FavoritesStack.Screen name="Dishdetail" component={Dishdetail} />
    </FavoritesStack.Navigator>
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

const ReserveStack = createStackNavigator();
function ReserveNavigator() {
  return (
    <ReserveStack.Navigator
      initialRouteName="Reservation"
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
      <ReserveStack.Screen
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
        name="Reservation"
        component={Reservation}
      />
    </ReserveStack.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginNavigator() {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
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
      <LoginStack.Screen
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
        name="Login"
        component={Login}
      />
      
    </LoginStack.Navigator>
  );
}

const mainStack = createDrawerNavigator();
function MainStack() {
  return (
    <mainStack.Navigator
      initialRouteName="Home"
      drawerType='slide'
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
      drawerContent={CustomDrawerContentComponent}
    >
      <mainStack.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon name="user" type="font-awesome" size={24} color={tintColor} />
          ),
          drawerLabel: "sign-in",
        }}
      />
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
          drawerLabel: "Menu",
        }}
      />
      <mainStack.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
          drawerLabel: "My Favorites",
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
          drawerLabel: "About Us",
        }}
      />
      <mainStack.Screen
        name="Reservation"
        component={ReserveNavigator}
        options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name="cutlery"
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
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    NetInfo.fetch().then((connectionInfo) => {
      Toast.show('Initial Network Connectivity Type: '
          + connectionInfo.type, {duration:2000})
  });
  
  NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange));
}
  

  componentWillUnmount() {
    NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange))
}

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        Toast.show('You are now offline!', {duration: 2000});
        
        break;
      case 'wifi':
        Toast.show('You are now connected to WiFi!', {duration: 2000});
        console.log('You are now connected to WiFi!');
        break;
      case 'cellular':
        Toast.show('You are now connected to Cellular!', {duration: 2000});
        break;
      case 'unknown':
        Toast.show('You now have unknown connection!',  {duration: 2000});
        break;
      default:
        break;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
