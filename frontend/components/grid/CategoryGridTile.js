import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GridComponent from "./GridComponent";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../utils/colors";
const CategoryGridTile = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.mainAdminScreenContainer}>
      <View style={styles.mainAdminScreenContainer}>
        <View style={styles.gridContainer}>
          <GridComponent onPress={() => navigateToScreen("AddBusScreen")}>
            <Ionicons name="add-circle-outline" size={50} color={Colors.primary600} />
          </GridComponent>
          <Text style={styles.titleContainer}>Add Bus</Text>
          <GridComponent onPress={() => navigateToScreen("AddDriverScreen")}>
            <Ionicons name="person-add" size={50} color={Colors.primary600} />
          </GridComponent>
          <Text style={styles.titleContainer}>Add Driver</Text>
          <GridComponent onPress={() => navigateToScreen("ReviewScreen")}>
            <MaterialIcons name="rate-review" size={50} color={Colors.primary600} />
          </GridComponent>
          <Text style={styles.titleContainer}>Reviews</Text>
        </View>
        <View style={styles.gridContainer}>
          <GridComponent onPress={() => navigateToScreen("ZonesRegistered")}>
            <Ionicons name="location-outline" size={50} color={Colors.primary600} />
          </GridComponent>
          <Text style={styles.titleContainer}>Zones</Text>
          <GridComponent onPress={() => navigateToScreen("BusesRegistered")}>
            <Ionicons name="bus" size={50} color={Colors.primary600} />
          </GridComponent>
          <Text style={styles.titleContainer}>Buses</Text>
          <GridComponent onPress={() => navigateToScreen("AddZoneScreen")}>
            <Ionicons name="add-circle-outline" size={50} color={Colors.primary600} />
          </GridComponent>
          <Text style={styles.titleContainer}>Add Zone</Text>
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
