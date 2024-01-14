import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, PermissionStatus } from "expo-location";
import Button from "../../components/common/Button";

const DriverHomeScreen = () => {
  const authState = useSelector((state) => state.auth);
  const driver_id = authState.user.id;
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

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
        setInitialFetchComplete(true); // Set the flag after the initial fetch
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Could not fetch location. Please try again.");
      }
    };

    // Fetch location initially
    getLocation();

    // Set up interval for subsequent refreshes only if the initial fetch is complete
    if (initialFetchComplete) {
      const intervalId = setInterval(getLocation, 10000); // Refresh every 10 seconds
      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [locationPermission, initialFetchComplete]);

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    setLocationPermission(status);
  };

  useEffect(() => {
    if (location) {
      const dataToEncode = JSON.stringify({ lat: location.lat, lon: location.lon, driver_id });
      console.log(dataToEncode);
    }
  }, [location, driver_id]);

  const getLocationHandler = async () => {
    try {
      await getLocation();
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not fetch location. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QRCode
        value={JSON.stringify({ lat: location?.lat, lon: location?.lon, driver_id })}
        size={200}
        color="black"
        backgroundColor="white"
      />
      <View style={{ marginTop: 30, width: "100%", justifyContent: "center", alignItems: "center" }}>
        <Button onPress={getLocationHandler}>Get Location</Button>
      </View>
    </View>
  );
};

export default DriverHomeScreen;
