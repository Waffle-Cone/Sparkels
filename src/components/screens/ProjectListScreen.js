import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Project from "../classes/Project";
import { Database } from "../classes/Database";
import Screen from "../layout/screen";

//const firstProject = new Project(1, "MAD", "This is soooo long");

const ProjectListScreen = () => {
  //initialisation----

  const [storage, setStorage] = useState(Database);

  useEffect(() => {
    setStorage(Database);
  }, []);

  console.log(storage.length);
  console.log(Database.length);

  return (
    <View style={styles.container}>
      {storage.map((project) => (
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
