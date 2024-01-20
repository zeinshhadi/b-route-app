import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, PermissionStatus } from "expo-location";
import { Url } from "../../core/redux/helper/Url";
import axios from "axios";
const DriverHomeScreen = () => {
  const authState = useSelector((state) => state.auth);
  const driver_id = authState.user.id;
  const authorization = "bearer " + authState.token;
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const [fetchLocation, setFetchLocation] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (locationPermission !== PermissionStatus.GRANTED) {
          await requestLocationPermission();
          return;
        }

        const locationData = await getCurrentPositionAsync({});
        const lat = locationData.coords.latitude;
        const lon = locationData.coords.longitude;
        setLocation({ lat, lon });
        setInitialFetchComplete(true);
        if (fetchLocation === false) {
          const get_location_driver = async ({ lat, lon }) => {
            try {
              const response = await axios.post(
                `${Url}/api/driver/location`,
                { lat, lon },
                { headers: { Authorization: authorization } }
              );
              if (response.location) {
                console.log(`location is ${response.location}`);
              }
            } catch (error) {
              console.log(`error creating driver location ${error}`);
            }
          };

          get_location_driver({ lat, lon });
          setFetchLocation(true);
        }
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Could not fetch location. Please try again.");
      }
    };

    getLocation();

    if (initialFetchComplete) {
      const intervalId = setInterval(getLocation, 10000);
      return () => clearInterval(intervalId);
    }
  }, [locationPermission, initialFetchComplete]);

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    setLocationPermission(status);
  };

  useEffect(() => {
    if (location) {
      let lat = location.lat;
      let lon = location.lon;

      console.log("Before API Call - Lat:", lat, "Lon:", lon);

      const update_driver_location = async (lat, lon) => {
        try {
          const response = await axios.post(
            `${Url}/api/update/location`,
            { lat, lon },
            {
              headers: {
                Authorization: authorization,
              },
            }
          );
          console.log("Response:", response.data);
        } catch (error) {
          console.error("Error updating driver location:", error.message);
        }
      };

      update_driver_location(lat, lon);
    }
  }, [location, driver_id]);

  return (
    <View style={styles.driverHomeScreenContainer}>
      <QRCode
        value={JSON.stringify({ lat: location?.lat, lon: location?.lon, driver_id })}
        size={200}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

export default DriverHomeScreen;

const styles = StyleSheet.create({
  driverHomeScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
