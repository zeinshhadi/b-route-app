import React from "react";
import { StyleSheet, Text, View } from "react-native";

const BusTextDetails = ({ detailTitle, detailInfo }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.detailTextStyle}>{detailTitle}</Text>
      <Text style={styles.detailTextStyle}>{detailInfo}</Text>
    </View>
  );
};

export default BusTextDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
});
