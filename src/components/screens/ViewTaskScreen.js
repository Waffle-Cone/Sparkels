import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewTask from "../entity/task/ViewTask.js";

const ViewTaskScreen = ({ navigation, route }) => {
  const { project, task } = route.params;

  return <ViewTask navigation={navigation} task={task} project={project} />;
};

export default ViewTaskScreen;

const styles = StyleSheet.create({});
