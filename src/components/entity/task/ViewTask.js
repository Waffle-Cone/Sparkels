import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Vibration } from "react-native";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import Icons from "../../UI/Icons";

const ViewTask = ({ navigation, task }) => {
  // Initialisations ------------------
  let loadCountdownTime = 0;

  if (task.completedStatus === 1) {
    // Task not started yet
    console.log("lets start");
    loadCountdownTime = task.goalTime;
  } else if (task.completedStatus === 2) {
    // tasks started but not completed
    console.log("already started but not completed");
    loadCountdownTime = task.goalTime - task.actualTime;
  } else if (task.completedStatus === 3) {
    // tasks completed
    console.log("completed!!");
  } else if (task.completedStatus === 4) {
    // task in overtime mode
    console.log("Overtime");
    loadCountdownTime = (task.goalTime - task.actualTime) * -1;
  }

  // State ----------------------------
  const [countdownTime, setCountdownTime] = useState(loadCountdownTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(task.actualTime);
  const [completedStatus, setCompletedStatus] = useState(task.completedStatus);
  const [hideOverTimeButton, setHideOverTimeButton] = useState(true);

  // Handlers -------------------------
  const handleStartTimer = () => {
    if (task.completedStatus === 1) {
      Alert.alert("Start Task", `Are you sure you want to start?`, [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            setIsPlaying(true);
            task.completedStatus = 2;
            setCompletedStatus(2);
            // task has started but not completed yet
          },
        },
      ]);
    } else if (task.completedStatus !== 4) {
      setIsPlaying(true);
      task.completedStatus = 2;
      setCompletedStatus(2);
      // task has started but not completed yet
    } else {
      setIsPlaying(true);
    }
  };
  const handleStopTimer = () => {
    setIsPlaying(false);
    console.log(actualTime);
    console.log(task);
  };
  const hasCompletedTask = () => {
    console.log("Well done!");
    task.completedStatus = 3;
    setCompletedStatus(3);
    // completed successfully
    navigation.goBack();
  };

  const needsOvertime = () => {
    console.log("overtime!!");
    task.completedStatus = 4;
    setCompletedStatus(4);
    // task is in overtime mode
    return { shouldRepeat: true, delay: 1.5 };
  };

  const handleOvertime = () => {
    setCountdownTime(30);
  };

  const testVibrate = () => {
    Vibration.vibrate(10000000);
  };

  const handleCountdownOver = () => {
    setIsPlaying(false);
    Alert.alert("Time is up!", `Have you completed the task?`, [
      { text: "No", onPress: needsOvertime },
      { text: "Yes", onPress: hasCompletedTask },
    ]);
  };

  const handleCountdownText = (remainingTime) => {
    let breakText = ``;
    let minutes = 0;
    let hours = 0;
    if (remainingTime >= 3600) {
      hours = remainingTime / 3600;
      minutes = (hours % 1) * 60;
      breakText = `${Math.trunc(hours)}H: ${Math.trunc(minutes)}M`;
    } else if (remainingTime >= 60) {
      minutes = remainingTime / 60;
      breakText = `${Math.trunc(minutes)} Minute(s)`;
    } else {
      breakText = `${remainingTime} Seconds`;
    }
    return breakText;
  };
  // View -----------------------------
  return (
    <SafeAreaView>
      <Text>ViewTask</Text>
      <Text>Task name: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      {completedStatus !== 3 ? (
        <>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={2}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[task.goalTime * 0.75, task.goalTime * 0.5, task.goalTime * 0.25, 0]}
            onUpdate={() => {
              setActualTime(actualTime + 1);
              task.actualTime = actualTime;
            }}
            onComplete={() => {
              handleCountdownOver();
            }}
          >
            {({ remainingTime }) => {
              return (
                <View style={styles.timerContainer}>
                  <Text>Remaining Time:</Text>
                  <Text>{handleCountdownText(remainingTime)}</Text>
                </View>
              );
            }}
          </CountdownCircleTimer>

          {completedStatus === 4 ? (
            <TouchableOpacity style={styles.timerButtonOverTime} onPress={handleOvertime}>
              <Text style={styles.timerTextOvertime}>Start Overtime</Text>
              <Icons.AddIcon />
            </TouchableOpacity>
          ) : null}

          {hideOverTimeButton}
          {!isPlaying ? (
            <TouchableOpacity style={styles.timerButton} onPress={handleStartTimer}>
              <Text style={styles.timerButtonText}>Start</Text>
              <Icons.PlayArrow />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.timerButton} onPress={handleStopTimer}>
              <Text style={styles.timerButtonText}>Pause</Text>
              <Icons.Pause />
            </TouchableOpacity>
          )}

          <View style={styles.buttonTray}>
            <TouchableOpacity style={styles.completeTask} onPress={hasCompletedTask}>
              <Text style={styles.textCompleteTask}>Complete Task</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Task has been completed </Text>
      )}
    </SafeAreaView>
  );
};

export default ViewTask;

const styles = StyleSheet.create({
  timerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 100,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
  },
  timerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    padding: 8,
  },
  timerButtonOverTime: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: 130,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "red",
    backgroundColor: "white",
  },
  timerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonTray: {
    alignItems: "center",
    justifyContent: "center",
  },
  completeTask: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 390,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "green",
    backgroundColor: "white",
  },
  textCompleteTask: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
    paddingVertical: 8,
  },
});
