import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import Login from "../../core/redux/actions/authActions";
import Colors from "../../utils/colors";

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
      setLoading(false);
      if (authState.user.role_type == "passenger") {
        navigation.navigate("HomeScreen");
      } else if (authState.user.role_type == "admin") {
        navigation.navigate("AdminHomeScreen");
      } else {
        navigation.navigate("DriverHomeScreen");
      }
    } else if (authState.error) {
      setLoading(false);
      setError(authState.error);
      return Alert.alert(error);
    }
  }, [authState, navigation]);
  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      setError("All fields should be filled");
      setLoading(false);
      return Alert.alert("All fields should be filled");
    } else {
      dispatch(Login({ email, password }));
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View>
        <LogoComponent />
      </View>
      <Text style={styles.titleFormScreen}>Log In</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputDesign}
          placeholder="Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputDesign}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
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
  screenSizes: { flex: 1 },
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
