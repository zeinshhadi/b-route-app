import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import Button from "../../components/common/Button";

const HomeScreen = () => {
  const [token, setToken] = useState(null);
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
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
  async function verifyPermissions() {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!", "You need to grant location permissions to use this app.");
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    console.log(lat, lon);
  }
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />

      <View style={styles.buttonContainer}>
        <Button onPress={() => getLocationHandler()}>
          <Text>Get Location</Text>
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
  },
});
