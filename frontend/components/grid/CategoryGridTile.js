import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GridComponent from "./GridComponent";
import { useNavigation } from "@react-navigation/native";
const CategoryGridTile = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.mainAdminScreenContainer}>
      <View style={styles.mainAdminScreenContainer}>
        <View style={styles.gridContainer}>
          <GridComponent>
            <Text>Add Bus</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Add Bus</Text>
          <GridComponent onPress={() => navigateToScreen("AddDriverScreen")}>
            <Text>Add Driver</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Add Driver</Text>
          <GridComponent>
            <Text>Reviews</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Reviews</Text>
        </View>
        <View style={styles.gridContainer}>
          <GridComponent onPress={() => navigateToScreen("ZonesRegistered")}>
            <Text>Zones</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Zones</Text>
          <GridComponent onPress={() => navigateToScreen("BusesRegistered")}>
            <Text>Buses</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Buses</Text>
          <GridComponent>
            <Text>Drivers</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Drivers</Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryGridTile;
const styles = StyleSheet.create({
  mainAdminScreenContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gridContainer: {
    gap: 10,
  },
  titleContainer: {
    textAlign: "center",
  },
});
