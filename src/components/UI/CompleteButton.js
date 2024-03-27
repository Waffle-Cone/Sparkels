import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React from "react";

export const CompleteButtonButton = ({ handleComplete, text }) => {
  // Initialisations ------------------

  return (
    <View style={styles.buttonCompleteTray}>
      <TouchableOpacity style={styles.completeTask} onPress={handleComplete}>
        <Text style={styles.textCompleteTask}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CompleteProjectButton = ({ project, handleComplete, text }) => {
  // Initialisations ------------------

  let allTasksCompleted = true;
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => {
      if (task.completedStatus !== 3) {
        console.log("not completed");
        allTasksCompleted = false;
      } else console.log("Completed");
    });
  }
  console.log(project.tasks);
  // State ----------------------------
  // Handlers -------------------------
  const handleProjectNotCompleted = () => {
    Alert.alert(
      "Finish Tasks!",
      `All tasks must be completed for ${project.name}`,
      [{ text: "Cancel" }]
    );
  };
  // View -----------------------------

  return (
    <>
      {allTasksCompleted ? (
        <TouchableOpacity
          style={styles.completeTaskProject}
          onPress={handleComplete}
        >
          <Text style={styles.textCompleteTask}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.completeTaskProject}
          onPress={handleProjectNotCompleted}
        >
          <Text style={[styles.textCompleteTask, { color: "#375E59" }]}>
            {text}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  //bottom button
  buttonCompleteTray: {
    flex: 1,
    gap: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    //paddingTop: 50,
    //paddingBottom: 20,
  },
  completeTaskProject: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 6,
    borderColor: "#649C95",
    backgroundColor: "#C2E7E3",
    height: 60,
    minWidth: "100%",
  },
  completeTask: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#649C95",
    backgroundColor: "#C2E7E3",
    height: 60,
    minWidth: "100%",
  },
  textCompleteTask: {
    fontSize: 18,
    textAlign: "center",
    color: "#375E59",
  },
});
