import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

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
    backgroundColor: Colors.cardColor,
    height: 40,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputSearchDesign: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
