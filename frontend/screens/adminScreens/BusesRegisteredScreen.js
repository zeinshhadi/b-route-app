import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
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
        const response = await axios.get("http://192.168.0.101:8000/api/bus", {
          headers: { Authorization: authorization },
        });
        setBusInfo(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("BusInformation", { item: item })}>
        <DetailsCard cardTitle={item.id} cardDetail={item.model} tempText={"More Details"} status={"Active"} />
      </Pressable>
    );
  };

  return (
    <View style={styles.BusesRegisteredContainer}>
      <View style={styles.innerContainer}>
        <SearchBar />
        <FlatList data={busInfo.buses} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
};

export default BusesRegisteredScreen;

const styles = StyleSheet.create({
  BusesRegisteredContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    padding: 10,
  },
});
