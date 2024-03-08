import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useEffect, useState } from "react";
import Task from "../../classes/Task";
import Form from "../../UI/Form";
import { ProjectContext } from "../../context/ProjectContext";

const TaskForm = ({ navigation, submitType, formTitle, project, selectedTask }) => {
  // Initialisations ------------------
  const newTask = new Task();
  const { handleAddTask, handleModifyTask } = useContext(ProjectContext);
  let radioButtonNope = true;
  let radioButtonYup = false;

  if (selectedTask) {
    if (selectedTask.breakTime) {
      radioButtonNope = false;
      radioButtonYup = true;
    }
  }

  // timetamp to seconds converter
  const getSeconds = (value) => {
    const hours = new Date(value).getHours();
    const minutes = new Date(value).getMinutes();

    const minuteSeconds = minutes * 60;
    const hourSeconds = hours * 3600;
    const seconds = minuteSeconds + hourSeconds;

    return seconds;
  };

  // Sting is displayed to user
  const getBreakTimeText = (value) => {
    const hours = new Date(value).getHours();
    const minutes = new Date(value).getMinutes();
    const breakText = `${hours} Hour(s) and ${minutes} Minute(s)`;

    return breakText;
  };

  //find max id number and add 1 for new task id
  const getNextID = () => {
    let iDList = [];
    project.tasks.map((task) => {
      iDList.push(task.id);
    });
    const max = Math.max(...iDList);
    let newID = max + 0.1;
    if (project.tasks.length === 0) {
      newID = project.id;
    }

    return Math.round(newID * 1000) / 1000;
  };

  const errorMessage = {
    name: "Enter task name",
    description: "Enter task description",
    goalTime: "goal time",
    actualTime: "actual time",
    breakTime: "break time",
    goalTimeStamp: "goal time stamp",
    breakTimeStamp: "break time stamp",
  };

  // State ----------------------------
  const [task, setTask] = useState(selectedTask || newTask);
  const [errors, setErrors] = useState(Object.keys(task).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  const [radioButtonNo, setRadioButtonNo] = useState(radioButtonNope);
  const [radioButtonYes, setRadioButtonYes] = useState(radioButtonYup);
  const [goalTimeStamp, setGoalTimeStamp] = useState(task.goalTimeStamp || 1598054400000);
  const [breakTimeStamp, setBreakTimeStamp] = useState(task.breakTimeStamp || 1598052600000);
  const [breakTimeText, setBreakTimeText] = useState(getBreakTimeText(breakTimeStamp));

  useEffect(() => {
    setTask({ ...task, ["goalTime"]: getSeconds(1598054400000), ["goalTimeStamp"]: 1598054400000 });
  }, []);
  // Handlers -------------------------

  const handleChange = (field, value) => {
    if (field === "breakTime") {
      setBreakTimeText(getBreakTimeText(value));
      setTask({ ...task, ["breakTime"]: getSeconds(value), ["breakTimeStamp"]: value });
    } else if (field === "goalTime") {
      setTask({ ...task, ["goalTime"]: getSeconds(value), ["goalTimeStamp"]: value });
    } else {
      setTask({ ...task, [field]: value });
    }
  };

  const handleRadioButtonYes = () => {
    if (radioButtonNo) {
      setRadioButtonNo(false);
    }
    setTask({ ...task, ["breakTime"]: getSeconds(1598052600000), ["breakTimeStamp"]: 1598052600000 });
    setRadioButtonYes(true);
  };
  const handleRadioButtonNo = () => {
    if (radioButtonYes) {
      setRadioButtonYes(false);
    }
    setTask({ ...task, ["breakTime"]: undefined, ["breakTimeStamp"]: undefined });
    setRadioButtonNo(true);
  };

  const checkTask = (task) => {
    console.log(task);
    let isTaskValid = true;
    Object.keys(task).forEach((key) => {
      if (key === "name" || key === "description") {
        if (!task[key]) {
          errors[key] = errorMessage[key];
          isTaskValid = false;
        } else {
          errors[key] = null;
        }
      }
    });
    setErrors({ ...errors });
    return isTaskValid;
  };

  const handleSubmit = () => {
    const check = checkTask(task);
    console.log(errors);
    if (check) {
      if (selectedTask) {
        handleModifyTask(project.id, task);
      } else {
        task.id = getNextID();
        handleAddTask(project.id, task);
      }
      navigation.goBack();
    }
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
        <Text style={styles.itemLabel}>Goal time to finish task?</Text>
        <DateTimePicker
          value={new Date(goalTimeStamp)}
          minuteInterval={1}
          mode={"countdown"}
          display="spinner"
          onChange={(value) => handleChange("goalTime", value.nativeEvent.timestamp)}
        />
        <Text style={styles.radioItemLabel}>Turn on break time reminders?</Text>
        <View style={styles.radioTray}>
          <TouchableOpacity onPress={handleRadioButtonNo} style={radioButtonNo ? [styles.radioButtonNo, { backgroundColor: "black" }] : styles.radioButtonNo}>
            <Text style={styles.textRadioNo}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRadioButtonYes} style={radioButtonYes ? [styles.radioButtonYes, { backgroundColor: "black" }] : styles.radioButtonYes}>
            <Text style={styles.textRadioYes}>Yes</Text>
          </TouchableOpacity>
        </View>

        {radioButtonYes ? (
          <>
            <Text style={styles.radioItemLabel}>Every: {breakTimeText}</Text>
            <DateTimePicker
              value={new Date(breakTimeStamp)}
              minuteInterval={5}
              mode={"countdown"}
              display="spinner"
              onChange={(value) => handleChange("breakTime", value.nativeEvent.timestamp)}
            />
          </>
        ) : null}
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
    marginBottom: 10,
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
  radioSelected: {
    backgroundColor: "red",
  },
});
