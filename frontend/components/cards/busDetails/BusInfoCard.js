import React from "react";
import { View, StyleSheet } from "react-native";
import DriverDetailsCard from "../DriverDetailsCard";
import BusTextDetails from "./BusTextDetails";

const BusInfoCard = () => {
  return (
    <View style={styles.busInformationContainer}>
      <BusTextDetails detailTitle={"Model"} detailInfo={"NISSAN"} />
      <BusTextDetails detailTitle={"Vin"} detailInfo={"123456987365"} />
      <BusTextDetails detailTitle={"color"} detailInfo={"Black"} />
      <BusTextDetails detailTitle={"Number of Seats"} detailInfo={"20"} />
      <BusTextDetails detailTitle={"Added At"} detailInfo={"20/02/2021"} />
      <BusTextDetails detailTitle={"bus id"} detailInfo={"2"} />
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
