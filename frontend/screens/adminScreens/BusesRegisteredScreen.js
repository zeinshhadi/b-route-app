import React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-screens";
import DetailsCard from "../../components/cards/DetailsCard";

const BusesRegisteredScreen = () => {
  return (
    <View>
      <SearchBar />
      <DetailsCard />
    </View>
  );
};

export default BusesRegisteredScreen;
