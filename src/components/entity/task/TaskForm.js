import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useEffect, useState } from "react";
import Task from "../../classes/Task";
import Form from "../../UI/Form";
import { ProjectContext } from "../../context/ProjectContext";
import FormatTimeString from "../../util/FormatTimeString";
import ToggleDateTimePicker from "../../UI/ToggleDateTimePicker";
import NextID from "../../util/NextID";

const TaskForm = ({
  navigation,
  submitType,
  formTitle,
  project,
  selectedTask,
}) => {
  // Initialisations ------------------

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

  const newTask = new Task();
  newTask.goalTimeStamp = 1598054400000;
  newTask.goalTime = getSeconds(1598054400000);

  const errorMessage = {
    name: "Enter task name",
    description: "Enter task description",
    goalTime: "goal time",
    actualTime: "actual time",
    breakTime: "break time",
    goalTimeStamp: "goal time stamp",
    breakTimeStamp: "break time stamp",
  };

  // State -----------------------------------------------
  const [task, setTask] = useState(selectedTask || newTask);
  const [errors, setErrors] = useState(
    Object.keys(task).reduce((acc, key) => ({ ...acc, [key]: null }), {})
  );

  const [radioButtonNo, setRadioButtonNo] = useState(radioButtonNope);
  const [radioButtonYes, setRadioButtonYes] = useState(radioButtonYup);
  const [goalTimeStamp, setGoalTimeStamp] = useState(
    task.goalTimeStamp || 1598054400000
  );
  const [breakTimeStamp, setBreakTimeStamp] = useState(
    task.breakTimeStamp || 1598052600000
  );
  const [breakTimeText, setBreakTimeText] = useState(
    FormatTimeString.breakTimeText(breakTimeStamp)
  );

  /*
  useEffect(() => {
    setTask({ ...task, ["goalTime"]: getSeconds(1598054400000), ["goalTimeStamp"]: 1598054400000 });
  }, []);*/
  // Handlers ---------------------------------------------

  const handleChange = (field, value) => {
    if (field === "breakTime") {
      setBreakTimeText(FormatTimeString.breakTimeText(value));
      setTask({
        ...task,
        ["breakTime"]: getSeconds(value),
        ["breakTimeStamp"]: value,
      });
    } else if (field === "goalTime") {
      setTask({
        ...task,
        ["goalTime"]: getSeconds(value),
        ["goalTimeStamp"]: value,
      });
    } else {
      setTask({ ...task, [field]: value });
    }
  };

  const handleRadioButtonYes = () => {
    if (radioButtonNo) {
      setRadioButtonNo(false);
    }
    setTask({
      ...task,
      ["breakTime"]: getSeconds(1598052600000),
      ["breakTimeStamp"]: 1598052600000,
    });
    setRadioButtonYes(true);
  };

  const handleRadioButtonNo = () => {
    if (radioButtonYes) {
      setRadioButtonYes(false);
    }
    setTask({
      ...task,
      ["breakTime"]: undefined,
      ["breakTimeStamp"]: undefined,
    });
    setRadioButtonNo(true);
  };

  const checkTask = (task) => {
    //console.log(task);
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
    //console.log(errors);
    if (check) {
      if (selectedTask) {
        handleModifyTask(project.id, task);
      } else {
        task.id = NextID.task(project);
        handleAddTask(project.id, task);
      }
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // View ------------------------------------------------
  return (
    <View style={styles.taskForm}>
      <Form
        submitType={submitType}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        title={formTitle}
        isTaskPage={true}
      >
        <Form.InputText
          label={"Task Name"}
          value={task.name}
          onChange={(value) => handleChange("name", value)}
          error={errors["name"]}
        />
        <Form.InputText
          label={"Task Description"}
          value={task.description}
          onChange={(value) => handleChange("description", value)}
          error={errors["description"]}
        />
        <Text style={styles.itemLabel}>Goal time to finish task?</Text>
        <DateTimePicker
          value={new Date(goalTimeStamp)}
          minuteInterval={1}
          mode={"countdown"}
          display="spinner"
          onChange={(value) =>
            handleChange("goalTime", value.nativeEvent.timestamp)
          }
        />
        <ToggleDateTimePicker
          onButtonNo={handleRadioButtonNo}
          onButtonYes={handleRadioButtonYes}
          radioButtonNo={radioButtonNo}
          radioButtonYes={radioButtonYes}
          breakTimeText={breakTimeText}
          breakTimeStamp={breakTimeStamp}
          handleChange={handleChange}
        />
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
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
});
