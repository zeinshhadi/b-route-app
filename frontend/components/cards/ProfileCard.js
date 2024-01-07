import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

const ProfileCard = ({ cardTitle, cardDetail }) => {
  return (
    <Pressable>
      <View style={styles.profileCardContainer}>
        <View style={styles.leftCardProfile}>
          <Text>Your Email : </Text>
          <Text>Zeinshhadi@gmail.com</Text>
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
    padding: 10,
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    margin: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  leftCardProfile: {
    justifyContent: "space-around",
    height: "100%",
  },
});
