// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// DraggableFlatList documentation https://www.npmjs.com/package/react-native-draggable-flatlist

// -----------------------------------------------------

import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Vibration,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import Icons from "../../UI/Icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import TaskItem from "./TaskItem";

const TaskList = ({ navigation, project }) => {
  // Initialisations ------------------

  const { getProject } = useContext(ProjectContext);
  const selectedProject = getProject(project.id)._j;

  // String is displayed to user
  const displayTaskTime = (value) => {
    const hours = new Date(value).getHours();
    const minutes = new Date(value).getMinutes();
    const breakText = `${hours} Hour(s) and ${minutes} Minute(s)`;

    return breakText;
  };

  // State ----------------------------
  const [tasks, setTasks] = useState(selectedProject.tasks);
  const { handleDeleteTask, updateProjectTasks } = useContext(ProjectContext);

  useEffect(() => {
    setTasks(selectedProject.tasks);
  }, [selectedProject.tasks]);
  // Handlers -------------------------
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
          },
        },
      ]
    );
  };

  const goToAddTask = (selectedProject) => {
    navigation.navigate("AddTaskScreen", { selectedProject });
  };

  const goToModifyTask = (task) => {
    navigation.navigate("ModifyTaskScreen", { selectedProject, task });
  };

  const onDragEnd = async ({ data }) => {
    updateProjectTasks(project.id, data);
  };

  const goToViewTaskScreen = (task) => {
    navigation.navigate("ViewTaskScreen", { selectedProject, task });
  };

  const backgroundColorSelector = (item) => {
    if (item.completedStatus === 3) {
      return { backgroundColor: "#C2E7E3" };
    } else if (item.completedStatus === 2) {
      return { backgroundColor: "#FFE093" };
    } else {
      return { backgroundColor: "#E3E8ED" };
    }
  };

  const renderTaskItem = ({ item, drag, isActive }) => {
    //console.log(`TaskList IEMS ==== ${JSON.stringify(item)}`);
    return (
      <TouchableOpacity
        onPress={() => goToViewTaskScreen(item)}
        onLongPress={() => {
          Vibration.vibrate();
          drag();
        }}
        style={[
          styles.taskItem,
          isActive
            ? { backgroundColor: "#C7DCF5" }
            : backgroundColorSelector(item),
        ]}
      >
        <TaskItem
          item={item}
          project={project}
          goToModifyTask={goToModifyTask}
          requestDeleteTask={requestDeleteTask}
        />
      </TouchableOpacity>
    );
  };

  // View -----------------------------

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.task}>
          <Text style={styles.h1Tasks}>Tasks</Text>
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={() => goToAddTask(selectedProject)}
          >
            <Text style={styles.textTaskButton}>Add a Task</Text>
            <Icons.AddIcon />
          </TouchableOpacity>
        </View>

        <DraggableFlatList
          data={tasks}
          onDragEnd={onDragEnd}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  taskContainer: {
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#ceced0",
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
    paddingBottom: 60,
    borderLeftWidth: 20,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    borderColor: "darkgrey",
    borderBottomWidth: 4,

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
    backgroundColor: "grey",
    borderRadius: 10,
    borderColor: "#7F8FA2",
  },
  addTaskButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#64696E",
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
});
