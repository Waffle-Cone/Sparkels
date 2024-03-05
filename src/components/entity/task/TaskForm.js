import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useState } from "react";
import Task from "../../classes/Task";
import Form from "../../UI/Form";
import { ProjectContext } from "../../context/ProjectContext";

const TaskForm = ({ navigation, submitType, formTitle, project }) => {
  // Initialisations ------------------
  const newTask = new Task();
  const { projects, handleAdd, handleModify } = useContext(ProjectContext);

  //find max id number and add 1 for new task id
  const getNextID = () => {
    let iDList = [];
    project.tasks.map((task) => {
      iDList.push(task.id);
    });
    const max = Math.max(...iDList);
    const newID = max + 0.1;
    return Math.round(newID * 1000) / 1000;
  };

  // State ----------------------------
  const [task, setTask] = useState(newTask);
  const [errors, setErrors] = useState(Object.keys(task).reduce((acc, key) => ({ ...acc, [key]: null }), {})); // = [name: null, description: null, dueDate: null, task: null, id: null]

  // Handlers -------------------------

  const getSeconds = (value) => {
    const hours = new Date(value).getHours();
    const minutes = new Date(value).getMinutes();

    const minuteSeconds = minutes * 60;
    const hourSeconds = hours * 3600;
    const seconds = minuteSeconds + hourSeconds;

    console.log(`Hours: ${hours}`);
    console.log(`Minutes: ${minutes}`);

    return seconds;
  };

  const handleChange = (field, value) => {
    if (field === "goalTime") {
      value = getSeconds(value);
      console.log(`The time in seconds: ${value}`);
    }

    setTask({ ...task, [field]: value });
  };

  const handleSubmit = () => {
    console.log(getNextID());
    task.id = getNextID();
    project.tasks.push(task);
    handleModify(project);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // View -----------------------------

  return (
    <View style={styles.taskForm}>
      <Form submitType={submitType} onSubmit={handleSubmit} onCancel={handleCancel} title={formTitle}>
        <Form.InputText label={"Task Name"} value={task.name} onChange={(value) => handleChange("name", value)} error={errors["name"]} />
        <Form.InputText label={"Task Description"} value={task.description} onChange={(value) => handleChange("description", value)} error={errors["description"]} />
        <Text style={styles.itemLabel}>How long to finish task?</Text>
        <DateTimePicker
          value={new Date(1598054400000)}
          minuteInterval={5}
          mode={"countdown"}
          display="spinner"
          onChange={(value) => handleChange("goalTime", value.nativeEvent.timestamp)}
        />
        <Text style={styles.radioItemLabel}>Would you like to take breaks?</Text>
        <View style={styles.radioTray}>
          <TouchableOpacity style={styles.radioButtonNo}>
            <Text style={styles.textRadioNo}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButtonYes}>
            <Text style={styles.textRadioYes}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  taskForm: {
    flex: 1,
    marginBottom: 20,
  },
  itemLabel: {
    color: "grey",
    fontSize: 16,
    marginBottom: 5,
  },
  radioItemLabel: {
    color: "grey",
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 5,
  },
  radioTray: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  radioButtonNo: {
    flexDirection: "row",
    height: 50,
    width: 50,
    borderRadius: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "#DE485A",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonYes: {
    flexDirection: "row",
    height: 50,
    width: 50,
    borderRadius: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "green",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textRadioNo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
    paddingVertical: 8,
  },
  textRadioYes: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
    paddingVertical: 8,
  },
});
