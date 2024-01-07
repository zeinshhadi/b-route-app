import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

const DetailsCard = () => {
  return (
    <View style={styles.detailsCardContainer}>
      <View>
        <Text>Bus#1</Text>
        <Text>Bus Model</Text>
      </View>
      <View>
        <Text>More Details</Text>
        <Text>Status</Text>
      </View>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  detailsCardContainer: {
    padding: 10,
  },
});
