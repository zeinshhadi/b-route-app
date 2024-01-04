import React from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import Scard from "../../components/busDetails/Scard";
const BusDetails = () => {
  return (
    <View style={styles.mainContianer}>
      <View style={styles.rowInfo}>
        <View style={styles.driverImageContainer}>
          <Image style={styles.driverImage} source={require("../../assets/images/driver.jpg")} />
        </View>
        <View style={styles.driverInfoText}>
          <Text>Driver Name:</Text>
          <Text>Zein Shhadi</Text>
        </View>
      </View>
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
      <View style={styles.bigBusCardContainerMain}>
        <View style={styles.bigBusCardContainer}>
          <Text style={styles.bigBusCardContainerText}>Next Stop Zone</Text>
          <Text style={styles.bigBusCardContainerText}>6</Text>
        </View>
        <View style={styles.bigBusCardContainer}>
          <Text style={styles.bigBusCardContainerText}>Next Stop Arrival</Text>
          <Text style={styles.bigBusCardContainerText}>8:30 am</Text>
        </View>
      </View>
    </View>
  );
};

export default BusDetails;

const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
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
  bigBusCardContainerMain: {
    gap: 10,
  },
  bigBusCardContainer: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 25,
    gap: 10,
    padding: 20,
  },
  bigBusCardContainerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
