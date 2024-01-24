import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View, ActivityIndicator } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";
import Colors from "../../utils/colors";

const BusesRegisteredScreen = ({ navigation }) => {
  const [busInfo, setBusInfo] = useState([]);
  const authState = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const authToken = authState.token;
      const authorization = "Bearer " + authToken;
      try {
        const response = await axios.get(`${Url}/api/bus`, {
          headers: { Authorization: authorization },
        });
        setBusInfo(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching buses:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listContainer}>
        <Pressable
          onPress={() => navigation.navigate("BusInformation", { item: item })}
          android_ripple={{ color: Colors.primary500 }}
          style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}>
          <DetailsCard
            itemType={"Bus#"}
            cardTitle={item.id}
            cardDetail={item.model}
            tempText={"Details"}
            tempType={"Zone#"}
            status={item.zone_id}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.BusesRegisteredContainer}>
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
          <FlatList data={busInfo.buses} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
        )}
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
  buttonPressed: {
    opacity: 0.5,
    overflow: "hidden",
  },
});
