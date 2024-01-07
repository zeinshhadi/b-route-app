import React from "react";
import { View, StyleSheet } from "react-native";

const ProfileCard = () => {
  return (
    <View>
      <Text>Hello from card profile</Text>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profileCardContainer: {
    height: 60,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
});
