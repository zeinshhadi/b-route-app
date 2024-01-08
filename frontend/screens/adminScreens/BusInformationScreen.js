import React from "react";
import { View } from "react-native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import BusInfoCard from "../../components/cards/BusInfoCard";

const BusInformationScreen = () => {
  return (
    <View>
      <DriverDetailsCard />
      <BusInfoCard />
    </View>
  );
};

export default BusInformationScreen;
