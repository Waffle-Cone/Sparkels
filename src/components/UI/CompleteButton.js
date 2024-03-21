import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CompleteButton = ({ handleComplete, text }) => {
  return (
    <TouchableOpacity style={styles.completeTask} onPress={handleComplete}>
      <Text style={styles.textCompleteTask}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CompleteButton;

const styles = StyleSheet.create({
  //bottom button
  completeTask: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 390,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#33d436",
    backgroundColor: "white",
  },
  textCompleteTask: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#33d436",
    paddingVertical: 8,
  },
});
