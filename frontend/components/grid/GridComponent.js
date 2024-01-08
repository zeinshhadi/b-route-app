import React from "react";
import { StyleSheet, View, Text } from "react-native";

const GridComponent = ({ children }) => {
  return (
    <View style={styles.cardGridContainer}>
      <Text style={styles.containerTitle}>{children}</Text>
    </View>
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
});
