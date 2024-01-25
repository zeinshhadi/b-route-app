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
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
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
        setZones(response.data.zones);
        setFilteredZones(response.data.zones);
      } catch (error) {
        setLoading(false);
        console.log("Error Fetching " + error);
      }
      setLoading(false);
    };
    fetchData();
  }, [authorization]);

  const handleSearch = (searchText) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredData = zones.filter(
      (zone) =>
        zone.id.toString().includes(lowerCaseSearchText) || zone.zone_name.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredZones(filteredData);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        {item.bus_count ? (
          <Pressable
            onPress={() => navigation.navigate("BusesByZone", { item: item })}
            android_ripple={{ color: Colors.primary500, foreground: true }}
            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
            <DetailsCard
              itemType={"Zone#"}
              cardTitle={item.id}
              cardDetail={item.zone_name}
              tempText={`Details`}
              status={`Buses: ${item.bus_count}`}
            />
          </Pressable>
        ) : (
          <DetailsCard
            itemType={"Zone#"}
            cardTitle={item.id}
            cardDetail={item.zone_name}
            tempText={`Details`}
            status={`Buses: ${item.bus_count}`}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.ZonesRegisteredScreenContainer}>
      <View style={styles.innerContainer}>
        <SearchBar onSearchChange={handleSearch} />
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
            data={filteredZones}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.listContainer}
          />
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
    overflow: "hidden",
  },
  innerContainer: {
    width: "90%",
    flex: 1,
    marginBottom: 5,
    overflow: "hidden",
  },
  listContainer: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 7,
    height: 80,
  },
  buttonPressed: {
    opacity: 0.5,
    overflow: "hidden",
  },
});
