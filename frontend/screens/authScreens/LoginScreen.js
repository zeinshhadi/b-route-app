import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import login from "../../core/redux/actions/authActions";

const LoginScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };
  useEffect(() => {
    if (authState.isLoggedIn) {
      navigation.navigate("HomeScreen");
    }
    if (authState.error) {
      setError(authState.error);
    }
  }, [authState, navigation]);
  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields should be filled");
    } else {
      dispatch(login({ email, password }));
    }
  };
  // const handleLogin = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await axios.post("http://192.168.1.7:8000/api/login", {
  //       email,
  //       password,
  //     });

  //     if (response.data && response.data.status === "success") {
  //       const token = response.data.authorization.token;

  //       try {
  //         await AsyncStorage.setItem("userToken", token);
  //         console.log(`Token stored successfully: ${token}`);
  //       } catch (error) {
  //         console.error("Error storing token:", error);
  //       }

  //       if (response.data.user.role_type === "passenger") {
  //         navigation.navigate("HomeScreen");
  //       } else {
  //         navigation.navigate("AdminHomeScreen");
  //       }
  //     } else {
  //       console.error("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.outerContainer}>
      <View>
        <LogoComponent />
      </View>
      <Text style={styles.titleFormScreen}>Log In</Text>
      <View style={styles.formContainer}>
        <View>
          <TextInput style={styles.inputDesign} placeholder="Enter your email" value={email} onChangeText={setEmail} />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
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
    backgroundColor: "white",
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
