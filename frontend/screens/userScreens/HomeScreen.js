import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import Colors from "../../utils/colors";
import axios from "axios";
import { Url } from "../../core/redux/helper/Url";
import { useSelector } from "react-redux";
import BusMarkerImage from "../../assets/bus-station.png";

const HomeScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [region, setRegion] = useState(null);
  const [driverLocations, setDriverLocations] = useState([]);

  const getDriversLocation = async () => {
    try {
      const response = await axios.get(
        `${Url}/api/get/driver/location`,
        {},
        { headers: { Authorization: authorization } }
      );
      setDriverLocations(response.data.locations);
    } catch (error) {
      console.log(`error ${error}`);
    }
  };

  useEffect(() => {
    getDriversLocation();

    const intervalId = setInterval(() => {
      getDriversLocation();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

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
      <MapView style={styles.map} region={region} showsUserLocation={true} followsUserLocation={true}>
        {driverLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={`Driver ${location.driver_id}`}
            image={BusMarkerImage}
            style={{ width: 2, height: 2 }}
          />
        ))}
      </MapView>
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
    flex: 1,
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
