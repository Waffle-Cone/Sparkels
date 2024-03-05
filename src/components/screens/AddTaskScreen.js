import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import TaskForm from "../entity/task/TaskForm";

const AddTaskScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;

  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return <TaskForm navigation={navigation} submitType={"Add"} formTitle={"Add Task"} project={project} />;
};

export default AddTaskScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
