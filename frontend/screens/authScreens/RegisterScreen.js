import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import axios from "axios";
import Colors from "../../utils/colors";
const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
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
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.phoneNumber) {
        console.error("Please fill in all fields");
        return;
      }

      setLoading(true);

      const registrationData = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phoneNumber,
      };

      console.log("Registration Request Data:", registrationData);

      const response = await axios.post("http://192.168.0.101:8000/api/register", registrationData);

      console.log("Registration Response:", response.data);

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
  return (
    <View style={styles.outerContainer}>
      <View>
        <LogoComponent />
      </View>

      <Text style={styles.titleFormScreen}>Sign Up</Text>
      <View style={styles.formContainer}>
        <View>
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
          <TextInput
            style={styles.inputDesign}
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
    backgroundColor: Colors.cardColor,
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
