import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../../UI/Icons";

const ProjectItem = ({ project, onPress }) => {
  console.log(project.selectedColor);
  return (
    <TouchableOpacity onPress={() => onPress(project)}>
      <View
        style={
          project.isCompleted
            ? [
                styles.projectContainer,
                {
                  backgroundColor: "#C2E7E3",
                  borderColor: "#649C95",
                },
              ]
            : [styles.projectContainer, { backgroundColor: project.selectedColor[0], borderColor: project.selectedColor[1] }]
        }
      >
        <View style={styles.projectDetails}>
          <Text>Project name: {project.name}</Text>
          <Text>Description: {project.description}</Text>
          <Text>Due date: {project.dueDate}</Text>
        </View>
        <Icons.ArrowRight />
      </View>
    </TouchableOpacity>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  viewContainer: {
    paddingVertical: 10,
  },
  projectContainer: {
    borderRadius: 10,
    //borderColor: "#484F8A",
    borderBottomWidth: 6,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    //backgroundColor: "#D8DCFF",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectDetails: {
    //flex: 1,
  },
});
