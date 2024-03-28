import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "./Icons";

const HeaderCard = ({ title, description, time, onPress, backgroundColor }) => {
  return (
    <View style={[styles.Container, { backgroundColor: backgroundColor }]}>
      <View style={styles.subject}>
        <Text style={styles.h1}>{title}</Text>
        {!onPress ? null : (
          <TouchableOpacity style={styles.editButton} onPress={onPress}>
            <Text style={styles.textEditButton}>Edit</Text>
            <Icons.Edit />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.h2}>Description: {description}</Text>
      <Text style={styles.h2}>{time}</Text>
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  Container: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderBottomWidth: 2,
    backgroundColor: "#C7DCF5",
    borderRadius: 10,
    borderColor: "#607C9E",
  },
  subject: {
    flexDirection: "row",
    //borderWidth: 1,
  },
  h1: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  h2: {
    //paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    color: "black",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 50,
    width: "35%",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#607C9E",
    backgroundColor: "white",
    justifyContent: "center",
  },
  textEditButton: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    paddingVertical: 8,
  },
});
