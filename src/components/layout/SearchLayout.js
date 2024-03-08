import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

const SearchLayout = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 5,
  },
});

export default SearchLayout;
