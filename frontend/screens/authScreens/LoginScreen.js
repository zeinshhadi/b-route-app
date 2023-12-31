import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("http://192.168.0.102:8000/api/login", {
        email,
        password,
      });

      if (response.data && response.data.status === "success") {
        const token = response.data.authorization.token;

        // Store the token in AsyncStorage
        try {
          await AsyncStorage.setItem("userToken", token);
          console.log(`Token stored successfully: ${token}`);
        } catch (error) {
          console.error("Error storing token:", error);
        }

        if (response.data.user.role_type === "passenger") {
          navigation.navigate("HomeScreen");
        } else {
          navigation.navigate("AdminHomeScreen");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
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
      <Button onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Login</Text>}
      </Button>
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
