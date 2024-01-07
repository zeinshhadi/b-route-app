import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const SearchBar = () => {
  const [searchText, setSearchText] = useState();
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.inputSearchDesign}
        placeholder="Search"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    height: 40,
    marginTop: 30,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputSearchDesign: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
