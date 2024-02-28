import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";

const ProjectListScreen = ({ navigation }) => {
  // Initialisations ------------------
  const { projects } = useContext(ProjectContext);

  // State ---------------------------
  // Handlers -------------------------
  const gotoTaskListScreen = () => navigation.navigate("TaskListScreen");

  // View -----------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Projects</Text>

      {projects.map((project) => {
        return (
          <TouchableOpacity key={project.id} onPress={gotoTaskListScreen}>
            <View style={styles.projectContainer}>
              <View style={styles.projectDetails}>
                <Text>Project name: {project.name}</Text>
                <Text>Description: {project.description}</Text>
                <Text>Due date: {project.dueDate}</Text>
              </View>
              <Icons.RightArrow />
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
  projectContainer: {
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
  projectDetails: {
    flex: 1,
  },
});
