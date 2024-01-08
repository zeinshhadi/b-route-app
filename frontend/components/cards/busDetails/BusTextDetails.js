import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BusTextDetails = () => {
  return (
    <View style={styles.row}>
      <Text></Text>
      <Text></Text>
    </View>
  );
};

export default BusTextDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
