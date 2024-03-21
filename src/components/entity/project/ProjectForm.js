// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// Calander component documentation, https://www.npmjs.com/package/react-native-calendars

// -----------------------------------------------------

import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import Project from "../../classes/Project";
import { ProjectContext } from "../../context/ProjectContext";
import Form from "../../UI/Form";
import { useIsFocused } from "@react-navigation/native";
import NextID from "../../util/NextID";

const ProjectForm = ({ navigation, submitType, formTitle, selectedProject, goBack }) => {
  // Initialisations ------------------
  const newProject = new Project();

  //error messages to display if submition is wrong
  const errorMessage = {
    name: "Enter project name",
    description: "Enter project description",
    dueDate: "Enter project due date",
    tasks: "",
    id: "",
  };

  //++ getting submition handler from context
  const { projects, handleAdd, handleModify } = useContext(ProjectContext);

  // State ----------------------------
  const [project, setProject] = useState(selectedProject || newProject);
  const [selectedDate, setSelectedDate] = useState(project.dueDate || "");
  const [errors, setErrors] = useState(Object.keys(project).reduce((acc, key) => ({ ...acc, [key]: null }), {})); // = [name: null, description: null, dueDate: null, task: null, id: null]

  //+++ reset the text inputs back to null when re - visiting
  React.useEffect(() => {
    const newPage = navigation.addListener("focus", () => {
      setProject(selectedProject || newProject);
      setSelectedDate(project.dueDate || "");
      setErrors(Object.keys(project).reduce((acc, key) => ({ ...acc, [key]: null }), {})); // = [name: null, description: null, dueDate: null, task: null, id: null]);
    });
    return newPage;
  }, [navigation]);

  //will be used to reset the calendar back to the initial state (open to todays date)
  const isFocused = useIsFocused();

  // Handlers -------------------------
  const checkProject = (project) => {
    let isProjectValid = true;
    Object.keys(project).forEach((key) => {
      if (!project[key]) {
        errors[key] = errorMessage[key];
        isProjectValid = false;
      } else {
        errors[key] = null;
      }
    });
    return isProjectValid;
  };
  const handleChange = (field, value) => setProject({ ...project, [field]: value });

  const handleSubmit = () => {
    if (!selectedProject) {
      project.id = NextID.project(projects);
    }
    const check = checkProject(project);
    setErrors({ ...errors });
    if (check) {
      if (selectedProject) {
        selectedProject.name = project.name;
        selectedProject.description = project.description;
        selectedProject.dueDate = project.dueDate;
        handleModify(project);
        navigation.goBack();
      } else {
        handleAdd(project);
        navigation.navigate("Project");
      }
    }
  };

  const handleCancel = () => {
    if (selectedProject) {
      navigation.goBack();
    } else {
      navigation.navigate("Project");
    }
  };

  // View -----------------------------
  return (
    <Form submitType={submitType} onSubmit={handleSubmit} onCancel={handleCancel} title={formTitle}>
      <Form.InputText label={"Project Name"} value={project.name} onChange={(value) => handleChange("name", value)} error={errors["name"]} />
      <Form.InputText label={"Project Description"} value={project.description} onChange={(value) => handleChange("description", value)} error={errors["description"]} />

      {isFocused ? (
        <Calendar
          current={project.dueDate}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            handleChange("dueDate", day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, disableTouchEvents: true },
          }}
        />
      ) : null}

      <Text style={styles.error}> {errors["dueDate"]}</Text>
    </Form>
  );
};

export default ProjectForm;

const styles = StyleSheet.create({
  error: {
    fontSize: 15,
    color: "red",
  },
});
