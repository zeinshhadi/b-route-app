import React from "react";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import BusInfoCard from "../../components/cards/busDetails/BusInfoCard";

const BusInformationScreen = () => {
  const route = useRoute();
  const itemId = route.params.itemId;
  return (
    <View style={styles.BusInformationContainer}>
      <DriverDetailsCard />
      <BusInfoCard itemId={itemId} />
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
