import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import { Text, View, StyleSheet } from "react-native";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import axios from "axios";
import { Url } from "../../core/redux/helper/Url";
const EditProfile = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  console.log(authState);
  const handleLogout = async () => {
    console.log("logged out");

    try {
      const response = await axios.post(
        `${Url}/api/logout`,
        {},
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.data.status == "success") {
        navigation.navigate("LogInScreen");
      }
    } catch (error) {
      console.log("Logout fail for the following error ", error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.editProfileScreen}>
        <View style={styles.editProfileBody}>
          <ProfileCard cardTitle="First Name " cardDetail={authState.user.first_name} />
          <ProfileCard cardTitle="Last Name " cardDetail={authState.user.last_name} />
          <ProfileCard cardTitle="Email " cardDetail={authState.user.email} />
          <ProfileCard cardTitle={"Phone Number "} cardDetail={authState.user.phone_number} />
          <ProfileCard cardTitle="Role " cardDetail={authState.user.role_type} />
        </View>
        <Button onPress={handleLogout}>
          <Text>Log Out</Text>
        </Button>
      </View>
    </ScrollView>
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
    padding: 5,
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
