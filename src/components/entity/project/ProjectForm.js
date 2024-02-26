import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { Calendar } from "react-native-calendars";
import Project from "../../classes/Project";
import { ProjectContext } from "../../classes/ProjectContext";
import Form from "../../UI/Form";

const ProjectForm = ({ navigation, submitType }) => {
  // Initialisations ------------------
  const newProject = new Project();

  //++ getting submition handler from context
  const { handleAdd } = useContext(ProjectContext);

  // State ----------------------------
  const [project, setProject] = useState(newProject);

  //+++ reset the text inputs back to null when re - visiting
  React.useEffect(() => {
    const newPage = navigation.addListener("focus", () => {
      setProject(newProject);
    });
    return newPage;
  }, [navigation]);

  // Handlers -------------------------
  const handleChange = (field, value) => setProject({ ...project, [field]: value });

  const handleSubmit = () => {
    handleAdd(project);
  };
  const handleCancel = () => {};

  // View -----------------------------
  return (
    <Form submitType={submitType} onSubmit={handleSubmit} onCancel={handleCancel}>
      <Form.InputText label={"Project Name"} value={project.name} onChange={(value) => handleChange("name", value)} />
      <Form.InputText label={"Project Description"} value={project.description} onChange={(value) => handleChange("description", value)} />
      <Calendar />
    </Form>
  );
};

export default ProjectForm;

const styles = StyleSheet.create({});
