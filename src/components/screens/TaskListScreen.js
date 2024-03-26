import "react-native-gesture-handler";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TaskList from "../entity/task/TaskList";

const TaskListScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;
  const { handleDelete } = useContext(ProjectContext);

  // State ----------------------------

  // Handlers -------------------------
  const onDelete = () => {
    handleDelete(project.id);
    navigation.goBack();
  };

  const requestDelete = () =>
    Alert.alert(
      "Delete warning",
      `Are you sure that you want to delete this Project ${project.name}`,
      [
        { text: "Cancel" },
        { text: "Delete", onPress: onDelete, style: "destructive" },
      ]
    );

  const goToModifyProject = () => {
    navigation.navigate("ModifyProjectScreen", { project });
  };

  // View -----------------------------
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.projectContainer}>
          <View style={styles.project}>
            <Text style={styles.h1Project}>Project "{project.name}"</Text>
            <TouchableOpacity
              style={styles.editProjectButton}
              onPress={goToModifyProject}
            >
              <Text style={styles.textEditButton}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.h2}>Description: {project.description}</Text>
          <Text style={styles.h2}>Due Date: {project.dueDate}</Text>
        </View>

        <TaskList navigation={navigation} route={route} project={project} />

        <View style={styles.buttonTray}>
          <TouchableOpacity
            style={styles.deleteProjectButton}
            onPress={requestDelete}
          >
            <Text style={styles.textDeleteProjectButton}>Delete project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  projectContainer: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#C7DCF5",
    borderRadius: 10,
    borderColor: "#607C9E",
  },
  project: {
    flexDirection: "row",
    //borderWidth: 1,
  },
  h1Project: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  editProjectButton: {
    height: 50,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
  },
  textEditButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    paddingVertical: 8,
  },
  deleteProjectButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 370,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#DE485A",
    backgroundColor: "white",
  },
  textDeleteProjectButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
    paddingVertical: 8,
  },
});
