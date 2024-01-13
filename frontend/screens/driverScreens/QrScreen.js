import React, { useEffect, useState } from "react";
import { View, Alert, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, PermissionStatus } from "expo-location";

const QrScreen = () => {
  const authState = useSelector((state) => state.auth);
  const driver_id = authState.user.id;
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    setLocationPermission(status);
  };

  const getLocationHandler = async () => {
    try {
      if (locationPermission !== PermissionStatus.GRANTED) {
        await requestLocationPermission();
        return;
      }

      const locationData = await getCurrentPositionAsync({});
      const lat = locationData.coords.latitude;
      const lon = locationData.coords.longitude;
      setLocation({ lat, lon });

      const dataToEncode = JSON.stringify({ lat, lon, driver_id });
      console.log(dataToEncode);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not fetch location. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QRCode value={JSON.stringify(location)} size={200} color="black" backgroundColor="white" />
      <Button title="Get Location" onPress={getLocationHandler} />
    </View>
  );
};

export default QrScreen;
