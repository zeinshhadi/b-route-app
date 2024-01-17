import React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
const DriverDetailsCard = ({ driverFirstName, driverLastName }) => {
  return (
    <View style={styles.rowInfo}>
      <View style={styles.driverImageContainer}>
        <Image style={styles.driverImage} source={require("../../assets/images/driver.jpg")} />
      </View>
      <View style={styles.driverInfoText}>
        <Text style={styles.driverInfoTextTitle}>Driver Name:</Text>
        <Text style={styles.driverInfoTextDetails}>
          {driverFirstName} {driverLastName}
        </Text>
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
    width: 180,
    height: 130,
    borderRadius: 10,
  },
  driverInfoText: {
    width: "33%",
  },
  driverInfoTextDetails: {
    fontWeight: "500",
    fontSize: 15,
  },
  driverInfoTextTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
