import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import axios from "axios";
import Colors from "../../utils/colors";
import { Url } from "../../core/helper/Url";
import CountryPicker from "react-native-country-picker-modal";

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    countryCode: "US",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const { firstName, lastName, email, password, phoneNumber } = userData;
      if (!firstName || !lastName || !email || !password || !phoneNumber) {
        console.error("Please fill in all fields");
        return;
      }

      setLoading(true);

      const registrationData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        phone_number: phoneNumber,
      };

      const response = await axios.post(`${Url}/api/register`, registrationData);

      if (response.data.status === "success") {
        const storeToken = async (token) => {
          try {
            await AsyncStorage.setItem("userToken", token);
          } catch (error) {
            console.error("Error storing token:", error);
          }
        };
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectCountry = (country) => {
    setUserData({ ...userData, countryCode: country.cca2 });
  };

  return (
    <View style={styles.outerContainer}>
      <LogoComponent />
      <Text style={styles.titleFormScreen}>Sign Up</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputDesign}
          placeholder="Enter your First Name"
          placeholderTextColor="black"
          value={userData.firstName}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <TextInput
          style={styles.inputDesign}
          placeholder="Enter your Last Name"
          placeholderTextColor="black"
          value={userData.lastName}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <TextInput
          style={styles.inputDesign}
          placeholder="Enter your email"
          placeholderTextColor="black"
          value={userData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          style={styles.inputDesign}
          placeholder="Enter your password"
          placeholderTextColor="black"
          secureTextEntry
          value={userData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <View style={styles.phoneInputContainer}>
          <CountryPicker
            countryCode={userData.countryCode}
            withCallingCode
            withCallingCodeButton
            withFlagButton={true}
            onSelect={onSelectCountry}
            containerButtonStyle={{
              borderRadius: 5,
              backgroundColor: "white",
              height: 50,
              padding: 8,
              borderWidth: 1,
              borderColor: "grey",
            }}
            withFilter={true}
          />
          <Text style={styles.countryCodeText}>{userData.callingCode}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            placeholderTextColor="black"
            value={userData.phoneNumber}
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

export default RegisterScreen;

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
    width: "90%",
    justifyContent: "center",
    gap: 10,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  countryCodeText: {
    fontSize: 18,
    color: "black",
  },
  phoneInput: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "white",
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "grey",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  registerText: {
    marginRight: 5,
  },
  registerLink: {
    color: Colors.primary500,
    textDecorationLine: "none",
  },
  titleFormScreen: {
    fontWeight: "500",
    fontSize: 24,
  },
});
