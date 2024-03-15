import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Vibration,
} from "react-native";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Animated, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TaskListScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;
  // Sting is displayed to user
  const displayTaskTime = (value) => {
    const hours = new Date(value).getHours();
    const minutes = new Date(value).getMinutes();
    const breakText = `${hours} Hour(s) and ${minutes} Minute(s)`;

    return breakText;
  };

  const { handleDelete, handleDeleteTask, updateProjectTasks } =
    useContext(ProjectContext);
  // State ----------------------------
  const [tasks, setTasks] = useState(project.tasks);

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

  const requestDeleteTask = (projectId, taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure that you want to delete this Task?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await handleDeleteTask(projectId, taskId);
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
          },
        },
      ]
    );
  };

  const goToAddTask = () => {
    navigation.navigate("AddTaskScreen", { project });
  };

  const goToModifyProject = () => {
    navigation.navigate("ModifyProjectScreen", { project });
  };
  const goToModifyTask = (task) => {
    navigation.navigate("ModifyTaskScreen", { project, task });
  };


  const onDragEnd = ({ data }) => {
    setTasks(data);
    updateProjectTasks(project.id, data);
    
  const goToViewTaskScreen = (task) => {
    navigation.navigate("ViewTaskScreen", { project, task });
  };

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });
    return (
      <TouchableOpacity style={styles.editSwipe}>
        <Text style={styles.editSwipeText}>Edit</Text>
      </TouchableOpacity>
    );
  };

  const renderTaskItem = ({ item, drag, isActive }) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          Vibration.vibrate();
          drag();
        }}
        style={[
          styles.taskItem,
          isActive
            ? { backgroundColor: "#C7DCF5" }
            : { backgroundColor: "#E3E8ED" },
        ]}
      >
        <View style={styles.taskContentContainer}>
          <View style={styles.taskTextContainer}>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              {item.name}
            </Text>
            <Text>{item.description}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => goToModifyTask(tasks)}
            >
              <Icons.Edit />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => requestDeleteTask(project.id, item.id)}
            >
              <Icons.Delete />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
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

        <View style={styles.taskContainer}>
          <View style={styles.task}>
            <Text style={styles.h1Tasks}>Tasks</Text>
            <TouchableOpacity
              style={styles.addTaskButton}
              onPress={goToAddTask}
            >
              <Text style={styles.textTaskButton}>Add a Task</Text>
              <Icons.AddIcon />
            </TouchableOpacity>
          </View>


          <DraggableFlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={(item) => `draggable-item-${item.id}`}
            onDragEnd={onDragEnd}
          />

          <ScrollView contentContainerStyle={{ maxHeight: 350 }}>
            {project.tasks.map((task) => {
              return (
                <Swipeable
                  key={task.id}
                  onSwipeableLeftOpen={() => goToModifyTask(task)}
                  renderLeftActions={leftSwipe}
                  renderRightActions={(progress, dragX) => rightSwipe(progress, dragX, project.id, task.id)}
                >
                  <Pressable delayLongPress={200} onLongPress={() => goToViewTaskScreen(task)}>
                    <View style={styles.taskItem}>
                      <View style={styles.taskDetails}>
                        <Text>Task name: {task.name}</Text>
                        <Text>Description: {task.description}</Text>
                        <Text>Time: {displayTaskTime(task.goalTimeStamp)}</Text>
                      </View>
                    </View>
                  </Pressable>
                </Swipeable>
              );
            })}
          </ScrollView>
        </View>

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
  //PROJECT
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
  //TASKS
  taskContainer: {
    backgroundColor: "white",
    //padding: 10,
    marginBottom: 20,
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
    //paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "black",
  },
  taskItem: {
    flex: 1,
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: "grey",
    borderRadius: 10,
    borderColor: "#7F8FA2",
  },
  taskContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  addTaskButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
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
  editButton: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
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
  editSwipe: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  editSwipeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  deleteSwipe: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  deleteSwipeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});
