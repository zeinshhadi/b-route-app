import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useSelector } from "react-redux";
const UserRideScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [rideStatus, setRideStatus] = useState(false);
  const [startLongitude, setStartLongitude] = useState(0);
  const [startLatitude, setStartLatitude] = useState(0);
  const [endLongitude, setEndLongitude] = useState(0);
  const [endLatitude, setEndLatitude] = useState(0);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      if (rideStatus == false) {
        const decodedData = JSON.parse(data);
        console.log("Decoded Data:", decodedData);
        console.log(decodedData.lon);
        rideDetails = {
          start_longitude: startLongitude,
          start_Latitude: startLatitude,
        };
        const response = await axios.post("http://192.168.0.101:8000/api/start/ride", rideDetails, {
          headers: { Authorization: authorization },
        });
        console.log(response.data);
      } else {
        const decodedData = JSON.parse(data);
        console.log("Decoded Data:", decodedData);
        console.log(decodedData.lon);
      }
    } catch (error) {
      console.error("Error parsing barcode data:", error);
    }
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
    </View>
  );
};

export default UserRideScreen;
const styles = StyleSheet.create({ container: { flex: 1 } });
