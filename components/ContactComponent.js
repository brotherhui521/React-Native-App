import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import * as Animatable from "react-native-animatable";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact Information">
          <Text style={{ margin: 5 }}>
            121, Clear Water Bay Road Clear Water Bay
          </Text>
          <Text style={{ margin: 5 }}>Kowloon HONG KONG</Text>
          <Text style={{ margin: 5 }}>Tel: +852 1234 5678</Text>
          <Text style={{ margin: 5 }}>Fax: +852 8765 4321</Text>
          <Text style={{ margin: 5 }}>Email:confusion@food.net</Text>
        </Card>
      </Animatable.View>
    );
  }
}

export default Contact;
