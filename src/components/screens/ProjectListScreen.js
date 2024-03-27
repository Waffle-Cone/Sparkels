// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// Fonts documentation: https://docs.expo.dev/develop/user-interface/fonts/

// Data Filter when pressing buttons:
// https://codesandbox.io/p/sandbox/data-filter-when-pressing-buttons-react-native-iszf2?file=%2Fsrc%2FApp.js
// https://snack.expo.dev/@saachitech/89f0cd?

// -----------------------------------------------------

import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useFonts } from "expo-font";
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

  //<Image
  //        source={require("../../../assets/notebookHeader.png")}
  //        style={styles.notebook}
  //     />

  // State ---------------------------
  const { projects } = useContext(ProjectContext);
  const [filterButton, setFilterButton] = useState("todo");
  const [search, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  //console.log(JSON.stringify(projects));

  // Handlers -------------------------
  useEffect(() => {
    const filteredProjects = projects.filter((project) => {
      if (filterButton === "todo") return !project.isCompleted;
      if (filterButton === "completed") return project.isCompleted;
    });
    setSearchResults(filteredProjects);
    console.log(filterButton);
    console.log(filteredProjects);
  }, [projects, filterButton]);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.notebookBorder}>
          <Text style={styles.h1}>Your Projects</Text>

          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.todoButton,
                filterButton === "todo"
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => setFilterButton("todo")}
            >
              <Text style={styles.h2}>To do</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.completedButton,
                filterButton === "completed"
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => setFilterButton("completed")}
            >
              <Text style={styles.h2}>Completed</Text>
            </TouchableOpacity>
          </View>

          <SearchBar
            placeholder={"Search project"}
            value={search}
            onChange={handleSearch}
          />
          {!search ? (
            <ProjectList projects={projects} onPress={gotoTaskListScreen} />
          ) : (
            <ProjectList
              projects={searchResults}
              onPress={gotoTaskListScreen}
            />
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default ProjectListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 50,
    backgroundColor: "#8390FA",
  },
  notebook: {
    //position: "absolute",
    alignSelf: "center",
    height: "8%",
    width: "100%",
    top: 50,
    zIndex: 1,
  },
  notebookBorder: {
    height: 760,
    borderRadius: 15,
    borderWidth: 1,
    padding: 15,
    margin: 5,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: "white",
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
    padding: 10,
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  completedButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeButton: {
    backgroundColor: "#484F8A",
    //borderWidth: 1,
    //borderColor: "#3D7972",
  },
  inactiveButton: {
    backgroundColor: "#E3E5F2",
  },
});
