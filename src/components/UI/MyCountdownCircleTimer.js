// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// React Native Countdown timer code, https://www.npmjs.com/package/react-native-countdown-circle-timer

// -----------------------------------------------------

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import FormatTimeString from "../util/FormatTimeString";

const MyCountdownCircleTimer = ({ isPlaying, countdownTime, updatedTask, setActualTime, actualTime, setUpdatedTask, handleCountdownOver }) => {
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={countdownTime}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[updatedTask.goalTime * 0.75, updatedTask.goalTime * 0.5, updatedTask.goalTime * 0.25, 0]}
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
            <Text>Remaining Time:</Text>
            <Text>{FormatTimeString.countdown(remainingTime)}</Text>
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
});
