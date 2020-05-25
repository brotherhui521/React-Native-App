import React, { Component } from 'react';
import { Text, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import{Loading} from './LoadingComponent';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites
  };
};

class Favorites extends Component {
    
    render() { 
        const renderItem = ({ item, index }) => {
            return (
              <ListItem
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true}
                onPress={() => navigate("Dishdetail", { dishId: item.id })}
                leftAvatar={{ source: { uri: baseUrl + item.image } }}
              />
            );
          };
      
        const { navigate } = this.props.navigation;
        if(this.props.dishes.isLoading){
            return(<Loading/>);
        }
        else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }
        else {
            return ( 
                <FlatList
                data={this.props.dishes.dishes.filter(dish=>this.props.favorites.some(el=>el===dish.id))}
                renderItem={renderItem}
                keyExtractor={item=>item.id.toString()}>
                </FlatList>
             );
        }
    }
}
 
export default connect(mapStateToProps)(Favorites);