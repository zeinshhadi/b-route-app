import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings";
import Colors from "../../utils/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";

const UserFeedback = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [review, setReview] = useState("");
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = (rating) => {
    setRate(rating);
  };

  const submitFeedback = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${Url}/api/feedback/ride`,
        { review, rate },
        { headers: { Authorization: authorization } }
      );
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.innerContainer}>
        <Image source={require("../../assets/1.png")} style={styles.reviewImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.arriveText}>You Arrived!</Text>
          <Text style={styles.infoText}>
            Been a pleasure having you on board.
            {"\n"}
            Your rate and review are important to us.
          </Text>
        </View>

        <TextInput
          style={styles.reviewInput}
          placeholder="Feel free to share your feedback"
          multiline
          textAlignVertical="top"
          onChangeText={(text) => setReview(text)}
        />

        <Rating onFinishRating={handleRating} startingValue={rate} ratingBackgroundColor="white" imageSize={30} />

        <Pressable style={styles.submitButton} onPress={submitFeedback}>
          <Text style={styles.submitButtonText}>
            {loading ? <ActivityIndicator size="small" color="white" /> : "Submit Feedback"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default UserFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    backgroundColor: "white",
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
  reviewInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  submitButton: {
    backgroundColor: Colors.primary500,
    padding: 15,
    borderRadius: 5,
    width: 150,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  arriveText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  reviewImage: {
    width: 350,
    height: 130,
    resizeMode: "contain",
    marginBottom: 1,
  },
});
