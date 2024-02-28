import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import Icons from "../UI/Icons";

const TaskListScreen = () => {
  // Initialisations ------------------

  // State ---------------------------
  // Handlers -------------------------
  // View -----------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Tasks</Text>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  h1: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
});
