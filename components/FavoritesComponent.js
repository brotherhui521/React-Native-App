import React, { Component } from "react";
import { Text, View, FlatList, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { deleteFavorite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

class Favorites extends Component {
  render() {
    const renderItem = ({ item, index }) => {
      const rightButton = [
        {
          text: "Delete",
          type: "delete",
          onPress: () => {
            Alert.alert(
              "Delete confirmation",
              "Are you sure you want to delete " + item.name + "?",
              [
                {
                  text: "cancel",
                  style:'cancel',
                  onPress: () => console.log("not deleted"),
                },
                {
                  text: "Ok",
                  onPress: () => this.props.deleteFavorite(item.id),
                },
              ]
            );
          },
        },
      ];
      return (
        <Swipeout right={rightButton} autoClose={true}>
          <Animatable.View animation="fadeInRight" duration={2000}>
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.description}
              hideChevron={true}
              onPress={() => navigate("Dishdetail", { dishId: item.id })}
              leftAvatar={{ source: { uri: baseUrl + item.image } }}
            />
          </Animatable.View>
        </Swipeout>
      );
    };

    const { navigate } = this.props.navigation;
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes.filter((dish) =>
            this.props.favorites.some((el) => el === dish.id)
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
