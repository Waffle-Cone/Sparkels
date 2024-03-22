import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormatTimeString from "../util/FormatTimeString";

const CompletedStats = {};

const TaskCompletedStats = ({ task }) => {
  return (
    <View style={styles.taskInfoContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskInfoText}>Finished Task in: {FormatTimeString.counter(task.actualTime * 1000)[0]}</Text>
        <Text style={styles.taskInfoText}>Goal Time: {FormatTimeString.counter(task.goalTime * 1000)[0]}</Text>
      </View>
      <View style={styles.completionBanner}>
        <Text style={styles.completionText}>Task Completed</Text>
      </View>
    </View>
  );
};

const ProjectCompletedStates = ({ project }) => {
  // Initialisations ------------------
  let totalTimeSpent = 0;
  let theTotalGoalTime = 0;
  console.log(` Completed project === ${JSON.stringify(project)}`);
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => {
      console.log(task);
      totalTimeSpent = totalTimeSpent + task.actualTime;
      theTotalGoalTime = theTotalGoalTime + task.goalTime;
    });
  }
  console.log(totalTimeSpent);
  console.log(theTotalGoalTime);

  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return (
    <View style={styles.taskInfoContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskInfoText}>Project Total Time: {FormatTimeString.counter(totalTimeSpent * 1000)[0]}</Text>
        <Text style={styles.taskInfoText}>Goal Time Reminder: {FormatTimeString.counter(theTotalGoalTime * 1000)[0]}</Text>
      </View>
      <View style={styles.completionBanner}>
        <Text style={styles.completionText}>Project Completed</Text>
      </View>
    </View>
  );
};
CompletedStats.TaskCompletedStats = (task) => TaskCompletedStats(task);
CompletedStats.ProjectCompletedStates = (project) => ProjectCompletedStates(project);

export default CompletedStats;

const styles = StyleSheet.create({
  // task info when completed
  taskInfoContainer: {
    height: 200,
    flexDirection: "column",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#33d436",
  },
  completionBanner: {
    height: 100,
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#33d436",
    borderRadius: 10,
    borderColor: "#0fb811",
    alignItems: "center",
    justifyContent: "center",
  },
  completionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskInfo: {
    flex: 1,
    gap: 30,
  },
  taskInfoText: {
    fontSize: 16,
    color: "black",
  },
});
