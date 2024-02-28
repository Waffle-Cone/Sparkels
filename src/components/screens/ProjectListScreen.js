import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";

const ProjectListScreen = () => {
  // Initialisations ------------------
  const { projects } = useContext(ProjectContext);

  // State ---------------------------
  // Handlers -------------------------
  // View -----------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Projects</Text>

      {projects.map((project) => {
        return (
          <Pressable key={project.id} style={styles.projectItem}>
            <Text>
              {project.name} || {project.description} || {project.dueDate}
            </Text>
            <Icons.RightArrow />
          </Pressable>
        );
      })}
    </View>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    margin: 20,
  },
  h1: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  projectItem: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
