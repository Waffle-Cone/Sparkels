import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Icons from "../../UI/Icons";

const ViewTask = ({ task }) => {
  // Initialisations ------------------
  // State ----------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  // Handlers -------------------------
  const handleStartTimer = () => {
    setIsPlaying(true);
  };
  const handleStopTimer = () => {
    setIsPlaying(false);
  };
  console.log(task.goalTime * 0.5);
  // View -----------------------------
  return (
    <SafeAreaView>
      <Text>ViewTask</Text>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={task.goalTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[task.goalTime * 0.75, task.goalTime * 0.5, task.goalTime * 0.25, 0]}
      />
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
});
