import { Alert, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Vibration } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useTimer, useCountdown } from "react-native-timestamp-timer-hooks";
import { formatTimeString } from "../../util/formatTimerString";
import Icons from "../../UI/Icons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ProjectContext } from "../../context/ProjectContext";
import HeaderCard from "../../UI/HeaderCard";

const ViewTask = ({ navigation, task, project }) => {
  // Initialisations ------------------
  const { handleModifyTask } = useContext(ProjectContext);
  let loadCountdownTime = 0;
  let overtimeClock = 0;
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
    overtimeClock = task.actualTime - task.goalTime;
    overtimeClock;
    // loadCountdownTime = 0;
    console.log(` loaded countdown time${loadCountdownTime}`);
  }

  // console.log(`Is this object Frozen( cant be changed) ==== ${Object.isFrozen(task)}`); // I HATE CONTEXT>>>>> WHY IS IT FROZEN ON LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // State ----------------------------
  const [updatedTask, setUpdatedTask] = useState(task);

  const [countdownTime, setCountdownTime] = useState(loadCountdownTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(updatedTask.actualTime);
  const [completedStatus, setCompletedStatus] = useState(updatedTask.completedStatus);
  console.log(updatedTask);

  //the ovettime timer
  const { counter, start, stop, reset, isStart } = useTimer({
    from: overtimeClock * 1000 + 34,
    interval: 1000,
  });

  //I need to skip initial page render so that task does not increment on page load
  const hasPageRendered = useRef(false);

  useEffect(() => {
    if (hasPageRendered.current) {
      setActualTime(actualTime + 1);
      setUpdatedTask({ ...updatedTask, ["actualTime"]: actualTime + 1 });
      handleModifyTask(project.id, updatedTask);
    }

    hasPageRendered.current = true;
  }, [counter]);

  useEffect(() => {
    handleModifyTask(project.id, updatedTask);
  }, [actualTime]);

  // Handlers -------------------------
  const handleStartTimer = () => {
    if (updatedTask.completedStatus === 1) {
      Alert.alert("Start Task", `Are you sure you want to start?`, [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            setUpdatedTask({ ...updatedTask, ["completedStatus"]: 2 });
            setIsPlaying(true);
            setCompletedStatus(2);
            // task has started but not completed yet
          },
        },
      ]);
    } else if (updatedTask.completedStatus !== 4) {
      setUpdatedTask({ ...updatedTask, ["completedStatus"]: 2 });
      setIsPlaying(true);
      setCompletedStatus(2);
      // task has started but not completed yet
    }
  };
  const handleStopTimer = () => {
    setIsPlaying(false);
    console.log(actualTime);
    console.log(updatedTask);
  };
  const hasCompletedTask = () => {
    console.log("Well done!");
    updatedTask.completedStatus = 3;
    // completed successfully
    setCompletedStatus(3);
    console.log(updatedTask.completedStatus);
    handleModifyTask(project.id, updatedTask);
    navigation.goBack();
  };

  const needsOvertime = () => {
    console.log("overtime!!");
    setUpdatedTask({ ...updatedTask, ["completedStatus"]: 4 });
    setCompletedStatus(4);
    updatedTask.completedStatus = 4;
    handleModifyTask(project.id, updatedTask);
    // task is in overtime mode
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
      {
        text: "No",
        onPress: () => {
          updatedTask.actualTime = updatedTask.actualTime + 1;
          needsOvertime();
        },
      },
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
    <View>
      <HeaderCard title={`${task.name} ${task.id}`} description={task.description} time={`Status: ${updatedTask.completedStatus}`} />
      {completedStatus !== 3 ? (
        <View style={styles.body}>
          <>
            {completedStatus !== 4 ? (
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
                      <Text>{handleCountdownText(remainingTime)}</Text>
                    </View>
                  );
                }}
              </CountdownCircleTimer>
            ) : (
              <Text style={styles.counter}>{formatTimeString(counter)[0]}</Text>
            )}

            {completedStatus === 4 ? (
              <>
                {!isStart ? (
                  <TouchableOpacity style={styles.timerButtonOverTime} onPress={start}>
                    <Text style={styles.timerTextOvertime}>Start Overtime</Text>
                    <Icons.AddIcon />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.timerButtonOverTime} onPress={stop}>
                    <Text style={styles.timerTextOvertime}>Pause OverTime</Text>
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

            <TouchableOpacity style={styles.completeTask} onPress={hasCompletedTask}>
              <Text style={styles.textCompleteTask}>Complete Task</Text>
            </TouchableOpacity>
          </>
        </View>
      ) : (
        <View style={styles.taskInfoContainer}>
          <View style={styles.taskInfo}>
            <Text style={styles.taskInfoText}>Finished Task in: {formatTimeString(task.actualTime * 1000)[0]}</Text>
            <Text style={styles.taskInfoText}>Goal Time: {formatTimeString(task.goalTime * 1000)[0]}</Text>
          </View>
          <View style={styles.completionBanner}>
            <Text style={styles.completionText}>Task has been completed</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ViewTask;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: "red",
  },

  //Countdown Timer
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

  //stop watch
  stopWatchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  //counter
  counter: {
    padding: 20,
  },

  //bottom button
  completeTask: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 390,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#33d436",
    backgroundColor: "white",
  },
  textCompleteTask: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#33d436",
    paddingVertical: 8,
  },
  // task info when completed
  taskInfoContainer: {
    height: 200,
    flexDirection: "column",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: "#33d436",
  },
  completionBanner: {
    height: 100,
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#33d436",
    borderRadius: 10,
    borderColor: "#0fb811",
    alignItems: "center",
    justifyContent: "center",
  },
  completionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskInfo: {
    flex: 1,
    gap: 30,
  },
  taskInfoText: {
    fontSize: 16,
    color: "black",
  },
});
