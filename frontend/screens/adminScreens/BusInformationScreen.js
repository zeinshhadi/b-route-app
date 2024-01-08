import React from "react";
import { StyleSheet, View } from "react-native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import BusInfoCard from "../../components/cards/BusInfoCard";

const BusInformationScreen = () => {
  return (
    <View style={styles.BusInformationContainer}>
      <DriverDetailsCard />
      <BusInfoCard />
    </View>
  );
};

export default BusInformationScreen;

const styles = StyleSheet.create({
  BusInformationContainer: {
    marginTop: 50,
    justifyContent: "space-around",
    alignItems: "center",
    gap: 30,
  },
});
