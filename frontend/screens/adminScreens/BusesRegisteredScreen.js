import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
const BusesRegisteredScreen = ({ navigation }) => {
  const [busInfo, setBusInfo] = useState([]);
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = authState.token;
      const authorization = "Bearer " + authToken;
      try {
        const response = await axios.get("http://192.168.0.101:8000/api/all/buses", {
          headers: { Authorization: authorization },
        });

        setBusInfo(response.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.BusesRegisteredContainer}>
      <View style={styles.innerContainer}>
        <SearchBar />
        <Pressable onPress={() => navigation.navigate("BusInformation")}>
          <DetailsCard cardTitle={"bus#"} cardDetail={"model"} tempText={"MoreDetails"} status={"status"} />
        </Pressable>
      </View>
    </View>
  );
};

export default BusesRegisteredScreen;

const styles = StyleSheet.create({
  BusesRegisteredContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
  },
});
