import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../utils/colors";

const GridComponent = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: Colors.primary500 }}
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
    backgroundColor: Colors.cardColor,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: Colors.primary500,
    shadowOpacity: 4,
    shadowRadius: 10,
  },
  containerTitle: {
    textAlign: "center",
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
