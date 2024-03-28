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
    backgroundColor: "#E3E8ED",
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 1,
  },
});

export default SearchLayout;
