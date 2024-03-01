import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import TaskForm from "../entity/task/TaskForm";

const AddTaskScreen = ({ navigation }) => {
  // Initialisations ------------------
  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return <TaskForm />;
};

export default AddTaskScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
