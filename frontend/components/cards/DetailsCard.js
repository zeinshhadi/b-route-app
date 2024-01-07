import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const DetailsCard = () => {
  return (
    <View style={styles.detailsCardContainer}>
      <View style={styles.detailsCard}>
        <Text>Bus#1</Text>
        <Text>Bus Model</Text>
      </View>
      <View style={styles.detailsCard}>
        <Text>More Details</Text>
        <Text>Status</Text>
      </View>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  detailsCardContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  detailsCard: {
    height: "100%",
    justifyContent: "space-around",
  },
});
