import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import { Text } from "react-native";
import Button from "../../components/common/Button";

const EditProfile = () => {
  handleLogin = () => {
    console.log("logged out ");
  };
  return (
    <>
      <Text>User Data</Text>
      <ProfileCard cardTitle="Phone Number " cardDetail="71503760" />
      <ProfileCard cardTitle="Email " cardDetail="zeinshhadi@gmail.com" />
      <ProfileCard cardTitle="Your rides history:" cardDetail="Last ride since 08L56 am" />
      <Button onPress={handleLogin}>
        <Text>Logout</Text>
      </Button>
    </>
  );
};

export default EditProfile;
