import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const Scard = () => {
  return (
    <View style={styles.smallBusCardContainer}>
      <Text style={styles.smallBusCardContainerText}>Bus Capacity</Text>
      <Text style={styles.smallBusCardContainerText}>30</Text>
    </View>
  );
};

export default Scard;

const styles = StyleSheet.create({
  smallBusCardContainer: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  smallBusCardContainerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
  },
});
