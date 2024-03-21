import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormatTimeString from "../util/FormatTimeString";

const MyCounter = ({ counter }) => {
  return <Text style={styles.counter}>{FormatTimeString(counter)[0]}</Text>;
};

export default MyCounter;

const styles = StyleSheet.create({
  //counter
  counter: {
    padding: 20,
  },
});
