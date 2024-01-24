import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Colors from "../../utils/colors";

const DetailsCard = ({ cardTitle, cardDetail, status, tempText, itemType, tempType }) => {
  return (
    <View style={styles.detailsCardContainer}>
      <View style={styles.detailsCard}>
        <Text style={styles.cardTitleCss}>
          {itemType}
          {cardTitle}
        </Text>
        <Text style={styles.boldText}>{cardDetail}</Text>
      </View>
      <View style={styles.detailsCard}>
        <View style={styles.cardMoreDetails}>
          <Text style={styles.detailStyle}>{tempText}</Text>
        </View>
        <Text style={styles.boldText}>
          {tempType}
          {status}
        </Text>
      </View>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  detailsCardContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: Colors.cardColor,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  detailsCard: {
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
    fontWeight: "bold",
  },
});
