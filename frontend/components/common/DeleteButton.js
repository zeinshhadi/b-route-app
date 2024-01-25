import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const DeleteButton = () => {
  return (
    <View style={[styles.seatContainer]} key={i}>
      <MaterialIcons name="event-seat" size={44} color={seatColors[i - 1]} />
    </View>
  );
};

export default DeleteButton;
