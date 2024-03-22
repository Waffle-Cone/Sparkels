import "react-native-gesture-handler";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TaskList from "../entity/task/TaskList";
import { CompleteProjectButton } from "../UI/CompleteButton";
import CompletedStats from "../UI/CompletedStats";
import HeaderCard from "../UI/HeaderCard";

const TaskListScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;

  // State ----------------------------
  const { handleDelete, handleCompleteProject, getProject } = useContext(ProjectContext);
  const selectedProject = getProject(project.id)._j;

  // Handlers -------------------------
  const onDelete = () => {
    navigation.navigate("ProjectListScreen");
    handleDelete(selectedProject.id);
  };

  const requestDelete = () => {
    Alert.alert("Delete warning", `Are you sure that you want to delete this Project ${selectedProject.name}`, [
      { text: "Cancel" },
      { text: "Delete", onPress: onDelete, style: "destructive" },
    ]);
  };

  const goToModifyProject = () => {
    navigation.navigate("ModifyProjectScreen", { project });
  };

  const onProjectComplete = () => {
    handleCompleteProject(selectedProject.id);
    navigation.navigate("ProjectListScreen");
  };

  const requestProjectComplete = () => {
    Alert.alert("Completion warning", `This will auto complete all tasks in Project ${selectedProject.name}`, [
      { text: "Cancel" },
      { text: "Complete", onPress: onProjectComplete, style: "destructive" },
    ]);
  };
  console.log(`TaskList ==== ${JSON.stringify(selectedProject.tasks)}`);
  // View -----------------------------
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderCard title={`Project ${selectedProject.name}`} description={selectedProject.description} time={`Due Date: ${selectedProject.dueDate}`} onPress={goToModifyProject} />
        {!selectedProject.isCompleted ? (
          <>
            <CompleteProjectButton project={selectedProject} handleComplete={requestProjectComplete} text={"Complete Project"} />
            <TaskList navigation={navigation} route={route} project={selectedProject} />
          </>
        ) : (
          <CompletedStats.ProjectCompletedStates project={selectedProject} />
        )}

        <TouchableOpacity style={styles.deleteProjectButton} onPress={requestDelete}>
          <Text style={styles.textDeleteProjectButton}>Delete project</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    backgroundColor: "white",
  },
  projectContainer: {
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
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#DE485A",
    backgroundColor: "white",
    height: 50,
    width: 300,
  },
  textDeleteProjectButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
  },
});
