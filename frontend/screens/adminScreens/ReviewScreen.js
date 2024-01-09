import React from "react";
import ReviewCard from "../../components/cards/ReviewCard";
import { StyleSheet, View } from "react-native";
import SearchBar from "../../components/common/SearchBar";
import { Ionicons } from "@expo/vector-icons";
const ReviewScreen = () => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInnerContainer}>
        <SearchBar />
        <ReviewCard
          cardTitle={"Zein Shhadi"}
          cardDetail={
            <View style={styles.starContainer}>
              <Ionicons name="star" />
              <Ionicons name="star" />
              <Ionicons name="star" />
            </View>
          }
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
  starContainer: {
    flexDirection: "row",
  },
});
