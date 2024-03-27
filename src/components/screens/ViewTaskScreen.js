// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// Linear Gradient Background https://docs.expo.dev/versions/latest/sdk/linear-gradient/

// -----------------------------------------------------

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import ViewTask from "../entity/task/ViewTask.js";
import { LinearGradient } from "expo-linear-gradient";

const ViewTaskScreen = ({ navigation, route }) => {
  const { selectedProject, task } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#C2E7E3", "#C7DCF5"]}
        style={styles.background}
      />
      <ViewTask navigation={navigation} task={task} project={selectedProject} />
    </View>
  );
};

export default ViewTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
  },
});
