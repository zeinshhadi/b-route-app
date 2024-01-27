import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, RefreshControl } from "react-native";

import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";
import DriverDetailsCard from "../../components/DriverDetailsCard";
import Colors from "../../utils/colors";

const DriversActiveScreen = () => {
  const [busInfo, setBusInfo] = useState([]);
  const [filteredBusInfo, setFilteredBusInfo] = useState([]);
  const authState = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [authState.token]);

  const fetchData = async () => {
    setLoading(true);
    const authToken = authState.token;
    const authorization = "Bearer " + authToken;
    try {
      const response = await axios.get(`${Url}/api/bus`, {
        headers: { Authorization: authorization },
      });
      setBusInfo(response.data);
      setFilteredBusInfo(response.data.buses);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      console.error("Error fetching buses:", error);
    }
  };

  const handleSearch = (searchText) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredData = busInfo.buses.filter(
      (bus) =>
        bus.id.toString().includes(lowerCaseSearchText) ||
        bus.model.toLowerCase().includes(lowerCaseSearchText) ||
        `${bus.driver.user.first_name} ${bus.driver.user.last_name}`.toLowerCase().includes(lowerCaseSearchText) ||
        (bus.driver.driver_status === 1 && "Active".toLowerCase().includes(lowerCaseSearchText)) ||
        (bus.driver.driver_status === 0 && "Inactive".toLowerCase().includes(lowerCaseSearchText))
    );

    filteredData.sort((a, b) => b.driver.driver_status - a.driver.driver_status);

    setFilteredBusInfo(filteredData);
  };

  const renderItem = ({ item }) => {
    const driverName = item.driver.user.first_name + " " + item.driver.user.last_name;
    const status = item.driver.driver_status === 1 ? "Active" : "Inactive";

    return (
      <View style={styles.listContainer}>
        <DriverDetailsCard cardTitle={driverName} cardDetail={item.model} tempText={"Details"} status={status} />
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.BusesRegisteredContainer}>
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
            data={filteredBusInfo}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
    </View>
  );
};

export default DriversActiveScreen;

const styles = StyleSheet.create({
  BusesRegisteredContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    marginBottom: 5,
  },
  listContainer: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 7,
    height: 80,
  },
});
