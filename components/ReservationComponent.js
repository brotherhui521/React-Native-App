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
  Alert,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Calendar from "expo-calendar";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      //showModal: false,
    };
  }
  /*toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  */

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date + " requested",
      ios: {
        sound: true,
        _displayInForeground: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: "#512DA8",
      },
    });
  }

  handleNotification() {
    console.log("Listener OK");
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    console.log(this.state.smoking);

    Alert.alert(
      "Your Reservation OK?",
      "Number of guests: " +
        this.state.guests +
        "\n" +
        "Smoking? " +
        +!this.state.smoking +
        "\n" +
        "Date and Time: " +
        this.state.date,
      [
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            //add to calendar . ios need reminder permission too
            this.addReservationToCalendar(this.state.date);
            this.resetForm();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            this.resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  }

  async obtainCalendarPermission(){
    const calendarPermission=await Calendar.requestCalendarPermissionsAsync();
    if(calendarPermission.status==="granted"){
      const reminderPermission=await Calendar.getCalendarPermissionsAsync();
      if(reminderPermission.status==="granted"){
        console.log("premission got");
      }
      
    }
  }

  async addReservationToCalendar(date){
    await this.obtainCalendarPermission();

    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    const JSONdateString=JSON.stringify(date);  
    const dateString=JSON.parse(JSONdateString);
    console.log(date);
    console.log(JSONdateString);
    console.log(dateString);

    Calendar.createEventAsync(defaultCalendar.id,{
      title: "Con Fusion Table Reservation",
      startDate: new Date(date),
      endDate: new Date(new Date(date).getTime()+2*60*60*1000),
      location:"121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kon",
      timeZone:"Asia/Hong_Kong"
      
    })
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
      //showModal: false,
    });
  }
  render() {
    return (
      <Animatable.View animation="zoomIn" duration={1000}>
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
            <Text style={{ flex: 1, fontSize: 18 }}>Date and Time</Text>
            <DatePicker
              style={{ flex: 2 }}
              date={this.state.date}
              mode="datetime"
              placeholder="select date and time"
              format=""
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
        </ScrollView>
      </Animatable.View>
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
    marginTop: 60,
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
export default Reservation;
