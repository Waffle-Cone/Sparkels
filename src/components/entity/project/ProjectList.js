import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icons from "../../UI/Icons";
import { ScrollView } from "react-native-gesture-handler";

const ProjectList = ({ projects, onPress }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return projects.map((project) => {
    return (
      <TouchableOpacity key={project.id} onPress={() => onPress(project)}>
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
              : styles.projectContainer
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
  });
};

export default ProjectList;

const styles = StyleSheet.create({
  projectContainer: {
    borderRadius: 10,
    borderColor: "#484F8A",
    borderBottomWidth: 6,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    backgroundColor: "#D8DCFF",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectCompleted: {
    backgroundColor: "red",
  },
  projectDetails: {
    flex: 1,
  },
});
