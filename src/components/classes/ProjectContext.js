import { useState, createContext } from "react";
import { initialProjects } from "../data/projects";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Initialisations ------------------
  const nextIndex = (list) => {
    console.log(list);
  };

  // State ----------------------------
  const [projects, setProjects] = useState(initialProjects);
  // Handlers -------------------------

  const handleAdd = (newProject) => {
    setProjects([...projects, newProject]);
  };
  // View -----------------------------
  return <ProjectContext.Provider value={{ projects, handleAdd }}>{children}</ProjectContext.Provider>;
};
