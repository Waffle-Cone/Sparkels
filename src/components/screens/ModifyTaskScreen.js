import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import TaskForm from "../entity/task/TaskForm";

const ModifyTaskScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { selectedProject, task } = route.params;

  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return (
    <SafeAreaView style={styles.container}>
      <TaskForm
        navigation={navigation}
        submitType="Modify"
        formTitle="Modify Task"
        project={selectedProject}
        selectedTask={task}
      />
    </SafeAreaView>
  );
};

export default ModifyTaskScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BACDFF",
  },
});
