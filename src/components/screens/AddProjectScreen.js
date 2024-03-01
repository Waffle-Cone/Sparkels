import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import ProjectForm from "../entity/project/ProjectForm";

const AddProjectScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;

  //++ getting submition handler from context
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
