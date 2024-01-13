import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Colors from "../../utils/colors";

const ProfileCard = ({ cardTitle, cardDetail }) => {
  return (
    <Pressable>
      <View style={styles.profileCardContainer}>
        <View style={styles.leftCardProfile}>
          <Text style={styles.cardTitleStyle}>{cardTitle}</Text>
          <Text style={styles.cardDetailStyle}>{cardDetail}</Text>
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
    backgroundColor: Colors.cardColor,
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
  cardTitleStyle: {
    fontWeight: "bold",
  },
  cardDetailStyle: {
    fontWeight: "bold",
    color: "grey",
  },
});
