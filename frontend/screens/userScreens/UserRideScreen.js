import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Axios } from "axios";
const UserRideScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [rideStatus, setRideStatus] = useState(false);
  const [startLongitude, setStartLongitude] = useState();
  const [startLatitude, setStartLatitude] = useState();
  const [endLongitude, setEndLongitude] = useState();
  const [endLatitude, setEndLatitude] = useState();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const decodedData = JSON.parse(data);
      console.log("Decoded Data:", decodedData);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      const response = await Axios.post("http://192.168.0.101:8000/api/start/ride");
      console.log(response.data);
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
