import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ActivityIndicator, Image, ScrollView } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
const AddDriverScreen = ({ navigation }) => {
  const data = [
    { label: "Bus 1", value: "1" },
    { label: "Bus 2", value: "2" },
    { label: "Bus 3", value: "3" },
    { label: "Bus 4", value: "4" },
    { label: "Bus 5", value: "5" },
    { label: "Bus 6", value: "6" },
    { label: "Bus 7", value: "7" },
    { label: "Bus 8", value: "8" },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    driverLicense: "",
    busId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleRegisterDriver = async () => {
    console.log(userData);
    // try {
    //   if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.phoneNumber) {
    //     console.error("Please fill in all fields");
    //     return;
    //   }

    //   setLoading(true);

    //   const registrationData = {
    //     first_name: userData.firstName,
    //     last_name: userData.lastName,
    //     email: userData.email,
    //     password: userData.password,
    //     phone_number: userData.phoneNumber,
    //   };

    //   console.log("Registration Request Data:", registrationData);

    //   const response = await axios.post("http://192.168.1.7:8000/api/register", registrationData);

    //   console.log("Registration Response:", response.data);

    //   if (response.data.status === "success") {
    //     const storeToken = async (token) => {
    //       try {
    //         await AsyncStorage.setItem("userToken", token);
    //       } catch (error) {
    //         console.error("Error storing token:", error);
    //       }
    //     };
    //     navigation.navigate("HomeScreen");
    //   } else {
    //     console.error("Registration failed");
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error.message || error);
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        <View style={styles.driverImageContainer}>
          <Image style={styles.driverImage} source={require("../../assets/images/driver.jpg")} />
        </View>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your First Name"
              value={userData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your Last Name"
              value={userData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your email"
              value={userData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your password"
              secureTextEntry
              value={userData.password}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your phone number"
              value={userData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your Driver license"
              value={userData.driverLicense}
              onChangeText={(text) => handleInputChange("driverLicense", text)}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
                handleInputChange("BusId", item.value);
              }}
            />
          </View>
        </View>
        <Button onPress={handleRegisterDriver} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Driver</Text>}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddDriverScreen;

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
    backgroundColor: "#D9D9D9",
    height: 50,
    width: "100%",
    margin: 5,
    padding: 8,
  },
  formContainer: {
    width: "90%",
    justifyContent: "center",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
  titleFormScreen: {
    fontWeight: "500",
    fontSize: 24,
  },
  driverImage: {
    height: 150,
    width: 220,
    margin: 25,
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
    marginLeft: 5,
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
