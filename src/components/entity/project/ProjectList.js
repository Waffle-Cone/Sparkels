import { View, StyleSheet, ScrollView } from "react-native";
import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects, onPress }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------

  // View --------------------------------
  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} onPress={onPress} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProjectList;

const styles = StyleSheet.create({});
