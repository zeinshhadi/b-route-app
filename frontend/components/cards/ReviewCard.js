import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const ReviewCard = ({ cardTitle, cardDetail, reviewText }) => {
  return (
    <View style={styles.reviewCardContainer}>
      <View style={styles.reviewCard}>
        <Text>{cardTitle}</Text>
        <Text>{cardDetail}</Text>
      </View>
      <View style={styles.reviewCard}>
        <Text>{reviewText}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  reviewCardContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  reviewCard: {
    height: "100%",
    justifyContent: "space-around",
  },
});
