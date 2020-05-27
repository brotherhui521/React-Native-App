import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Main from "./components/MainComponent";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import Loading from './components/LoadingComponent';
import {PersistGate} from'redux-persist/integration/react';

const {store, persistor} = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={Loading} persistor={persistor}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
