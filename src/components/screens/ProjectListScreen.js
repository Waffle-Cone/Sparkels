import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Project from "../classes/Project";
import { Database } from "../classes/Database";

const firstProject = new Project(1, "MAD", "This is soooo long");

const ProjectListScreen = () => {
  //initialisation----

  const [storage, setStorage] = useState(Database);

  storage.push(firstProject);

  console.log(storage.length);
  console.log(Database.length);

  return (
    <View>
      {storage.map((project) => (
        <Text key={project.getId}>{project.getName()}</Text>
      ))}
    </View>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({});
