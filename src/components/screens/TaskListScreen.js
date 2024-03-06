import "react-native-gesture-handler";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Animated } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const TaskListScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;
  const { handleDelete } = useContext(ProjectContext);
  console.log(` task list screen ${project}`);
  // State ----------------------------

  // Handlers -------------------------
  const onDelete = () => {
    handleDelete(project.id);
    navigation.goBack();
  };

  const requestDelete = () =>
    Alert.alert("Delete warning", `Are you sure that you want to delete Project ${project.name}`, [{ text: "Cancel" }, { text: "Delete", onPress: onDelete }]);

  const goToAddTask = () => {
    navigation.navigate("AddTaskScreen", { project });
  };

  const goToModifyProject = () => {
    navigation.navigate("ModifyProjectScreen", { project });
  };
  const goToModifyTask = (task) => {
    navigation.navigate("ModifyTaskScreen", { project, task });
  };

  const leftSwipe = (progress, dragX) => {
    //goToModifyTask(task);
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });
    return (
      <View style={styles.editSwipe}>
        <Animated.Text style={{ transform: [{ scale: scale }] }}>Edit</Animated.Text>
      </View>
    );
  };

  const rightSwipe = (progress, dragX) => {
    return (
      <View style={styles.deleteSwipe}>
        <Text>Delete</Text>
      </View>
    );
  };

  // View -----------------------------

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.projectContainer}>
          <View style={styles.project}>
            <Text style={styles.h1Project}>Project "{project.name}"</Text>
            <TouchableOpacity style={styles.editButton} onPress={goToModifyProject}>
              <Text style={styles.textEditButton}>Edit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.h2}>Description: {project.description}</Text>
          <Text style={styles.h2}>Due Date: {project.dueDate}</Text>
        </View>

        <View style={styles.taskContainer}>
          <View style={styles.task}>
            <Text style={styles.h1Tasks}>Tasks</Text>
            <TouchableOpacity style={styles.addTaskButton} onPress={goToAddTask}>
              <Text style={styles.textTaskButton}>Add a Task</Text>
              <Icons.AddProject />
            </TouchableOpacity>
          </View>

          {project.tasks.map((task) => {
            return (
              <Swipeable key={task.id} onSwipeableLeftOpen={() => goToModifyTask(task)} renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
                <View style={styles.taskItem}>
                  <View style={styles.taskDetails}>
                    <Text>
                      Task name: {task.name} {task.id}
                    </Text>
                    <Text>Description: {task.description}</Text>
                  </View>
                </View>
              </Swipeable>
            );
          })}
        </View>
        <View style={styles.buttonTray}>
          <TouchableOpacity style={styles.deleteButton} onPress={requestDelete}>
            <Text style={styles.textDeleteButton}>Delete project</Text>
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
    margin: 20,
    backgroundColor: "",
  },
  //PROJECT
  projectContainer: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
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
  editButton: {
    height: 50,
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
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
  //TASKS
  taskContainer: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
  },
  task: {
    flexDirection: "row",
    //borderWidth: 1,
  },
  h1Tasks: {
    flex: 1,
    paddingBottom: 5,
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
  taskItem: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
  },
  addTaskButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
  },
  textTaskButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    padding: 8,
  },
  buttonTray: {
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 390,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#DE485A",
    backgroundColor: "white",
  },
  textDeleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
    paddingVertical: 8,
  },
  editSwipe: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  deleteSwipe: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});
