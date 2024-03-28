// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// React Native Countdown timer code, https://www.npmjs.com/package/react-native-countdown-circle-timer
// React Timer, https://github.com/leejaehyup/react-native-timestamp-timer-hooks/blob/master/example/src/Timer.tsx

// Linear Gradient Background https://docs.expo.dev/versions/latest/sdk/linear-gradient/

// -----------------------------------------------------

import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useTimer } from "react-native-timestamp-timer-hooks";
import { ProjectContext } from "../../context/ProjectContext";
import HeaderCard from "../../UI/HeaderCard";
import { CompleteButtonButton } from "../../UI/CompleteButton";
import CompletedStats from "../../UI/CompletedStats";
import StartPauseButtons from "../../UI/StartPauseButtons";
import MyCountdownCircleTimer from "../../UI/MyCountdownCircleTimer";
import Vibrate from "../../util/Vibrate";
import MyCounter from "../../UI/MyCounter";
import Task from "../../classes/Task";
import Icons from "../../UI/Icons";
import GetCompletedStatus from "../../util/GetCompletedStatus";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";

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
  }

  // console.log(`Is this object Frozen( cant be changed) ==== ${Object.isFrozen(task)}`); // I HATE CONTEXT>>>>> WHY IS IT FROZEN ON LOADING!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // State ----------------------------
  const [updatedTask, setUpdatedTask] = useState(task);
  const [countdownTime, setCountdownTime] = useState(loadCountdownTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTime, setActualTime] = useState(updatedTask.actualTime);
  const [completedStatus, setCompletedStatus] = useState(
    updatedTask.completedStatus
  );
  console.log(updatedTask);
  const [backgroundSound, setBackgroundSound] = useState();

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

  useEffect(() => {
    if (updatedTask.completedStatus === 4) {
      setUpdatedTask({ ...updatedTask });
      handleModifyTask(project.id, updatedTask);
    }
  }, []);

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

  const confettiRef = useRef(null);
  function triggerConfetti() {
    confettiRef.current?.play(0);
    console.log(confettiRef.current);
  }

  const hasCompletedTask = () => {
    console.log("Well done!");
    updatedTask.completedStatus = 3;
    setUpdatedTask({ ...updatedTask, ["completedStatus"]: 3 });

    // completed successfully
    triggerConfetti();
    setCompletedStatus(3);
    console.log(JSON.stringify(updatedTask) + " completed successfully");
    handleModifyTask(project.id, updatedTask);
  };

  const needsOvertime = () => {
    console.log("overtime!!");
    setUpdatedTask({ ...updatedTask, ["completedStatus"]: 4 });
    setCompletedStatus(4);
    updatedTask.completedStatus = 4;
    handleModifyTask(project.id, updatedTask);
    // task is in overtime mode
  };

  const handleCountdownOver = () => {
    Vibrate.pulse();
    setIsPlaying(false);
    Alert.alert("Time is up!", `Have you completed the task?`, [
      {
        text: "No",
        onPress: () => {
          updatedTask.actualTime = updatedTask.actualTime + 1;
          needsOvertime();
        },
      },
      {
        text: "Yes",
        onPress: () => {
          updatedTask.actualTime = updatedTask.actualTime + 1;
          hasCompletedTask();
          navigation.goBack();
        },
      },
    ]);
  };

  async function playSound() {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./../../../../assets/HeliumTrackTribe.mp3"),
        { shouldPlay: true }
      );
      setBackgroundSound(sound);
      console.log("Playing Sound");
    } catch (error) {
      console.log(error, "Error playing sound");
    }
  }

  useEffect(() => {
    return () => {
      if (backgroundSound) {
        console.log("Unloading Sound");
        backgroundSound.unloadAsync();
      }
    };
  }, [backgroundSound]);

  // View -----------------------------
  return (
    <View style={{ flex: 1 }}>
      <HeaderCard
        title={`${task.name} ${task.id}`}
        description={task.description}
        time={`Status: ${GetCompletedStatus(updatedTask.completedStatus)}`}
        backgroundColor="white"
      />
      {completedStatus !== 3 ? (
        <View style={styles.body}>
          <>
            {completedStatus !== 4 ? (
              <MyCountdownCircleTimer
                isPlaying={isPlaying}
                countdownTime={countdownTime}
                updatedTask={updatedTask}
                setActualTime={setActualTime}
                actualTime={actualTime}
                setUpdatedTask={setUpdatedTask}
                handleCountdownOver={handleCountdownOver}
              />
            ) : (
              <MyCounter counter={counter} />
            )}

            {completedStatus === 4 ? (
              <StartPauseButtons.OverTime
                isStart={isStart}
                handleStartButton={start}
                handleStopButton={stop}
              />
            ) : (
              <StartPauseButtons.Normal
                isStart={isPlaying}
                handleStartButton={handleStartTimer}
                handleStopButton={handleStopTimer}
              />
            )}
            <TouchableOpacity
              style={styles.playSoundButton}
              onPress={playSound}
            >
              <Icons.Music color="white" />
              <Text style={styles.playSoundButtonText}>
                Play Background Sound
              </Text>
            </TouchableOpacity>
            <CompleteButtonButton
              handleComplete={hasCompletedTask}
              text={"Complete Task"}
            />
            <LottieView
              ref={confettiRef}
              source={require("./../../../../assets/confetti.json")}
              autoPlay={false}
              loop={false}
              style={styles.lottie}
              resizeMode="cover"
            />
          </>
        </View>
      ) : (
        <CompletedStats.TaskCompletedStats task={task} />
      )}
    </View>
  );
};

export default ViewTask;

const styles = StyleSheet.create({
  body: {
    //gap: 20,
    alignItems: "center",
  },
  playSoundButton: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#1D2F6F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  playSoundButtonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
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
