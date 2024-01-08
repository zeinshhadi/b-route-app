import React from "react";
import { View, StyleSheet } from "react-native";
import DriverDetailsCard from "./DriverDetailsCard";

const BusInfoCard = () => {
  return <View style={styles.busInformationContainer}></View>;
};

export default BusInfoCard;
const styles = StyleSheet.create({
  busInformationContainer: {
    padding: 19,
    height: "70%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    width: "85%",
  },
});
