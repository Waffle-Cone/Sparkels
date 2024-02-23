import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigationBottom from "./src/components/navigation/NavigationBottom";
import { StyleSheet, Text, View } from "react-native";
import AddProjectScreen from "./src/components/screens/AddProjectScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProjectListScreen"
          component={NavigationBottom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProjectScreen"
          component={AddProjectScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
