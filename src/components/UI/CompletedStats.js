// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// The FormatTimeString https://github.com/leejaehyup/react-native-timestamp-timer-hooks/blob/master/example/src/util.ts

// -----------------------------------------------------
import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import FormatTimeString from "../util/FormatTimeString";
import Icons from "./Icons";
import LottieView from "lottie-react-native";

const CompletedStats = {};

const Stats = ({ totalTime, goalTime, type }) => {
  const confettiRef = useRef(null);

  function triggerConfetti() {
    confettiRef.current?.play(0);
    console.log("confett", confettiRef.current);
  }
  console.log("completed stats");

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.taskInfoContainer}>
        <View style={styles.completionBanner}>
          <Icons.Check />
          <Text style={styles.completionText}>{type} Completed</Text>
        </View>
        <View style={styles.taskInfo}>
          <Text style={styles.taskInfoText}>
            Finished {type} in: {FormatTimeString.counter(totalTime * 1000)[0]}
          </Text>
          <Text style={styles.taskInfoText}>
            Goal Time: {FormatTimeString.counter(goalTime * 1000)[0]}
          </Text>
        </View>
      </View>
      <LottieView
        ref={confettiRef}
        source={require("./../../../assets/confetti.json")}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode="cover"
      />
    </View>
  );
};

const TaskCompletedStats = ({ task }) => {
  return (
    <Stats totalTime={task.actualTime} goalTime={task.goalTime} type={"Task"} />
  );
};

const ProjectCompletedStates = ({ project }) => {
  // Initialisations ------------------
  let totalTimeSpent = 0;
  let theTotalGoalTime = 0;
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => {
      console.log(task);
      totalTimeSpent = totalTimeSpent + task.actualTime;
      theTotalGoalTime = theTotalGoalTime + task.goalTime;
    });
  }
  // View -----------------------------
  return (
    <Stats
      totalTime={totalTimeSpent}
      goalTime={theTotalGoalTime}
      type={"Project"}
    />
  );
};
CompletedStats.TaskCompletedStats = (task) => TaskCompletedStats(task);
CompletedStats.ProjectCompletedStates = (project) =>
  ProjectCompletedStates(project);

export default CompletedStats;

const styles = StyleSheet.create({
  // task info when completed
  container: {
    flex: 1,
    alignItems: "center",
  },
  taskInfoContainer: {
    height: "50%",
    width: "100%",
    flexDirection: "column",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2C9F91",
    backgroundColor: "#D6F0ED",
  },
  completionBanner: {
    gap: 10,
    height: "60%",
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#2C9F91",
    alignItems: "center",
    justifyContent: "center",
  },
  completionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  taskInfo: {
    flex: 1,
    gap: 20,
    paddingVertical: 20,
    paddingBottom: 10,
  },
  taskInfoText: {
    fontSize: 18,
    color: "black",
  },
  lottie: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    pointerEvents: "none",
  },
});
