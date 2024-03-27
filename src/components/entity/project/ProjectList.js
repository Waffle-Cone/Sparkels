import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import Icons from "../../UI/Icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ProjectList = ({ projects, onPress }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------

  // View --------------------------------
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        {projects.map((project) => (
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
        ))}
      </View>
    </ScrollView>
  );
};

export default ProjectList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  viewContainer: {
    paddingVertical: 10,
  },
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
    //flex: 1,
  },
});
