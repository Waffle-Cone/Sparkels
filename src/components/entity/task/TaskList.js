import "react-native-gesture-handler";
import { StyleSheet, Text, TouchableOpacity, View, Alert, Vibration } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import Icons from "../../UI/Icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    Alert.alert("Delete Task", "Are you sure that you want to delete this Task?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await handleDeleteTask(projectId, taskId);
        },
      },
    ]);
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

  const renderTaskItem = ({ item, drag, isActive }) => {
    //console.log(`TaskList IEMS ==== ${JSON.stringify(item)}`);
    return (
      <TouchableOpacity
        onPress={() => goToViewTaskScreen(item)}
        onLongPress={() => {
          Vibration.vibrate();
          drag();
        }}
        style={[styles.taskItem, isActive ? { backgroundColor: "#C7DCF5" } : { backgroundColor: "#E3E8ED" }]}
      >
        <View style={styles.taskContentContainer}>
          <View style={styles.taskTextContainer}>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              {item.name} {item.id}
            </Text>
            <Text>{item.description}</Text>
            <Text>Time: {displayTaskTime(item.goalTimeStamp)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => goToModifyTask(item)}>
              <Icons.Edit />
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={() => requestDeleteTask(project.id, item.id)}>
              <Icons.Delete />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // View -----------------------------

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.task}>
          <Text style={styles.h1Tasks}>Tasks</Text>
          <TouchableOpacity style={styles.addTaskButton} onPress={() => goToAddTask(selectedProject)}>
            <Text style={styles.textTaskButton}>Add a Task</Text>
            <Icons.AddIcon />
          </TouchableOpacity>
        </View>

        <DraggableFlatList data={tasks} renderItem={renderTaskItem} keyExtractor={(item) => `draggable-item-${item.id}`} onDragEnd={onDragEnd} />
      </View>
    </GestureHandlerRootView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    //padding: 10,
    backgroundColor: "#ceced0",
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "gray",
    padding: 10,
    minHeight: 200,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
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
});
