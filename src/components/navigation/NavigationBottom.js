import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProjectListScreen from "../screens/ProjectListScreen";
import Icons from "../UI/Icons";
import AddProjectScreen from "../screens/AddProjectScreen";

const Tab = createBottomTabNavigator();

const CustomTabLabel = ({ label, focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
    <Text style={{ color: focused ? "#24325B" : "#BCBCBC" }}>{label}</Text>
  </View>
);

const NavigationBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          backgroundColor: "#ffffff",
          borderRadius: 10,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="Project"
        component={ProjectListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icons.Home color={focused ? "#24325B" : "#BCBCBC"} />
            </View>
          ),
          tabBarLabel: ({ focused }) => <CustomTabLabel label="Project" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="AddProject"
        component={AddProjectScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icons.Add color={focused ? "#24325B" : "#BCBCBC"} />
            </View>
          ),
          tabBarLabel: ({ focused }) => <CustomTabLabel label="Add Project" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationBottom;
