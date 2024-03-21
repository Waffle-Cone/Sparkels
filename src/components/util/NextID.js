import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NextID = {};

//find max id number and add .1 for new task id
const task = (project) => {
  let iDList = [];
  project.tasks.map((task) => {
    iDList.push(task.id);
  });
  const max = Math.max(...iDList);
  let newID = max + 0.1;
  if (project.tasks.length === 0) {
    newID = project.id;
  }

  return Math.round(newID * 1000) / 1000;
};

//find max id number and add 1 for new task id
const project = (projects) => {
  let iDList = [];
  projects.map((project) => {
    iDList.push(project.id);
  });
  const max = Math.max(...iDList);
  let newID = max + 1;
  if (projects.length === 0) {
    newID = 1;
  }
  return newID;
};

NextID.task = (project) => task(project);
NextID.project = (projects) => project(projects);

export default NextID;
