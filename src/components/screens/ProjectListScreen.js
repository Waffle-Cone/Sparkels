// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// Fonts documentation https://docs.expo.dev/develop/user-interface/fonts/

// -----------------------------------------------------

import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import SearchBar from "../UI/SearchBar.js";
import ProjectList from "../entity/project/ProjectList";

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
        <Text style={styles.h2}>To do</Text>
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
    marginTop: 80,
    zIndex: 2,
  },
  notebookBorder: {
    borderRadius: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
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
  projectContainer: {
    borderRadius: 10,
    borderColor: "#607C9E",
    borderBottomWidth: 6,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#C2E7E3",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectDetails: {
    flex: 1,
  },
});
