import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormatTimeString from "../util/FormatTimeString";

const MyCounter = ({ counter }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{FormatTimeString.counter(counter)[0]}</Text>
    </View>
  );
};

export default MyCounter;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
    marginTop: 40,
    width: "80%",
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: "#607C9E",
  },
  //counter
  counter: {
    padding: 20,
    fontSize: 50,
  },
});
