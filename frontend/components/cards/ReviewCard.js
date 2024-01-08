import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const ReviewCard = ({ cardTitle, cardDetail, reviewText }) => {
  return (
    <View style={styles.reviewCardContainer}>
      <View style={styles.reviewCard}>
        <Text style={styles.reviewCardText}>{cardTitle}</Text>
        <Text style={styles.reviewCardText}>{cardDetail}</Text>
      </View>
      <View style={styles.reviewCardDetail}>
        <Text>{reviewText}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  reviewCardContainer: {
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 20,
  },
  reviewCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  reviewCardText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  reviewCardDetail: {
    width: "100%",
  },
});
