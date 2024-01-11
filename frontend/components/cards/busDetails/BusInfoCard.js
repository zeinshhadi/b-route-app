import React from "react";
import { View, StyleSheet } from "react-native";
import DriverDetailsCard from "../DriverDetailsCard";
import BusTextDetails from "./BusTextDetails";
import Colors from "../../../utils/colors";

const BusInfoCard = () => {
  return (
    <View style={styles.busInformationContainer}>
      <BusTextDetails detailTitle={"Model"} detailInfo={"NISSAN"} />
      <BusTextDetails detailTitle={"Vin"} detailInfo={"123456987365"} />
      <BusTextDetails detailTitle={"PLate Number"} detailInfo={"123456"} />
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
    padding: 20,
    height: "65%",
    backgroundColor: Colors.cardColor,
    borderRadius: 10,
    width: "85%",
  },
});
