import React from "react";
import ProfileCard from "../../components/cards/ProfileCard";
import { Text, View, StyleSheet } from "react-native";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import axios from "axios";
const EditProfile = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  console.log(authState);
  const handleLogout = () => {
    console.log("logged out");
    const fetchData = async () => {
      try {
        const response = await axios.post("http://192.168.0.101:8000/api/logout", {
          headers: { authorization: authorization },
        });
        console.log("helo response" + response);
      } catch (error) {
        console.log("Logout fail for the following error ", error);
      }
    };
  };
  return (
    <ScrollView>
      <View style={styles.editProfileScreen}>
        <View style={styles.editProfileBody}>
          <Text style={styles.cardTitleStyle}>User Data</Text>
          <ProfileCard cardTitle={"Phone Number: "} cardDetail={authState.user.phone_number} />
          <ProfileCard cardTitle="Email: " cardDetail={authState.user.email} />
          <ProfileCard cardTitle="First Name: " cardDetail={authState.user.first_name} />
          <ProfileCard cardTitle="Last Name: " cardDetail={authState.user.last_name} />
          <ProfileCard cardTitle="Role: " cardDetail={authState.user.role_type} />
        </View>
        <Button onPress={handleLogout} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Zone</Text>}
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
