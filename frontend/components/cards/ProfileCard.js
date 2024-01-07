import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

const ProfileCard = () => {
  return (
    <View style={styles.profileCardContainer}>
      <Pressable>
        <View style={styles.leftCardProfile}>
          <Text>Your Email : </Text>
          <Text>Zeinshhadi@gmail.com</Text>
        </View>
        <View></View>
      </Pressable>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profileCardContainer: {
    flexDirection: "row",
    padding: 10,
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    margin: 30,
  },
  leftCardProfile: {
    justifyContent: "space-around",
    height: "100%",
  },
});
