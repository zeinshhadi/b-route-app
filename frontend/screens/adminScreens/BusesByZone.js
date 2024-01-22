import { useEffect, useState } from "react";
import { FlatList, Pressable, View, ActivityIndicator } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Url } from "../../core/helper/Url";
import Colors from "../../utils/colors";

const BusesByZone = ({ navigation }) => {
  const route = useRoute();
  const item = route.params.item;
  const zone_id = item.id;
  console.log(zone_id);
  const [busZone, setBusZone] = useState();
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Url}/api/bus/zone/${zone_id}`, {
          headers: { Authorization: authorization },
        });

        setBusZone(response.data.bus);
      } catch (error) {
        setLoading(false);
        console.log("Error Fetching " + error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    console.log("this is item " + item);
    return (
      <Pressable onPress={() => navigation.navigate("BusInformation", { item: item })}>
        <DetailsCard
          itemType={"Bus#"}
          cardTitle={item.id}
          cardDetail={item.model}
          tempText={"MoreDetails"}
          tempType={"Zone#"}
          status={item.zone_id}
        />
      </Pressable>
    );
  };

  return (
    <View style={styles.BusesByZoneContainer}>
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
          <FlatList data={busZone} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
        )}
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
    backgroundColor: "white",
  },
  innerContainer: {
    width: "90%",
    flex: 1,
    padding: 10,
  },
});
