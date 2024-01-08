import React from "react";
import { View } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";

const ZonesRegisteredScreen = () => {
  return (
    <View style={styles.BusesRegisteredContainer}>
      <View style={styles.innerContainer}>
        <SearchBar />
        <DetailsCard cardTitle={"Zone#"} cardDetail={"Saida"} tempText={"MoreDetails"} status={"status"} />
      </View>
    </View>
  );
};

export default ZonesRegisteredScreen;

const styles = StyleSheet.create({
  BusesRegisteredContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
  },
});
