// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// The FormatTimeString https://github.com/leejaehyup/react-native-timestamp-timer-hooks/blob/master/example/src/util.ts

// -----------------------------------------------------
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormatTimeString from "../util/FormatTimeString";

const CompletedStats = {};

const Stats = ({ totalTime, goalTime, type }) => {
  return (
    <View style={styles.taskInfoContainer}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskInfoText}>
          Finished {type} in: {FormatTimeString.counter(totalTime * 1000)[0]}
        </Text>
        <Text style={styles.taskInfoText}>Goal Time: {FormatTimeString.counter(goalTime * 1000)[0]}</Text>
      </View>
      <View style={styles.completionBanner}>
        <Text style={styles.completionText}>{type} Completed</Text>
      </View>
    </View>
  );
};

const TaskCompletedStats = ({ task }) => {
  return <Stats totalTime={task.actualTime} goalTime={task.goalTime} type={"Task"} />;
};

const ProjectCompletedStates = ({ project }) => {
  // Initialisations ------------------
  let totalTimeSpent = 0;
  let theTotalGoalTime = 0;
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => {
      console.log(task);
      totalTimeSpent = totalTimeSpent + task.actualTime;
      theTotalGoalTime = theTotalGoalTime + task.goalTime;
    });
  }
  // View -----------------------------
  return <Stats totalTime={totalTimeSpent} goalTime={theTotalGoalTime} type={"Project"} />;
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
