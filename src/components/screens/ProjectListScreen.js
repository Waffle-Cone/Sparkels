// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// Fonts documentation https://docs.expo.dev/develop/user-interface/fonts/

// Data Filter when pressing buttons https://codesandbox.io/p/sandbox/data-filter-when-pressing-buttons-react-native-iszf2?file=%2Fsrc%2FApp.js

// -----------------------------------------------------

import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import SearchBar from "../UI/SearchBar.js";
import ProjectList from "../entity/project/ProjectList";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const ProjectListScreen = ({ navigation }) => {
  // Initialisations ------------------
  const [fontsLoaded] = useFonts({
    AnybodyBold: require("./../../../assets/fonts/Anybody-Bold.ttf"),
    AnybodyRegular: require("./../../../assets/fonts/Anybody-Regular.ttf"),
  });

  // State ---------------------------
  const { projects } = useContext(ProjectContext);
  const [search, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  //console.log(JSON.stringify(projects));

  // Handlers -------------------------
  const handleSearch = (search) => {
    setSearch(search);
    if (search != null) {
      setSearchResults(
        projects.filter((project) => {
          return project.name.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  };

  //passing also the project object clicked
  const gotoTaskListScreen = (project) => {
    navigation.navigate("TaskListScreen", { project });
    setSearch(null);
    Keyboard.dismiss();
  };

  // View -----------------------------
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/notebookHeader.png")}
        style={styles.notebook}
      />
      <View style={styles.notebookBorder}>
        <Text style={styles.h1}>Your Projects</Text>

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity style={styles.todoButton}>
            <Text style={styles.h2}>To do</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completedButton}>
            <Text style={styles.h2}>Completed</Text>
          </TouchableOpacity>
        </View>

        <SearchBar
          placeholder={"Project name"}
          value={search}
          onChange={handleSearch}
        />
        {!search ? (
          <ProjectList projects={projects} onPress={gotoTaskListScreen} />
        ) : (
          <ProjectList projects={searchResults} onPress={gotoTaskListScreen} />
        )}
      </View>
    </View>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 95,
    backgroundColor: "#8390FA",
  },
  notebook: {
    position: "absolute",
    alignSelf: "center",
    height: "8%",
    width: "100%",
    top: 95,
    zIndex: 2,
  },
  notebookBorder: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    margin: 5,
    paddingTop: 55,
    paddingBottom: 50,
    backgroundColor: "white",
    zIndex: 1,
    marginTop: 20,
  },
  h1: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 24,
    color: "black",
    fontFamily: "AnybodyBold",
    fontWeight: "bold",
  },
  h2: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    fontFamily: "AnybodyRegular",
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 10,
  },
  todoButton: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "#607C9E",
    borderWidth: 1,
    backgroundColor: "#C2E7E3",
    padding: 15,
    //flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  completedButton: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "#607C9E",
    borderWidth: 1,
    backgroundColor: "#C2E7E3",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
