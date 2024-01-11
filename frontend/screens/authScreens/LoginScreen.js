import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
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
      if (authState.user.role_type == "passenger") {
        navigation.navigate("HomeScreen");
      } else if (authState.user.role_type == "admin") {
        navigation.navigate("AdminHomeScreen");
      }
    }
    if (authState.error) {
      setError(authState.error);
    }
  }, [authState, navigation]);
  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields should be filled");
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
        <View>
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter your password"
            placeholderTextColor="black"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <Button onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="white" /> : <Text>LogIn</Text>}
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
    backgroundColor: Colors.cardColor,
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
