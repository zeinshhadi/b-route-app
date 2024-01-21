import { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert, Image } from "react-native";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import axios from "axios";
import { Url } from "../../core/redux/helper/Url";
const AddZoneScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;

  const [zoneInfo, setZoneInfo] = useState({
    zone_name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setZoneInfo((prevZoneInfo) => ({
      ...prevZoneInfo,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      if (!zoneInfo.zone_name) {
        console.error("Please fill in all fields");
        return;
      }

      setLoading(true);

      const registrationData = {
        zone_name: zoneInfo.zone_name,
      };

      console.log("Registration Request Data:", registrationData);

      const response = await axios.post(`${Url}/api/addzone`, registrationData, {
        headers: {
          Authorization: authorization,
        },
      });

      console.log("Registration Response:", response.data.status);

      if (response.data.status === "success") {
        Alert.alert("Zone Created successfully");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error.message || error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.formContainer}>
        <ScrollView>
          <Image style={styles.image} source={require("../../assets/addzoneimg.png")} />
          <View>
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter zone name"
              placeholderTextColor="black"
              value={zoneInfo.color}
              onChangeText={(text) => handleInputChange("zone_name", text)}
            />
          </View>
        </ScrollView>
      </View>
      <Button onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Zone</Text>}
      </Button>
    </View>
  );
};

export default AddZoneScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "white",
  },
  inputDesign: {
    borderRadius: 5,
    backgroundColor: "white",
    height: 50,
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "grey",
  },
  formContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    marginTop: 15,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
