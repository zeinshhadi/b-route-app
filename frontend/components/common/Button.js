import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

const Button = ({ children, onPress }) => {
  return (
    <>
      <Pressable onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 10,

    backgroundColor: Colors.primary500,
    width: 150,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
