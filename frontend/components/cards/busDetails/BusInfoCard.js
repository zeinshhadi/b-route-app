import React from "react";
import { View, StyleSheet } from "react-native";
import DriverDetailsCard from "../DriverDetailsCard";
import BusTextDetails from "./BusTextDetails";

const BusInfoCard = () => {
  return (
    <View style={styles.busInformationContainer}>
      <BusTextDetails detailTitle={"bus Type"} detailInfo={"NISSAN"} />
    </View>
  );
};

export default BusInfoCard;
const styles = StyleSheet.create({
  busInformationContainer: {
    padding: 19,
    height: "70%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    width: "85%",
  },
});
