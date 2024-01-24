import React from "react";
import { View, StyleSheet } from "react-native";
import BusTextDetails from "./BusTextDetails";
import Colors from "../../../utils/colors";

const BusInfoCard = ({ id, model, plateNumber, color, vin, numberOfSeats, zoneId }) => {
  return (
    <View style={styles.busInformationContainer}>
      <View style={styles.busInformationInnerContainer}>
        <BusTextDetails detailTitle={"Bus ID"} detailInfo={id} />
        <BusTextDetails detailTitle={"Model"} detailInfo={model} />
        <BusTextDetails detailTitle={"Vin"} detailInfo={vin} />
        <BusTextDetails detailTitle={"Plate Number"} detailInfo={plateNumber} />
        <BusTextDetails detailTitle={"Color"} detailInfo={color} />
        <BusTextDetails detailTitle={"Number of Seats"} detailInfo={numberOfSeats.toString()} />
        <BusTextDetails detailTitle={"Zone ID"} detailInfo={zoneId.toString()} />
      </View>
    </View>
  );
};

export default BusInfoCard;
const styles = StyleSheet.create({
  busInformationContainer: {
    padding: 9,
    height: "58%",
    backgroundColor: Colors.cardColor,
    borderRadius: 10,
    width: "85%",
    elevation: 4,
  },
  busInformationInnerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    overflow: "hidden",
    elevation: 4,
  },
});
