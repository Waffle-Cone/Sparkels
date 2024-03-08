import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";

const ProjectListScreen = ({ navigation }) => {
  // Initialisations ------------------
  const { projects } = useContext(ProjectContext);

  // State ---------------------------
  // Handlers -------------------------

  //passing also the project object clicked
  const gotoTaskListScreen = (project) => navigation.navigate("TaskListScreen", { project });

  // View -----------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Projects</Text>
      <Text style={styles.h2}>Upcoming</Text>

      {projects.map((project) => {
        return (
          <TouchableOpacity key={project.id} onPress={() => gotoTaskListScreen(project)}>
            <View style={styles.projectContainer}>
              <View style={styles.projectDetails}>
                <Text>Project name: {project.name}</Text>
                <Text>Description: {project.description}</Text>
                <Text>Due date: {project.dueDate}</Text>
              </View>
              <Icons.ArrowRight />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    //margin: 20,
    backgroundColor: "white",
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
  h2: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  projectContainer: {
    borderRadius: 10,
    borderColor: "#607C9E",
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#C7DCF5",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectDetails: {
    flex: 1,
  },
});
