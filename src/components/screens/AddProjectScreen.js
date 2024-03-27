import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import ProjectForm from "../entity/project/ProjectForm";

const AddProjectScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ProjectForm
        navigation={navigation}
        submitType="Add"
        formTitle="Add new project"
      />
    </SafeAreaView>
  );
};

export default AddProjectScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7AC0B8",
  },
  formContainer: {
    //borderWidth: 1,
  },
});
