import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View, ActivityIndicator } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { Url } from "../../core/helper/Url";
import Colors from "../../utils/colors";

const ZonesRegisteredScreen = ({ navigation }) => {
  const [zones, setZones] = useState();
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Url}/api/zones`, {
          headers: { Authorization: authorization },
        });
        console.log("response ", response.data.zones);

        setZones(response.data.zones);
      } catch (error) {
        setLoading(false);
        console.log("Error Fetching " + error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("BusesByZone", { item: item })}>
        <DetailsCard
          itemType={"Zone#"}
          cardTitle={item.id}
          cardDetail={item.zone_name}
          tempText={"MoreDetails"}
          status={"status"}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.ZonesRegisteredScreenContainer}>
      <View style={styles.innerContainer}>
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
          <FlatList data={zones} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
        )}
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
    backgroundColor: "white",
  },
  innerContainer: {
    width: "90%",
    flex: 1,
    marginBottom: 5,
  },
});
