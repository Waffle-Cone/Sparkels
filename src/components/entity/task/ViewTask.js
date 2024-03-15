import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Vibration } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useTimer, useCountdown } from "react-native-timestamp-timer-hooks";
import { formatTimeString } from "../../util/formatTimerString";
import Icons from "../../UI/Icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ProjectContext } from "../../context/ProjectContext";

const ViewTask = ({ navigation, task, project }) => {
  // Initialisations ------------------
  const { handleModifyTask } = useContext(ProjectContext);

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
    //console.log("Overtime");
    loadCountdownTime = task.actualTime - task.goalTime;
    console.log(loadCountdownTime);
  }
  console.log(task);

  // State ----------------------------
  const [countdownTime, setCountdownTime] = useState(loadCountdownTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(task.actualTime);
  const [completedStatus, setCompletedStatus] = useState(task.completedStatus);

  //the ovettime timer
  const { counter, start, stop, reset, isStart } = useTimer({
    from: countdownTime * 1000,
    interval: 1000,
  });

  //I need to skip initial page render so that task does not increment on page load
  const hasPageRendered = useRef(false);

  useEffect(() => {
    if (hasPageRendered.current) {
      task.actualTime = task.actualTime + 1;
      console.log("heyo");
    }

    hasPageRendered.current = true;
  }, [counter]);

  // do this stuff when user exists page
  React.useEffect(() => {
    const newPage = navigation.addListener("beforeRemove", () => {
      console.log("goodbye");
      console.log(task);
      handleModifyTask(project.id, task);
    });
    return newPage;
  }, [navigation]);

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
    // completed successfully
    setCompletedStatus(3);
    navigation.goBack();
  };

  const needsOvertime = () => {
    console.log("overtime!!");
    task.completedStatus = 4;
    // task is in overtime mode
    setCompletedStatus(4);
  };

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [1 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS];

  const vibratePhone = () => {
    Vibration.vibrate(PATTERN);
  };

  const handleCountdownOver = () => {
    vibratePhone();
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>ViewTask</Text>
        <Text>Task name: {task.name}</Text>
        <Text>Description: {task.description}</Text>
      </View>

      {completedStatus !== 3 ? (
        <>
          {completedStatus !== 4 ? (
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={countdownTime}
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
          ) : (
            <Text>{formatTimeString(counter)[0]}</Text>
          )}

          {completedStatus === 4 ? (
            <>
              {!isStart ? (
                <TouchableOpacity style={styles.timerButtonOverTime} onPress={start}>
                  <Text style={styles.timerTextOvertime}>Start Overtime</Text>
                  <Icons.AddIcon />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.timerButton} onPress={stop}>
                  <Text style={styles.timerButtonText}>Pause OverTime</Text>
                  <Icons.Pause />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
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
            </>
          )}

          <View style={styles.buttonTray}>
            <TouchableOpacity style={styles.completeTask} onPress={hasCompletedTask}>
              <Text style={styles.textCompleteTask}>Complete Task</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Task has been completed</Text>
      )}
    </SafeAreaView>
  );
};

export default ViewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#C7DCF5",
    borderRadius: 10,
    borderColor: "#607C9E",
  },
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
