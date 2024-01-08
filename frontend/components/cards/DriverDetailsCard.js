import React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
const DriverDetailsCard = () => {
  return (
    <View style={styles.rowInfo}>
      <View style={styles.driverImageContainer}>
        <Image style={styles.driverImage} source={require("../../assets/images/driver.jpg")} />
      </View>
      <View style={styles.driverInfoText}>
        <Text>Driver Name:</Text>
        <Text>Zein Shhadi</Text>
      </View>
    </View>
  );
};

export default DriverDetailsCard;
const styles = StyleSheet.create({
  rowInfo: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  driverImageContainer: {
    width: "50%",
  },
  driverImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  driverInfoText: {
    width: "33%",
  },
});
