import React from "react";
import ReviewCard from "../../components/cards/ReviewCard";
import { StyleSheet, View } from "react-native";

const ReviewScreen = () => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInnerContainer}>
        <ReviewCard
          cardTitle={"Zein Shhadi"}
          cardDetail={`${"****"} `}
          reviewText={"What A Ride ! Just what we needed to arrive on time !"}
        />
      </View>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  reviewContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  reviewInnerContainer: {
    width: "90%",
  },
});
