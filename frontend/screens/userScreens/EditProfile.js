import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import { Text, View, StyleSheet } from "react-native";
import Button from "../../components/common/Button";

const EditProfile = () => {
  handleLogin = () => {
    console.log("logged out ");
  };
  return (
    <View style={styles.editProfileScreen}>
      <View>
        <Text style={styles.cardTitleStyle}>User Data</Text>
        <ProfileCard cardTitle="Phone Number " cardDetail="+961503760" />
        <ProfileCard cardTitle="Email " cardDetail="zeinshhadi@gmail.com" />
        <Text style={styles.cardTitleStyle}>Ride History:</Text>
        <ProfileCard cardTitle="Your rides history:" cardDetail="Last ride since 08L56 am" />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  editProfileScreen: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cardTitleStyle: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardLogoutButton: {},
});
