import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icons from "../../UI/Icons";

const ProjectList = ({ projects, onPress }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return projects.map((project) => {
    return (
      <TouchableOpacity key={project.id} onPress={() => onPress(project)}>
        <View style={styles.projectContainer}>
          <View style={styles.projectDetails}>
            <Text>Project name: {project.name}</Text>
            <Text>Description: {project.description}</Text>
            <Text>Due date: {project.dueDate}</Text>
          </View>
          <Icons.ArrowRight />
        </View>
      </TouchableOpacity>
    );
  });
};

export default ProjectList;

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 10,
    borderColor: "#607C9E",
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#C7DCF5",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectDetails: {
    flex: 1,
  },
});
