import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../classes/ProjectContext";

const ProjectListScreen = () => {
  // Initialisations ------------------
  const { projects } = useContext(ProjectContext);
  console.log(projects);

  // State ---------------------------
  // Handlers -------------------------
  // View -----------------------------

  return (
    <View style={styles.container}>
      {projects.map((project) => {
        return <Text>{project.name}</Text>;
      })}
    </View>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
