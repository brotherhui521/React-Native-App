import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  EventSubscriptionVendor,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

import { postFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

function RenderComments(props) {
  const comments = props.comments;

  const RenderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.ratings} starts</Text>
        <Text style={{ fontSize: 12 }}>
          {"--" + item.author + ",  --" + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={RenderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </Card>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={styles.formRow}>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name={"pencil"}
            type="font-awesome"
            color="#512D8A"
            onPress={() => props.toggleModal()}
          />
        </View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={props.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.formRow}>
            <Rating
              type="star"
              imageSize={50}
              startingValue={5}
              showRating={true}
              onFinishRating={(rating) => props.updateState("rating", rating)}
            />
          </View>
          <View style={styles.formRow}>
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user" }}
             
              onChangeText={(value) => props.updateState("author",value)}
            />
          </View>
          <View style={styles.formRow}>
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onChangeText={(value) => props.updateState("comment",value)}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              color="#512DA8"
              title="Continue"
              onPress={() => {
                props.handleForm();
              }}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              color="#512DA8"
              title="Cancel"
              onPress={() => {
                props.toggleModal();
                props.resetForm();
              }}
            />
          </View>
        </Modal>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: "5",
      author: "",
      comment: "",
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  changeValue(stateName, valueFromForm) {
    if (stateName == "rating") {
      this.setState({
        rating: valueFromForm,
      });
    } else if (stateName == "author") {
      this.setState({
        author: valueFromForm,
      });
    } else if (stateName == "comment") {
      this.setState({
        comment: valueFromForm,
      });
    }
  }
  handleForm() {
    console.log(JSON.stringify(this.state));
    
    this.resetForm();
    this.toggleModal();
  }
  resetForm() {
    this.setState({
      showModal: false,
      rating: "5",
      author: "",
      comment: "",
    });
  }
  render() {
    const dishId = this.props.route.params.dishId;
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[dishId]}
          favorite={this.props.favorites.some((item) => item === dishId)}
          onPress={() => this.markFavorite(dishId)}
          showModal={this.state.showModal}
          toggleModal={() => this.toggleModal()}
          resetForm={() => this.resetForm()}
          updateState={this.changeValue.bind(this)}
          handleForm={() => {
            this.handleForm();
          }}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    right: 0,
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
