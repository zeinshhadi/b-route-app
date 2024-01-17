import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../../utils/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const SearchBar = () => {
  const [searchText, setSearchText] = useState();
  return (
    <View style={styles.searchContainer}>
      <Ionicons style={styles.inputSearchIcon} name="search" size={15} color={Colors.primary600} />
      <TextInput
        style={styles.inputSearchDesign}
        placeholder="Search"
        value={searchText}
        placeholderTextColor={Colors.primary500}
        onChangeText={(text) => setSearchText(text)}
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
    borderWidth: 2,
    borderColor: Colors.primary500,
    height: 40,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  inputSearchDesign: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  inputSearchIcon: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
