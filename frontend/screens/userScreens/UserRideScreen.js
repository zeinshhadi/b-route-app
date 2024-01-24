import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";
import Button from "../../components/common/Button";

const UserRideScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [rideStatus, setRideStatus] = useState(false);
  const [scannerKey, setScannerKey] = useState(Date.now());
  const [startLat, setStartLat] = useState(null);
  const [startLon, setStartLon] = useState(null);
  const [endLat, setEndLat] = useState(null);
  const [endLon, setEndLon] = useState(null);
  const [startTime, setStartTime] = useState(null);
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
      if (rideStatus === false) {
        const decodedData = JSON.parse(data);
        setStartLat(decodedData.lat);
        setStartLon(decodedData.lon);
        const user_id = decodedData.driver_id;
        const response = await axios.post(
          `${Url}/api/add/ride`,
          {
            start_latitude: decodedData.lat,
            start_longitude: decodedData.lon,
            user_id,
          },
          {
            headers: { Authorization: authorization },
          }
        );
        setStartTime(new Date());
        console.log(response.data);
        setRideStatus(true);
        alert(`Enjoy your ride !`);
      } else {
        const endTime = new Date();
        const timeDifference = (endTime - startTime) / 1000;
        const minutes = Math.floor(timeDifference / 60);
        const decodedData = JSON.parse(data);
        setEndLat(decodedData.lat);
        setEndLon(decodedData.lon);
        const user_id = decodedData.driver_id;
        await axios.post(
          `${Url}/api/end/ride`,
          {
            end_latitude: decodedData.lat,
            end_longitude: decodedData.lon,
            user_id,
          },
          {
            headers: { Authorization: authorization },
          }
        );

        setRideStatus(false);

        const final_distance = distance(startLat, endLat, startLon, endLon);
        navigation.navigate("UserFeedbackScreen");
        alert(`end ride type ${final_distance} and in ${minutes} minutes!`);
      }
    } catch (error) {
      setScanned(false);
      console.error("error", error);
    }
  };

  const handleScanButtonPress = () => {
    setScanned(false);
    setScannerKey(Date.now());
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function distance(startLat, endLat, startLon, endLon) {
    startLon = (startLon * Math.PI) / 180;
    endLon = (endLon * Math.PI) / 180;
    startLat = (startLat * Math.PI) / 180;
    endLat = (endLat * Math.PI) / 180;

    let dlon = endLon - startLon;
    let dlat = endLat - startLat;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(startLat) * Math.cos(endLat) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;

    return c * r;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <BarCodeScanner
          key={scannerKey}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={styles.buttonPosition}>
        <Button onPress={handleScanButtonPress}>Scan your ride</Button>
      </View>
    </View>
  );
};

export default UserRideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "50%",
  },
  innerContainer: {
    flex: 1,
    height: "50%",
  },
  buttonPosition: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
