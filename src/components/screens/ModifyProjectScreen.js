import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import ProjectForm from "../entity/project/ProjectForm";

const ModifyProjectScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { project } = route.params;

  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ProjectForm
        navigation={navigation}
        submitType="Modify"
        formTitle="Modify Project"
        selectedProject={project}
      />
    </SafeAreaView>
  );
};

export default ModifyProjectScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7DCF5",
  },
});
