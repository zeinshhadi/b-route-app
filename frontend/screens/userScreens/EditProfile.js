import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import { Text, View, StyleSheet } from "react-native";
import Button from "../../components/common/Button";

const EditProfile = () => {
  const useSelector = useSelector((state) => state.auth);
  handleLogin = () => {
    console.log("logged out ");
  };
  return (
    <View style={styles.editProfileScreen}>
      <View style={styles.editProfileBody}>
        <Text style={styles.cardTitleStyle}>User Data</Text>
        <ProfileCard cardTitle="Phone Number: " cardDetail="+961503760" />
        <ProfileCard cardTitle="Email: " cardDetail="zeinshhadi@gmail.com" />
        <ProfileCard cardTitle="Name: " cardDetail="zeinShhadi" />
        <Text style={styles.cardTitleStyle}>Ride History:</Text>
        <ProfileCard cardTitle="Your rides history:" cardDetail="Last ride since 08:56 am" />
      </View>
      <Button>
        <Text>LogOut</Text>
      </Button>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  editProfileScreen: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 0,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  editProfileBody: {
    width: "90%",
  },
  cardTitleStyle: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardLogoutButton: {},
});
