import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../utils/colors";
import { useSelector } from "react-redux";
import axios from "axios";
const AddZoneScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
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

      const response = await axios.post("http://192.168.0.101:8000/api/addzone", registrationData, {
        headers: {
          Authorization: authorization,
        },
      });

      console.log("Registration Response:", response.data.status);

      if (response.data.status === "success") {
        console.log("Zone Created successfully");
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
      <Text style={styles.titleFormScreen}>Add Zone</Text>
      <View style={styles.formContainer}>
        <ScrollView>
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
    paddingBottom: 10,
  },
  inputDesign: {
    borderRadius: 5,
    backgroundColor: Colors.cardColor,
    height: 50,
    width: "100%",
    marginVertical: 5,
    padding: 8,
  },
  formContainer: {
    width: "90%",
    justifyContent: "center",
  },
  titleFormScreen: {
    fontWeight: "500",
    fontSize: 24,
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
});
