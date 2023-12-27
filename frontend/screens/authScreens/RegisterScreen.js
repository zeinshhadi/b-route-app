import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = () => {
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Phone Number:", phoneNumber);
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
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
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
