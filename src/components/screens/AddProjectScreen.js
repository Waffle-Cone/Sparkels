import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Project from "../classes/Project";
import { Database } from "../classes/Database";

const initialProject = {
  ProjectID: null,
  ProjectName: null,
  ProjectDescription: null,
};

const AddProjectScreen = () => {
  // Initialisations ------------------
  // State ----------------------------
  const [project, setProject] = useState(initialProject);
  // Handlers -------------------------
  const handleChange = (field, value) =>
    setProject({ ...project, [field]: value });

  const handleSubmit = () => {
    console.log("hello");

    const newProject = new Project(
      project.ProjectID,
      project.ProjectName,
      project.ProjectDescription
    );
  };

  // View -----------------------------
  return (
    <View style={styles.container}>
      <TextInput
        value={project.ProjectName}
        placeholder="Enter name"
        onChangeText={(value) => handleChange("ProjectName", value)}
        style={styles.itemTextInput}
      />
      <Pressable onPress={handleSubmit}>
        <Text>Add project</Text>
      </Pressable>
    </View>
  );
};

export default AddProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
