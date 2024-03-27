import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "./Icons";

const StartPauseButtons = {};

const Normal = ({ isStart, handleStartButton, handleStopButton }) => {
  return (
    <>
      {!isStart ? (
        <TouchableOpacity
          style={styles.timerButton}
          onPress={handleStartButton}
        >
          <Icons.Play />
          <Text style={styles.timerButtonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.timerButton} onPress={handleStopButton}>
          <Text style={styles.timerButtonText}>Pause</Text>
          <Icons.Pause />
        </TouchableOpacity>
      )}
    </>
  );
};

const OverTime = ({ isStart, handleStartButton, handleStopButton }) => {
  return (
    <>
      {!isStart ? (
        <TouchableOpacity
          style={styles.timerButtonOverTime}
          onPress={handleStartButton}
        >
          <Text style={styles.timerTextOvertime}>Start Overtime</Text>
          <Icons.AddIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.timerButtonOverTime}
          onPress={handleStopButton}
        >
          <Text style={styles.timerTextOvertime}>Pause OverTime</Text>
          <Icons.Pause />
        </TouchableOpacity>
      )}
    </>
  );
};

StartPauseButtons.Normal = Normal;
StartPauseButtons.OverTime = OverTime;

export default StartPauseButtons;

const styles = StyleSheet.create({
  timerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 5,
    marginTop: 20,
    width: "100%",
    height: "14%",
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderColor: "black",
    backgroundColor: "white",
  },
  timerButtonText: {
    fontSize: 20,
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
});
