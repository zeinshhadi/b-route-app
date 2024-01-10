import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

const GridComponent = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#B2B2B2" }}
      style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
      <View style={styles.cardGridContainer}>
        <Text style={styles.containerTitle}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default GridComponent;

const styles = StyleSheet.create({
  cardGridContainer: {
    padding: 10,
    height: 150,
    width: 150,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
  },
  containerTitle: {
    textAlign: "center",
  },
  buttonPressed: {
    elevation: 4,
    opacity: 0.5,
  },
});
