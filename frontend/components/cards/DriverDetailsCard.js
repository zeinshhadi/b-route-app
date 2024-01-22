import React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
const DriverDetailsCard = ({ driverFirstName, driverLastName }) => {
  return (
    <View style={styles.rowInfo}>
      <Image style={styles.driverImage} source={require("../../assets/images/driver.jpg")} />

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
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  driverImage: {
    height: 150,
    width: 150,
    borderRadius: 250,
    alignSelf: "center",
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
