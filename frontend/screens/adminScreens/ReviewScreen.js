import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/cards/ReviewCard";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import SearchBar from "../../components/common/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import Colors from "../../utils/colors";
import { Url } from "../../core/helper/Url";
const ReviewScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Url}/api/feedback`, {
          headers: { Authorization: authorization },
        });
        setData(response.data.reviews);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    const stars = Array.from({ length: item.rate }, (_, index) => (
      <Ionicons key={`${item.rate}_${index}`} name="star" size={20} color={Colors.primary500} />
    ));

    return (
      <ReviewCard
        cardTitle={item.user.first_name}
        cardDetail={<View style={styles.starContainer}>{stars}</View>}
        reviewText={item.review}
      />
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewInnerContainer}>
        <SearchBar />
        {loading ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.primary500}
            style={{
              alignSelf: "center",
              flex: 1,
            }}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            style={styles.reviewList}
          />
        )}
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
    backgroundColor: "white",
    flex: 1,
  },
  reviewInnerContainer: {
    width: "90%",
    marginTop: 5,
    flex: 1,
  },
  starContainer: {
    flexDirection: "row",
    gap: 4,
  },
  reviewList: {
    marginBottom: 2,
  },
});
