import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../utils/colors";

const BusTextDetails = ({ detailTitle, detailInfo }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.detailTextStyle}>{detailTitle}</Text>
      <Text style={styles.detailDetailStyle}>{detailInfo}</Text>
    </View>
  );
};

export default BusTextDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary500,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
  },
  detailTextStyle: {
    fontSize: 18,
    marginVertical: 8,
    height: "100%",
    fontWeight: "500",
  },
  detailDetailStyle: {
    fontSize: 18,
    marginVertical: 8,
    height: "100%",
    fontWeight: "300",
  },
});
