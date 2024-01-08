import React from "react";
import { Pressable, View } from "react-native";
import DetailsCard from "../../components/cards/DetailsCard";
import SearchBar from "../../components/common/SearchBar";
import { StyleSheet } from "react-native";

const BusesRegisteredScreen = ({ navigation }) => {
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
