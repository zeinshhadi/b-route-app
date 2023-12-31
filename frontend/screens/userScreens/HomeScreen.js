import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const retrievedToken = await retrieveToken();
      setToken(retrievedToken);
    };

    fetchToken();
  }, []);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      return token;
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  return <Text>Hello from Home Screen</Text>;
};

export default HomeScreen;
