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
          <Icons.PlayArrow color="#D5555D" />
          <Text style={styles.timerTextOvertime}>Start Overtime</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.timerButtonOverTime}
          onPress={handleStopButton}
        >
          <Icons.Pause color="#D5555D" />
          <Text style={styles.timerTextOvertime}>Pause OverTime</Text>
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
    marginTop: 50,
    marginBottom: 20,
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
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 90,
    width: "80%",
    height: "20%",
    borderRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 6,
    borderColor: "#D5555D",
    backgroundColor: "#FFB9BD",
  },
  timerTextOvertime: {
    fontSize: 18,
  },
});
