import React from "react";
import { StyleSheet, View } from "react-native";

const GridComponent = ({ children }) => {
  return (
    <View style={styles.cardGridContainer}>
      <Text>{children}</Text>
    </View>
  );
};

export default GridComponent;

const styles = StyleSheet.create({
  cardGridContainer: {
    padding: 10,
    height: 100,
    width: 100,
    backgroundColor: "#D9D9D9",
  },
});
