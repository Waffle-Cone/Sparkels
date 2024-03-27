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
    backgroundColor: "white",
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: "#607C9E",
  },
  //counter
  counter: {
    padding: 20,
    fontSize: 30,
  },
});
