import { useState, useEffect, createContext } from "react";
import { initialProjects } from "../data/projects";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Initialisations ------------------

  // State ----------------------------
  const [projects, setProjects] = useState(initialProjects);

  // Handlers -------------------------
  const loadProjects = async () => {
    console.log("load");

    try {
      const storedProjects = await AsyncStorage.getItem("projects");
      if (storedProjects !== null) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(initialProjects);
      }
    } catch (error) {
      console.log("Failed to load project to AsyncStorage", error);
    }
  };

  const saveProjects = async () => {
    try {
      await AsyncStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
      console.log("Failed to save project to AsyncStorage", error);
    }
  };
  useEffect(() => {
    loadProjects();
  }, []);
  useEffect(() => {
    console.log("saved");
    saveProjects();
  }, [projects]);

  const handleAdd = async (newProject) => {
    const updatedProjects = [...projects, newProject];
    console.log(updatedProjects);

    setProjects(updatedProjects);
  };

  const handleModify = async (updatedProject) => {
    const modifiedProjects = projects.map((project) => (project.id === updatedProject.id ? updatedProject : project));
    setProjects(modifiedProjects);
  };

  const handleDelete = async (projectId) => {
    const updatedProjects = projects.filter((project) => project.id !== projectId);
    setProjects(updatedProjects);
  };

  const handleAddTask = async (projectId, task) => {
    const project = projects.find((project) => project.id === projectId);
    project.tasks = [...project.tasks, task];
    handleModify(project);
  };
  const handleModifyTask = async (projectId, updatedTask) => {
    const project = projects.find((project) => project.id === projectId);
    let newProjectTasks = project.tasks.map((task) => (task.id == updatedTask.id ? updatedTask : task));
    project.tasks = newProjectTasks;
    handleModify(project);
  };

  // View -----------------------------
  return <ProjectContext.Provider value={{ projects, handleAdd, handleDelete, handleModify, handleAddTask, handleModifyTask }}>{children}</ProjectContext.Provider>;
};
