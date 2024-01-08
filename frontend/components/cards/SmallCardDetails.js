import React from "react";
import { Text, StyleSheet, View } from "react-native";

const SmallCardDetails = () => {
  return (
    <View style={styles.rowInfo}>
      <View style={styles.smallBusCardContainer}>
        <Text style={styles.smallBusCardContainerText}>Bus Capacity</Text>
        <Text style={styles.smallBusCardContainerText}>30</Text>
      </View>
      <View style={styles.smallBusCardContainer}>
        <Text style={styles.smallBusCardContainerText}>Available Seats</Text>
        <Text style={styles.smallBusCardContainerText}>3</Text>
      </View>
    </View>
  );
};

export default SmallCardDetails;

const styles = StyleSheet.create({
  rowInfo: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  smallBusCardContainer: {
    padding: 20,
    width: 150,
    height: 100,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  smallBusCardContainerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
