import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RadionButtonSet from "./RadionButtonSet";

const ToggleDateTimePicker = ({ onButtonNo, onButtonYes, radioButtonNo, radioButtonYes, breakTimeText, breakTimeStamp, handleChange }) => {
  return (
    <>
      <RadionButtonSet label={"Turn on break time reminders?"} onPress={[onButtonNo, onButtonYes]} state={[radioButtonNo, radioButtonYes]} />

      {radioButtonYes ? (
        <>
          <Text style={styles.radioItemLabel}>Every: {breakTimeText}</Text>
          <DateTimePicker
            value={new Date(breakTimeStamp)}
            minuteInterval={5}
            mode={"countdown"}
            display="spinner"
            onChange={(value) => handleChange("breakTime", value.nativeEvent.timestamp)}
          />
        </>
      ) : null}
    </>
  );
};

export default ToggleDateTimePicker;

const styles = StyleSheet.create({});
