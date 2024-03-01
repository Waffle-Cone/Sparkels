import { Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

const TaskForm = () => {
  return{
    <DateTimePicker value={new Date()} mode={"countdown"} display="spinner" />;
  }
};

export default TaskForm;

const styles = StyleSheet.create({});
