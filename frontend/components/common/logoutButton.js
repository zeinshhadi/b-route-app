import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

const LogoutButton = ({ children, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>{children}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    padding: 10,
    paddingHorizontal: 50,
    backgroundColor: Colors.primary500,
    width: "80%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary500,
  },
  logoutButtonText: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
