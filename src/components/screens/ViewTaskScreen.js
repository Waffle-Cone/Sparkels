import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import ViewTask from "../entity/task/ViewTask.js";

const ViewTaskScreen = ({ navigation, route }) => {
  const { selectedProject, task } = route.params;

  return (
    <View style={styles.container}>
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
});
