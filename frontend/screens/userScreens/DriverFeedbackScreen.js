import React, { useEffect, useState } from "react";
import ReviewCard from "../../components/cards/ReviewCard";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import SearchBar from "../../components/common/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import Colors from "../../utils/colors";
import { Url } from "../../core/helper/Url";
import { useRoute } from "@react-navigation/native";
const DriverFeedbackScreen = () => {
  const route = useRoute();
  const driver_id = route.params.driver_id;
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Url}/api/driver/review/${driver_id}`, {
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

  const filteredData = data
    ? data.filter((item) => {
        const firstNameMatch = item.user.first_name.toLowerCase().includes(searchText.toLowerCase());
        const descriptionMatch = item.review.toLowerCase().includes(searchText.toLowerCase());
        return firstNameMatch || descriptionMatch;
      })
    : [];

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
        <SearchBar searchText={searchText} onSearchChange={setSearchText} />
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
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            style={styles.reviewList}
          />
        )}
      </View>
    </View>
  );
};

export default DriverFeedbackScreen;

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
