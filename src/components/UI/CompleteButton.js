import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

export const CompleteButtonButton = ({ handleComplete, text }) => {
  return (
    <TouchableOpacity style={styles.completeTask} onPress={handleComplete}>
      <Text style={styles.textCompleteTask}>{text}</Text>
    </TouchableOpacity>
  );
};

export const CompleteProjectButton = ({ project, handleComplete, text }) => {
  // Initialisations ------------------
  let allTasksCompleted = true;
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => {
      if (task.completedStatus !== 3) {
        console.log("not completed");
        allTasksCompleted = false;
      } else console.log("Completed");
    });
  }
  console.log(project.tasks);
  // State ----------------------------
  // Handlers -------------------------
  const handleProjectNotCompleted = () => {
    Alert.alert("Finish Tasks!", `All tasks must be completed for ${project.name}`, [{ text: "Cancel" }]);
  };
  // View -----------------------------

  return (
    <>
      {allTasksCompleted ? (
        <TouchableOpacity style={styles.completeTask} onPress={handleComplete}>
          <Text style={styles.textCompleteTask}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.completeTask, { borderColor: "grey" }]} onPress={handleProjectNotCompleted}>
          <Text style={[styles.textCompleteTask, { color: "grey" }]}>{text}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  //bottom button
  completeTask: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#33d436",
    backgroundColor: "white",
    height: 50,
    minWidth: 350,
  },
  textCompleteTask: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#33d436",
  },
});
