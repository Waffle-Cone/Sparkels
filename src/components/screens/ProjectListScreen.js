import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Project from "../classes/Project";
import { Database } from "../classes/Database";
import Screen from "../layout/screen";

//const firstProject = new Project(1, "MAD", "This is soooo long");

const ProjectListScreen = () => {
  // Initialisations ------------------

  // State ----------------------------
  const [projects, setProjects] = useState(Database);

  useEffect(() => {
    setProjects(Database);
  }, []);

  console.log(projects.length);
  console.log(Database.length);

  // Handlers -------------------------
  const handleAdd = (project) => setProjects([...projects, project]);

  const onAdd = (project) => {
    handleAdd(project);
    navigation.navigate("ProjectListScreen");
  };
  // View -----------------------------

  return (
    <View style={styles.container}>
      {projects.map((project) => (
        <Text key={project.getId}>{project.getName()}</Text>
      ))}
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
