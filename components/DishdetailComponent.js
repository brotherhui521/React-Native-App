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
  Alert,
  PanResponder,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderComments(props) {
  const comments = props.comments;

  const RenderCommentItem = ({ item, index }) => {
    return (
      <View
        style={{ alignItems: "flex-start" }}
        key={index}
        style={{ margin: 10 }}
      >
        <Text>{item.comment}</Text>
        <Rating
          style={{ alignItems: "flex-start" }}
          readonly
          imageSize={20}
          startingValue={item.rating}
        />
        <Text style={{ fontSize: 12 }}>
          {"--" + item.author + " ," + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={RenderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  //panResonders
  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) {
      return true;
    } else {
      return false;
    }
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("gesture end" + gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Adding favorite",
          "Are you sure you want to add " + dish.name + " to favorites?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Not add to favorite"),
              type: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress();
              },
            },
          ],
          { cancelable: false }
        );
        return true;
      }
    },
  });
  const dish = props.dish;

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers}>
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
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress()
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
              <View style={{ marginTop: 30 }}>
                <Rating
                  type="star"
                  imageSize={50}
                  startingValue={5}
                  showRating={true}
                  onFinishRating={(rating) =>
                    props.updateState("rating", rating)
                  }
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <Input
                placeholder="Author"
                leftIcon={{ type: "font-awesome", name: "user" }}
                onChangeText={(value) => props.updateState("author", value)}
              />
            </View>
            <View style={styles.formRow}>
              <Input
                placeholder="Comment"
                leftIcon={{ type: "font-awesome", name: "comment" }}
                onChangeText={(value) => props.updateState("comment", value)}
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
      </Animatable.View>
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
    this.props.postComment(
      this.props.route.params.dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
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
