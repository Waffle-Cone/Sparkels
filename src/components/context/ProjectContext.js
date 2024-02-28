import { useState, useEffect, createContext } from "react";
import { initialProjects } from "../data/projects";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Initialisations ------------------

  // State ----------------------------
  const [projects, setProjects] = useState(initialProjects);
  // Handlers -------------------------
  const saveProjects = async () => {
    console.log("SAVING:", projects);
    try {
      await AsyncStorage.setItem("projects", JSON.stringify(projects));
    } catch (error) {
      console.log("Failed to save project to AsyncStorage", error);
    }
  };

  useEffect(() => {
    saveProjects();
  }, [projects]);

  const loadProjects = async () => {
    try {
      const storedProjects = await AsyncStorage.getItem("projects");
      console.log("LOADED:", storedProjects);
      if (storedProjects !== null) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(initialProjects);
      }
    } catch (error) {
      console.log("Failed to load project to AsyncStorage", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAdd = async (newProject) => {
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
  };
  // View -----------------------------
  return (
    <ProjectContext.Provider value={{ projects, handleAdd }}>
      {children}
    </ProjectContext.Provider>
  );
};
