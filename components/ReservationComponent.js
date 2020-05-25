import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import {
  View,
  Text,
  ScrollView,
  Button,
  Picker,
  Switch,
  StyleSheet,
  Modal,
} from "react-native";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    };
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    });
  }
  handleReservation() {
    console.log(JSON.stringify(this.state));

    this.toggleModal();
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ guests: itemValue })
            }
          >
            <Picker.Item label="1" value="1"></Picker.Item>
            <Picker.Item label="2" value="2"></Picker.Item>
            <Picker.Item label="3" value="3"></Picker.Item>
            <Picker.Item label="4" value="4"></Picker.Item>
            <Picker.Item label="5" value="5"></Picker.Item>
            <Picker.Item label="6" value="6"></Picker.Item>
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-smoking?</Text>
          <Switch
            style={styles.formItem}
            style={{ alignSelf: "flex-end" }}
            value={this.state.smoking}
            onValueChange={(value) => this.setState({ smoking: value })}
            thumbColor="black"
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <DatePicker
            style={{}}
            date={this.state.date}
            mode="datetime"
            placeholder="select date"
            format="YYYY/MM/DD HH-MM a"
            minDate="2020-01-01"
            maxDate="2020-12-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Button
            onPress={() => this.handleReservation()}
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
          ></Button>
        </View>
        <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'No' : 'Yes'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
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
    justifyContent: 'center',
    margin: 20,
    marginTop: 60
 },
 modalTitle: {
     fontSize: 24,
     fontWeight: 'bold',
     backgroundColor: '#512DA8',
     textAlign: 'center',
     color: 'white',
     marginBottom: 20
 },
 modalText: {
     fontSize: 18,
     margin: 10
 }
});
export default Reservation;
