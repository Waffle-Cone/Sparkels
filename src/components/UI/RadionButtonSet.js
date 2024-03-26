import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const RadionButtonSet = ({ label, onPress, state }) => {
  return (
    <>
      <Text style={styles.radioItemLabel}>{label}</Text>
      <View style={styles.radioTray}>
        <TouchableOpacity onPress={onPress[0]} style={state[0] ? [styles.radioButtonNo, { backgroundColor: "black" }] : styles.radioButtonNo}>
          <Text style={styles.textRadioNo}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress[1]} style={state[1] ? [styles.radioButtonYes, { backgroundColor: "black" }] : styles.radioButtonYes}>
          <Text style={styles.textRadioYes}>Yes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RadionButtonSet;

const styles = StyleSheet.create({
  radioItemLabel: {
    color: "grey",
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 5,
  },
  radioTray: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    marginBottom: 10,
  },
  radioButtonNo: {
    flexDirection: "row",
    height: 50,
    width: 50,
    borderRadius: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "#DE485A",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonYes: {
    flexDirection: "row",
    height: 50,
    width: 50,
    borderRadius: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "green",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textRadioNo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DE485A",
    paddingVertical: 8,
  },
  textRadioYes: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
    paddingVertical: 8,
  },
  radioSelected: {
    backgroundColor: "red",
  },
});
