import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewTask from "../entity/task/ViewTask.js";

const ViewTaskScreen = ({ route }) => {
  const { project, task } = route.params;

  return <ViewTask task={task} />;
};

export default ViewTaskScreen;

const styles = StyleSheet.create({});
