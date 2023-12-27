import React, { Children } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

const Button = ({ children }) => {
  return (
    <>
      <View style={styles.button}>
        <Pressable >
          <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingHorizontal: 50,
    backgroundColor: Colors.primary500,
    width: "50%",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
