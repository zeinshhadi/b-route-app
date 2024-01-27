import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
const DriverDetailsCard = ({ driverFirstName, driverLastName, driverImageUri }) => {
  const baseUrl = "http://192.168.0.100:8000/storage/";
  const imageUrl = baseUrl + driverImageUri;
  return (
    <View style={styles.rowInfo}>
      <Image style={styles.driverImage} source={{ uri: imageUrl }} />

      <View style={styles.driverInfoText}>
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

  driverInfoTextDetails: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
});
