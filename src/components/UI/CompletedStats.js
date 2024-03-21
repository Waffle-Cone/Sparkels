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
        <Text style={styles.completionText}>Task has been completed</Text>
      </View>
    </View>
  );
};

CompletedStats.TaskCompletedStats = (task) => TaskCompletedStats(task);

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
