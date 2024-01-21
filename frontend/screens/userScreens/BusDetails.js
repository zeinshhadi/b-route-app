import React, { useEffect } from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import SmallCardDetails from "../../components/cards/SmallCardDetails";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Url } from "../../core/redux/helper/Url";
const BusDetails = () => {
  const route = useRoute();
  const driver_id = route.params;

  useEffect(() => {
    const fetchBusData = async () => {
      const response = await axios.get(`${Url}/api/driver/bus/${driver_id}`, {
        headers: { Authorization: authorization },
      });
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <DriverDetailsCard />
      <SmallCardDetails />
      <View style={styles.bigBusCardContainerMain}>
        <View style={styles.bigBusCardContainer}>
          <Text style={styles.bigBusCardContainerText}>Next Zone</Text>
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
  mainContainer: {
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
