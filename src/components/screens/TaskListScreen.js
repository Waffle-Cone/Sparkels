import { Pressable, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";

const TaskListScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { projectId, projectName, projectDescription, projectDueDate } = route.params;
  const { handleDelete } = useContext(ProjectContext);
  // State ---------------------------
  // Handlers -------------------------
  const onDelete = () => {
    handleDelete(projectId);
    navigation.goBack();
  };

  const requestDelete = () =>
    Alert.alert("Delete warning", `Are you sure that you want to delete Project ${projectName}`, [{ text: "Cancel" }, { text: "Delete", onPress: onDelete }]);

  const goToAddTask = () => {
    navigation.navigate("AddTaskScreen");
  };
  // View -----------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Tasks for Project "{projectName}"</Text>
      <Text style={styles.h2}>Description: {projectDescription}</Text>
      <Text style={styles.h2}>Due Date: {projectDueDate}</Text>
      <View style={styles.buttonTray}>
        <TouchableOpacity style={styles.deleteButton} onPress={requestDelete}>
          <Text style={styles.textDeleteButton}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={goToAddTask}>
          <Text style={styles.textDeleteButton}>Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  h1: {
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  h2: {
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "black",
  },
  buttonTray: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  deleteButton: {
    flexDirection: "row",
    height: 50,
    width: 100,
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "#DE485A",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textDeleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
    paddingVertical: 8,
  },
});
