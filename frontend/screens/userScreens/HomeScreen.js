import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import Colors from "../../utils/colors";
import axios from "axios";
import { Url } from "../../core/helper/Url";
import { useSelector } from "react-redux";
import BusMarkerImage from "../../assets/bus-station.png";

const HomeScreen = ({ navigation }) => {
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

      if (response.data && response.data.locations) {
        setDriverLocations(response.data.locations);
      } else {
        console.log("Invalid response structure:", response.data);
      }
    } catch (error) {
      console.log(`Error fetching driver locations: ${error.message}`);
    }
  };

  const updateUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
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
    } catch (error) {
      console.error("Error getting user location:", error.message);
    }
  };

  useEffect(() => {
    getDriversLocation();

    const intervalId = setInterval(() => {
      getDriversLocation();
      updateUserLocation();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  async function verifyPermissions() {
    const { status = PermissionStatus.UNDETERMINED } = locationPermissionInformation || {};

    if (status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!", "You need to grant location permissions to use this app.", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Go to Settings",
          onPress: () => Linking.openSettings(),
        },
      ]);
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
  const handleMarker = (driver_id) => {
    navigation.navigate("BusDetailScreen", driver_id);
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true} followsUserLocation={true}>
        {driverLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={`Driver ${location.driver_id}`}
            image={BusMarkerImage}
            onPress={() => handleMarker(location.driver_id)}
          />
        ))}
      </MapView>
      <Pressable onPress={() => getLocationHandler()}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get Location</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

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
    padding: 15,
    backgroundColor: Colors.primary500,
    borderRadius: 30,
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
