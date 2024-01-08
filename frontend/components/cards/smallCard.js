import React from "react";
import { StyleSheet } from "react-native";

const smallCard = () => {
  return (
    <View style={styles.rowInfo}>
      <View style={styles.smallBusCardContainer}>
        <Text style={styles.smallBusCardContainerText}>Bus Capacity</Text>
        <Text style={styles.smallBusCardContainerText}>30</Text>
      </View>
      <View style={styles.smallBusCardContainer}>
        <Text style={styles.smallBusCardContainerText}>Available Seats</Text>
        <Text style={styles.smallBusCardContainerText}>3</Text>
      </View>
    </View>
  );
};

export default smallCard;

const styles = StyleSheet.create({});
