import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationBottom from "./src/components/navigation/NavigationBottom";
import { StyleSheet, Text, View } from "react-native";
import { ProjectProvider } from "./src/components/context/ProjectContext";
import AddProjectScreen from "./src/components/screens/AddProjectScreen";
import TaskListScreen from "./src/components/screens/TaskListScreen";
import AddTaskScreen from "./src/components/screens/AddTaskScreen";
import ModifyProjectScreen from "./src/components/screens/ModifyProjectScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProjectProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ProjectListScreen" component={NavigationBottom} options={{ headerShown: false }} />
          <Stack.Screen name="AddProjectScreen" component={AddProjectScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TaskListScreen" component={TaskListScreen} options={{ title: " " }} />
          <Stack.Screen name="ModifyProjectScreen" component={ModifyProjectScreen} options={{ title: " " }} />
          <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} options={{ title: " " }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProjectProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
