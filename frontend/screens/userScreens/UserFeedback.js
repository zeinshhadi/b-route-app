import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Rating } from "react-native-ratings";
import Colors from "../../utils/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";
const UserFeedback = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [review, setReview] = useState("");
  const [rate, setRate] = useState();
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
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/8.png")} style={styles.OnboardingImage} />
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
        onChangeText={(text) => setReview(text)}
      />
      <Rating onFinishRating={handleRating} startingValue={0} ratingBackgroundColor="white" />
      <Pressable style={styles.submitButton} onPress={submitFeedback}>
        <Text style={styles.submitButtonText}>
          {loading ? <ActivityIndicator size={"small"} color={"white"} /> : "Submit Feedback"}
        </Text>
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
    backgroundColor: "white",
    gap: 10,
    paddingBottom: 30,
  },

  infoContainer: {
    alignItems: "center",
    width: "90%",
    gap: 20,
  },
  reviewInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "90%",
  },
  submitButton: {
    backgroundColor: Colors.primary500,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 18,
    marginVertical: 2,
    textAlign: "center",
  },
  arriveText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  OnboardingImage: {
    width: 400,
    height: 200,
  },
});
