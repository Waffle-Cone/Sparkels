import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Icons from "../../UI/Icons";

const ViewTask = ({ task }) => {
  // Initialisations ------------------
  if (task.isCompleted) {
    console.log("already completed");
  } else {
    console.log("lets start");
  }

  let hours = 5400 / 3600;
  console.log("hours: " + Math.trunc(hours));
  let minutes = (hours % 1) * 60;
  console.log("minutes: " + minutes);

  // State ----------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(0);
  // Handlers -------------------------
  const handleStartTimer = () => {
    setIsPlaying(true);
  };
  const handleStopTimer = () => {
    setIsPlaying(false);
    console.log(actualTime);
  };
  const hasCompletedTask = () => {
    console.log("Well done!");
  };

  const needsOvertime = () => {
    console.log("overtime!!");
  };
  const handleCountdownOver = () => {
    console.log("overtime!!");
    Alert.alert("Time is up!", `Have you completed the task?`, [{ text: "No" }, { text: "Yes", onPress: hasCompletedTask }]);
  };

  const handleCountdownText = (remainingTime) => {
    let breakText = ``;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    if (remainingTime >= 3600) {
      hours = remainingTime / 3600;
      minutes = remainingTime;
      breakText = `${hours} Hour(s) and ${minutes} Minute(s)`;
    } else if (remainingTime >= 60) {
      breakText = `${minutes} Minute(s)`;
    } else {
      breakText = `${seconds} Seconds`;
    }
  };
  // View -----------------------------
  return (
    <SafeAreaView>
      <Text>ViewTask</Text>

      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={3}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[task.goalTime * 0.75, task.goalTime * 0.5, task.goalTime * 0.25, 0]}
        onUpdate={() => {
          setActualTime(actualTime + 1);
        }}
        onComplete={() => {
          handleCountdownOver();
        }}
      >
        {({ remainingTime }) => {
          return (
            <View style={styles.timerContainer}>
              <Text>{remainingTime}</Text>
              <Text>{remainingTime}</Text>
            </View>
          );
        }}
      </CountdownCircleTimer>
      {!isPlaying ? (
        <TouchableOpacity style={styles.timerButton} onPress={handleStartTimer}>
          <Text style={styles.timerText}>Start</Text>
          <Icons.AddIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.timerButton} onPress={handleStopTimer}>
          <Text style={styles.timerText}>Pause</Text>
          <Icons.AddIcon />
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
  },
});
