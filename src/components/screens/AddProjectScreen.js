import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { ProjectContext } from "../classes/ProjectContext";
import Project from "../classes/Project";
import { Calendar } from "react-native-calendars";
import ProjectForm from "../entity/project/ProjectForm";

const AddProjectScreen = ({ navigation }) => {
  // Initialisations ------------------
  //++ getting submition handler from context
  const { handleAdd } = useContext(ProjectContext);

  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ProjectForm navigation={navigation} submitType="Add" formTitle="New Project" />
    </SafeAreaView>
  );
};

export default AddProjectScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
