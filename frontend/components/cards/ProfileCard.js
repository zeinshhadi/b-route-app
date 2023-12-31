import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

const ProfileCard = ({ cardTitle, cardDetail }) => {
  return (
    <Pressable>
      <View style={styles.profileCardContainer}>
        <View style={styles.leftCardProfile}>
          <Text>{cardTitle}</Text>
          <Text>{cardDetail}</Text>
        </View>
        <View>
          <Icon name="arrow-right" size={30} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  profileCardContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  leftCardProfile: {
    justifyContent: "space-around",
    height: "100%",
    width: "80%",
  },
});
