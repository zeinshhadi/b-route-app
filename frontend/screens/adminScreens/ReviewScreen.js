import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/cards/ReviewCard";
import { FlatList, StyleSheet, View } from "react-native";
import SearchBar from "../../components/common/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/redux/helper/Url";
import Colors from "../../utils/colors";
const ReviewScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url}/api/feedback`, {
          headers: { Authorization: authorization },
        });
        setData(response.data.reviews);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    const stars = Array.from({ length: item.rate }, (_, index) => (
      <Ionicons key={index} name="star" color={Colors.primary500} />
    ));
    return (
      <ReviewCard
        cardTitle={item.user_id}
        cardDetail={<View style={styles.starContainer}>{stars}</View>}
        reviewText={"What A Ride ! Just what we needed to arrive on time !"}
      />
    );
  };
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInnerContainer}>
        <SearchBar />
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} style={styles.reviewList} />
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
    marginVertical: 30,
  },
  starContainer: {
    flexDirection: "row",
  },
  reviewList: {
    marginBottom: 35,
  },
});
