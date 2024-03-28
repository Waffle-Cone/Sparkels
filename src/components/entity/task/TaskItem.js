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
        <Text>
          Time: {FormatTimeString.displayTaskTime(item.goalTimeStamp)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => goToModifyTask(item)}
        >
          <Icons.Edit />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => requestDeleteTask(project.id, item.id)}
        >
          <Icons.Minus color="#DE485A" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskContentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    borderColor: "gray",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DE485A",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
