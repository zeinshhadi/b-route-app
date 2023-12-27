import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    console.log("User Data:", userData);
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
            placeholder="Enter your Full Name"
            value={userData.fullName}
            onChangeText={(text) => handleInputChange("fullName", text)}
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
        </View>
      </View>
      <Button onPress={handleRegister}>Sign Up</Button>
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
