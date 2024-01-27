import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Colors from "../utils/colors";

const DriverDetailsCard = ({ cardTitle, cardDetail, status, tempText, itemType, tempType }) => {
  const dotColor = status === "Active" ? styles.greenDot : styles.redDot;

  return (
    <View style={styles.driverDetailsCardContainer}>
      <View style={styles.driverDetailsCard}>
        <Text style={styles.cardTitleCss}>
          {itemType}
          {cardTitle}
        </Text>
        <Text style={styles.boldText}>{cardDetail}</Text>
      </View>
      <View style={styles.driverDetailsCard}>
        <View style={styles.cardMoreDetails}>
          <Text style={styles.detailStyle}>{tempText}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.dotContainer, dotColor]} />
          <Text style={styles.boldText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

export default DriverDetailsCard;

const styles = StyleSheet.create({
  driverDetailsCardContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: Colors.cardColor,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  driverDetailsCard: {
    height: "100%",
    justifyContent: "space-around",
  },
  cardTitleCss: {
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "500",
  },
  detailStyle: {
    textDecorationLine: "underline",
    textDecorationColor: Colors.primary500,
    color: Colors.primary500,
    fontWeight: "300",
  },
  dotContainer: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  greenDot: {
    backgroundColor: "green",
  },
  redDot: {
    backgroundColor: "red",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
