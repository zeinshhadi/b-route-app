import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
const SearchBar = ({ searchText, onSearchChange }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons style={styles.inputSearchIcon} name="search" size={15} color="grey" />
      <TextInput
        style={styles.inputSearchDesign}
        placeholder="Search"
        value={searchText}
        placeholderTextColor="grey"
        onChangeText={(text) => onSearchChange(text)}
      />
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary600,
    height: 40,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  inputSearchDesign: {
    flex: 1,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  inputSearchIcon: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
