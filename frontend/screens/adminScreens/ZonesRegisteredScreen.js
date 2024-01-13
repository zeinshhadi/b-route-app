import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

const ZonesRegisteredScreen = () => {
  const [zones, setZones] = useState;
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer" + authState.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.101:8000/api/zones", {
          headers: { Authorization: authorization },
        });
        setZones(response.data);
      } catch (error) {
        console.log("Error Fetching " + error);
      }
    };
  }, []);
  const renderItem = ({ item }) => {
    <DetailsCard cardTitle={item.id} cardDetail={item.zone_name} tempText={"MoreDetails"} status={"status"} />;
  };
  return (
    <View style={styles.BusesRegisteredContainer}>
      <View style={styles.innerContainer}>
        <SearchBar />

        <FlatList data={zones} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
};

export default ZonesRegisteredScreen;

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
