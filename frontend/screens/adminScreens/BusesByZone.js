import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const BusesByZone = ({ navigation }) => {
  const route = useRoute();
  const item = route.params.item;
  const zone_id = item.id;
  console.log(zone_id);
  const [busZone, setBusZone] = useState([]);
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.0.101:8000/api/bus/zone/${zone_id}`, {
          headers: { Authorization: authorization },
        });
        console.log("response ", response.data);

        setBusZone(response.data.busZone);
      } catch (error) {
        console.log("Error Fetching " + error);
      }
    };
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("BusInformation", { item: item })}>
        <DetailsCard cardTitle={item.id} cardDetail={item.model} tempText={"MoreDetails"} status={"status"} />
      </Pressable>
    );
  };

  return (
    <View style={styles.BusesByZoneContainer}>
      <View style={styles.innerContainer}>
        <SearchBar />
        <FlatList data={busZone} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
};

export default BusesByZone;

const styles = StyleSheet.create({
  BusesByZoneContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    flex: 1,
    padding: 10,
  },
});
