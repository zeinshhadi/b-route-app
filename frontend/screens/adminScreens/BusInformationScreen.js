import React from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import BusInfoCard from "../../components/cards/busDetails/BusInfoCard";

const BusInformationScreen = () => {
  const route = useRoute();
  const item = route.params.item;
  const { id, model, plate_number, color, vin, number_of_seats, zone_id } = item;
  return (
    <View style={styles.BusInformationContainer}>
      <DriverDetailsCard />
      <BusInfoCard
        id={id}
        model={model}
        plateNumber={plate_number}
        color={color}
        vin={vin}
        numberOfSeats={number_of_seats}
        zoneId={zone_id}
      />
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
