import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from "../../UI/Icons";
import FormatTimeString from "../../util/FormatTimeString";

const TaskItem = ({ item, project, goToModifyTask, requestDeleteTask }) => {
  return (
    <View style={styles.taskContentContainer}>
      <View style={styles.taskTextContainer}>
        <Text style={{ fontWeight: "bold", color: "black" }}>
          {item.name} {item.id}
        </Text>
        <Text>{item.description}</Text>
        <Text>Time: {FormatTimeString.displayTaskTime(item.goalTimeStamp)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => goToModifyTask(item)}>
          <Icons.Edit />
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={() => requestDeleteTask(project.id, item.id)}>
          <Icons.Delete />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
