// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// React Native Countdown timer code, https://www.npmjs.com/package/react-native-countdown-circle-timer

// -----------------------------------------------------

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  CountdownCircleTimer,
  useCountdown,
} from "react-native-countdown-circle-timer";
import FormatTimeString from "../util/FormatTimeString";

const MyCountdownCircleTimer = ({
  isPlaying,
  countdownTime,
  updatedTask,
  setActualTime,
  actualTime,
  setUpdatedTask,
  handleCountdownOver,
}) => {
  return (
    <CountdownCircleTimer
      style={styles.roundCircle}
      isPlaying={isPlaying}
      duration={countdownTime}
      colors={["#1D2F6F", "#8390FA", "#FAC748", "#7AC0B8"]}
      strokeWidth={40}
      trailStrokeWidth={50}
      trailColor="#EAEAFB"
      size={300}
      colorsTime={[
        updatedTask.goalTime * 0.75,
        updatedTask.goalTime * 0.5,
        updatedTask.goalTime * 0.25,
        0,
      ]}
      onUpdate={() => {
        setActualTime(actualTime + 1);
        setUpdatedTask({ ...updatedTask, ["actualTime"]: actualTime });
      }}
      onComplete={() => {
        handleCountdownOver();
      }}
    >
      {({ remainingTime }) => {
        return (
          <View style={styles.stopWatchContainer}>
            <Text style={styles.textLabel}>Remaining Time:</Text>
            <Text style={styles.textCountdown}>
              {FormatTimeString.countdown(remainingTime)}
            </Text>
          </View>
        );
      }}
    </CountdownCircleTimer>
  );
};

export default MyCountdownCircleTimer;

const styles = StyleSheet.create({
  //stop watch
  stopWatchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  textLabel: {
    fontSize: 18,
  },
  textCountdown: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
