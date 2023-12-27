import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.outerContainer}>
      <View>
        <LogoComponent />
      </View>
      <Text style={styles.titleFormScreen}>Log in</Text>
      <View style={styles.formContainer}>
        <View>
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
        </View>
      </View>
      <Button onPress={handleLogin}>Login</Button>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Pressable onPress={handleRegister}>
          <Text style={styles.registerLink}> Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    margin: 10,
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
