import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import TaskForm from "../entity/task/TaskForm";

const AddTaskScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { selectedProject } = route.params;
  console.log(`Add task screen ${JSON.stringify(selectedProject.tasks)}`);

  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return <TaskForm navigation={navigation} submitType={"Add"} formTitle={"Add Task"} project={selectedProject} />;
};

export default AddTaskScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
