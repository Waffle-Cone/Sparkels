import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Vibration } from "react-native";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Audio } from "expo-av";

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
    loadCountdownTime = task.goalTime - task.actualTime;
  }

  // State ----------------------------
  const [countdownTime, setCountdownTime] = useState(loadCountdownTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(task.actualTime);
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("../../../../assets/alarm.mp3"));
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  // Handlers -------------------------
  const handleStartTimer = () => {
    if (task.completedStatus === 1) {
      Alert.alert("Start Task", `Are you sure you want to start?`, [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            setIsPlaying(true);
            task.completedStatus = 2; // task has started but not completed yet
          },
        },
      ]);
    } else {
      setIsPlaying(true);
      task.completedStatus = 2; // task has started but not completed yet
    }
  };
  const handleStopTimer = () => {
    setIsPlaying(false);
    console.log(actualTime);
    console.log(task);
  };
  const hasCompletedTask = () => {
    console.log("Well done!");
    task.completedStatus = 3; // completed successfully
    navigation.goBack();
  };

  const needsOvertime = () => {
    console.log("overtime!!");
    task.completedStatus = 4; // task is in overtime mode
  };

  const testVibrate = () => {
    Vibration.vibrate(10000000);
  };

  const handleCountdownOver = () => {
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
      {task.completedStatus !== 3 ? (
        <>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={10}
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
          {!isPlaying ? (
            <TouchableOpacity style={styles.timerButton} onPress={playSound}>
              <Text style={styles.timerText}>Start</Text>
              <Icons.AddIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.timerButton} onPress={handleStopTimer}>
              <Text style={styles.timerText}>Pause</Text>
              <Icons.AddIcon />
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
  timerText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    padding: 8,
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
    borderColor: "green",
    backgroundColor: "white",
    borderBottomWidth: 6,
  },
  textCompleteTask: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
    paddingVertical: 8,
  },
});
