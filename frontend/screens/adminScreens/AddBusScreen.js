import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import axios from "axios";
const AddBusScreen = ({ navigation }) => {
  const [busInfo, setBusInfo] = useState({
    vin: null,
    color: "",
    password: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setBusInfo((prevBusInfo) => ({
      ...prevBusInfo,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    console.log(busInfo);
    // try {
    //   if (!busInfo.firstName || !busInfo.lastName || !busInfo.plate_number || !busInfo.password || !busInfo.phoneNumber) {
    //     console.error("Please fill in all fields");
    //     return;
    //   }

    //   setLoading(true);

    //   const registrationData = {
    //     first_name: busInfo.firstName,
    //     last_name: busInfo.lastName,
    //     plate_number: busInfo.plate_number,
    //     password: busInfo.password,
    //     phone_number: busInfo.phoneNumber,
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
    <View style={styles.outerContainer}>
      <Text style={styles.titleFormScreen}>Sign Up</Text>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus vin"
            value={busInfo.firstName}
            onChangeText={(text) => handleInputChange("vin", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus color"
            value={busInfo.lastName}
            onChangeText={(text) => handleInputChange("color", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus plate number"
            value={busInfo.plate_number}
            onChangeText={(text) => handleInputChange("plate_number", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your password"
            secureTextEntry
            value={busInfo.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your phone number"
            value={busInfo.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
        </View>
      </View>
      <Button onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Sign Up</Text>}
      </Button>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("LogInScreen")}>
          <Text style={styles.registerLink}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddBusScreen;

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
    width: "80%",
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
});
