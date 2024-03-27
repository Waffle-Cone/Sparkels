import { useState, useEffect, createContext } from "react";
import { initialProjects } from "../data/projects";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  // Initialisations ------------------

  // State ----------------------------
  const [projects, setProjects] = useState(initialProjects);
  //console.log(`Context ==== ${JSON.stringify(projects)}`);

  // Persistent Storage ---------------
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
    console.log("SAVED");
    saveProjects();
  }, [projects]);

  // Handlers -------------------------
  const updateProjectTasks = (projectId, newTasks) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) => {
        if (project.id === projectId) {
          return { ...project, tasks: newTasks };
        }
        return project;
      });
    });
  };

  const handleAdd = async (newProject) => {
    const updatedProjects = [...projects, newProject];
    console.log(updatedProjects);

    setProjects(updatedProjects);
  };

  const handleModify = async (updatedProject) => {
    const modifiedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(modifiedProjects);
  };

  const handleDelete = async (projectId) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
  };

  const handleAddTask = async (projectId, task) => {
    const project = projects.find((project) => project.id === projectId);
    project.tasks = [...project.tasks, task];
    handleModify(project);
  };
  const handleModifyTask = async (projectId, updatedTask) => {
    const project = projects.find((project) => project.id === projectId);
    let newProjectTasks = project.tasks.map((task) =>
      task.id == updatedTask.id ? updatedTask : task
    );
    project.tasks = newProjectTasks;
    handleModify(project);
  };

  const handleDeleteTask = async (projectId, taskId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId);
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    setProjects(updatedProjects);
    console.log("DELETING", updatedProjects);
  };

  //USE THIS TO GET THE PROJECT. PASS the projectID through props and use this to manipulate the selected project. passing and using the project from props causes state problems.
  // force get the project again to force state to be synced
  const getProject = async (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    return project;
  };

  const getTask = async (projectId, task) => {
    const project = projects.find((project) => project.id === projectId);
    const selectedTask = project.tasks.find((tasky) => tasky.id === task.id);
    return selectedTask;
  };

  const handleCompleteProject = async (projectId) => {
    const selectedProject = getProject(projectId)._j;
    selectedProject.isCompleted = true;
    handleModify(selectedProject);
  };

  // View -----------------------------
  return (
    <ProjectContext.Provider
      value={{
        projects,
        handleAdd,
        handleDelete,
        handleDeleteTask,
        handleModify,
        handleAddTask,
        handleModifyTask,
        updateProjectTasks,
        getProject,
        getTask,
        handleCompleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
