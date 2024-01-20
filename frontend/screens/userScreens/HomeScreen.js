import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import Colors from "../../utils/colors";
import axios from "axios";
import { Url } from "../../core/redux/helper/Url";

const HomeScreen = () => {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [region, setRegion] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);

  const getDriversLocation = async () => {
    try {
      const response = await axios.post(`${Url}/api/get/driver/location`);
      console.log(response.data);
    } catch (error) {
      console.log(`error ${error}`);
    }
  };
  getDriversLocation();
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
    const newRegion = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation={true} followsUserLocation={true} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => getLocationHandler()}>
          <Text style={styles.buttonText}>Get Location</Text>
        </Pressable>
      </View>
    </View>
  );
};

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
    padding: 10,
    backgroundColor: Colors.primary500,
    borderRadius: 30,
    width: "65%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
