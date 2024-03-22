import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";

export const CompleteButton = ({ handleComplete, text }) => {
  return (
    <TouchableOpacity style={styles.completeTask} onPress={handleComplete}>
      <Text style={styles.textCompleteTask}>{text}</Text>
    </TouchableOpacity>
  );
};

export const CompleteProject = ({ project, handleComplete, text }) => {
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
    Alert.alert("Finish Tasks!", `All tasks must be completed for ${project.name}`, [{ text: "Cancel" }]);
  };
  // View -----------------------------

  return (
    <>
      {allTasksCompleted ? (
        <TouchableOpacity style={styles.completeTask} onPress={handleComplete}>
          <Text style={styles.textCompleteTask}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.completeTask, { borderColor: "grey" }]} onPress={handleProjectNotCompleted}>
          <Text style={styles.textCompleteTask}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  //bottom button
  completeTask: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 390,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#33d436",
    backgroundColor: "white",
  },
  textCompleteTask: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#33d436",
    paddingVertical: 8,
  },
  projContainer: {},
});
