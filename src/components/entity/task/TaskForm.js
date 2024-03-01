import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import Task from "../../classes/Task";
import Form from "../../UI/Form";

const TaskForm = ({ project }) => {
  // Initialisations ------------------
  const newTask = new Task();

  //find max id number and add 1 for new task id
  const getNextID = () => {
    let iDList = [];
    project.tasks.map((task) => {
      iDList.push(task.id);
    });
    const max = Math.max(...iDList);
    const newID = max + 1;
    return newID;
  };

  // State ----------------------------
  const [task, setTask] = useState(newTask);
  const [showTimer, setShowTimer] = useState(false);

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

  const handleTest = () => {
    if (showTimer) {
      setShowTimer(false);
    } else {
      setShowTimer(true);
    }
  };

  const handleSubmit = () => {
    //console.log(getNextID());
  };

  // View -----------------------------

  return (
    <View style={styles.taskForm}>
      <DateTimePicker
        value={new Date(1598054400000)}
        minuteInterval={1}
        mode={"countdown"}
        display="spinner"
        onChange={(value) => handleChange("goalTime", value.nativeEvent.timestamp)}
      />

      {showTimer ? <CountdownCircleTimer isPlaying={{}} duration={task.goalTime} colors="#A30000" /> : null}

      <View style={styles.buttonTray}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleTest}>
          <Text style={styles.textDeleteButton}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleSubmit}>
          <Text style={styles.textDeleteButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskForm;

const styles = StyleSheet.create({
  taskForm: {
    flex: 1,
  },
  buttonTray: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  deleteButton: {
    flexDirection: "row",
    height: 50,
    width: 100,
    borderRadius: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "#DE485A",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textDeleteButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
    paddingVertical: 8,
  },
});
