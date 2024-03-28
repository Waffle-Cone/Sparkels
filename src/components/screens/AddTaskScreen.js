import { SafeAreaView, StyleSheet } from "react-native";
import TaskForm from "../entity/task/TaskForm";

const AddTaskScreen = ({ navigation, route }) => {
  // Initialisations ------------------
  const { selectedProject } = route.params;
  console.log(`Add task screen ${JSON.stringify(selectedProject.tasks)}`);

  //++ getting submition handler from context
  // State ----------------------------
  // Handlers -------------------------
  // View -----------------------------
  return (
    <SafeAreaView style={styles.container}>
      <TaskForm
        navigation={navigation}
        submitType={"Add"}
        formTitle={"Add Task"}
        project={selectedProject}
      />
    </SafeAreaView>
  );
};

export default AddTaskScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BACDFF",
  },
});
