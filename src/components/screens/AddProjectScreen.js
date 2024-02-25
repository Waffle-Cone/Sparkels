import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { ProjectContext } from "../classes/ProjectContext";

const initialProject = {
  ProjectID: null,
  ProjectName: null,
  ProjectDescription: null,
};

const AddProjectScreen = ({ navigation }) => {
  // Initialisations ------------------
  const { handleAdd } = useContext(ProjectContext);
  // State ----------------------------
  const [project, setProject] = useState(initialProject);

  //reset the text inputs back to null
  React.useEffect(() => {
    const newPage = navigation.addListener("focus", () => {
      setProject(initialProject);
    });
    return newPage;
  }, [navigation]);

  // Handlers -------------------------
  const handleChange = (field, value) => setProject({ ...project, [field]: value });

  const handleSubmit = () => {
    handleAdd(project);
  };

  // View -----------------------------
  return (
    <View style={styles.container}>
      <TextInput value={project.ProjectName} placeholder="Enter name" onChangeText={(value) => handleChange("ProjectName", value)} style={styles.itemTextInput} />
      <TextInput
        value={project.ProjectDescription}
        placeholder="Enter Dexcription"
        onChangeText={(value) => handleChange("ProjectDescription", value)}
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
    gap: 20,
  },
  itemTextInput: {
    height: 30,
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
});
