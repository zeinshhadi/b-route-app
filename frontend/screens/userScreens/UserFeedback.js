import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import Colors from "../../utils/colors";
import axios from "axios";
const UserFeedback = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();

  const handleRating = (rating) => {
    setRating(rating);
  };

  const submitFeedback = async () => {
    console.log("Review:", review);
    console.log("Rating:", rating);
    try {
      const response = await axios.post();
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>

      <View style={styles.infoContainer}>
        <Text>You Arrived!</Text>
        <Text>Been a pleasure having you on board.</Text>
        <Text>Your rate and review are important to us.</Text>
      </View>

      <TextInput
        style={styles.reviewInput}
        placeholder="Feel free to share your feedback"
        multiline
        onChangeText={(text) => setReview(text)}
      />
      <Rating onFinishRating={handleRating} startingValue={0} />
      <Pressable style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </Pressable>
    </View>
  );
};
export default UserFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  reviewInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: Colors.primary500,
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
