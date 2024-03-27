import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationBottom from "./src/components/navigation/NavigationBottom";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { ProjectContext, ProjectProvider } from "./src/components/context/ProjectContext";
import AddProjectScreen from "./src/components/screens/AddProjectScreen";
import TaskListScreen from "./src/components/screens/TaskListScreen";
import AddTaskScreen from "./src/components/screens/AddTaskScreen";
import ModifyProjectScreen from "./src/components/screens/ModifyProjectScreen";
import ModifyTaskScreen from "./src/components/screens/ModifyTaskScreen";
import ViewTaskScreen from "./src/components/screens/ViewTaskScreen";
import SplashScreen from "./src/components/screens/SplashScreen";
import { useContext, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs(["Cannot update a component (`ProjectProvider`) while rendering a different component (`TaskListScreen`)"]); // app works with ths error so lets just skip it

  const [selectedProject, setSelectedProject] = useState(null);

  const getProject = (project) => {
    console.log(`APP ======== ${JSON.stringify(project)}`);
    setSelectedProject(project);
  };

  const headerStyle = (project) => {
    if (project != null) {
      return selectedProject.selectedColor[0];
    } else {
      return "#607C9E";
    }
  };

  return (
    <ProjectProvider getHeaderProject={getProject}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProjectListScreen" component={NavigationBottom} options={{ headerShown: false }} />
          <Stack.Screen name="AddProjectScreen" component={AddProjectScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="TaskListScreen"
            component={TaskListScreen}
            options={{
              title: " ",
              headerStyle: {
                backgroundColor: headerStyle(selectedProject),
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="AddTaskScreen"
            component={AddTaskScreen}
            options={{
              title: " ",
              headerStyle: {
                backgroundColor: "#BACDFF",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ModifyTaskScreen"
            component={ModifyTaskScreen}
            options={{
              title: " ",
              headerStyle: {
                backgroundColor: "#BACDFF",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ModifyProjectScreen"
            component={ModifyProjectScreen}
            options={{
              title: " ",
              headerStyle: {
                backgroundColor: "#C7DCF5",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen name="ViewTaskScreen" component={ViewTaskScreen} options={{ title: " " }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProjectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
