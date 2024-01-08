import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GridComponent from "./GridComponent";

const CategoryGridTile = () => {
  return (
    <View style={styles.mainAdminScreenContainer}>
      <View style={styles.mainAdminScreenContainer}>
        <View style={styles.gridContainer}>
          <GridComponent>
            <Text>Add Bus</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Add Bus</Text>
          <GridComponent>
            <Text>Add Driver</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Add Driver</Text>
          <GridComponent>
            <Text>Reviews</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Reviews</Text>
        </View>
        <View style={styles.gridContainer}>
          <GridComponent>
            <Text>Zones</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>Zones</Text>
          <GridComponent>
            <Text>On Duty</Text>
          </GridComponent>
          <Text style={styles.titleContainer}>On Duty</Text>
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
    marginTop: 50,
  },
  gridContainer: {
    gap: 10,
  },
  titleContainer: {
    textAlign: "center",
  },
});
