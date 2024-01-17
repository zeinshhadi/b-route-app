import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

const ZonesRegisteredScreen = ({ navigation }) => {
  const [zones, setZones] = useState();
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.100:8000/api/zones", {
          headers: { Authorization: authorization },
        });
        console.log("response ", response.data.zones);

        setZones(response.data.zones);
      } catch (error) {
        console.log("Error Fetching " + error);
      }
    };
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("BusesByZone", { item: item })}>
        <DetailsCard cardTitle={item.id} cardDetail={item.zone_name} tempText={"MoreDetails"} status={"status"} />
      </Pressable>
    );
  };

  return (
    <View style={styles.ZonesRegisteredScreenContainer}>
      <View style={styles.innerContainer}>
        <SearchBar />
        <FlatList data={zones} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      </View>
    </View>
  );
};

export default ZonesRegisteredScreen;

const styles = StyleSheet.create({
  ZonesRegisteredScreenContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    flex: 1,
    marginBottom: 5,
  },
});
