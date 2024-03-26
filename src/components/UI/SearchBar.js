// -----------------------------------------------------

// ACKNOWLEDING EXTERNAL CONTENT

// Some of the following code was wholly, or in part, taken or adapted from the following online source(s):

// help with style when pressing button, https://reactnative.dev/docs/pressable

// -----------------------------------------------------

import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import SearchLayout from "../layout/SearchLayout";
import Icons from "./Icons";

const SearchBar = ({ value, onChange, placeholder }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------

  const handleClear = () => {
    onChange(null);
  };
  // View --------------------------------
  return (
    <View style={styles.container}>
      <SearchLayout>
        <Icons.Search />
        <TextInput style={styles.searchBar} placeholder={placeholder} value={value} onChangeText={onChange} />
        {!value ? (
          <Text style={{ width: 25 }}></Text> // placeholder so that the cancel button doesnt shift search input
        ) : (
          <Pressable
            onPress={handleClear}
            style={({ pressed }) => [
              {
                height: pressed ? 1 : 25,
              },
            ]}
          >
            <Icons.SearchCancel />
          </Pressable>
        )}
      </SearchLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  searchBar: {
    height: 50,
    width: "80%",
    fontSize: 15,
  },
});
export default SearchBar;
