import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";
import Button from "../../components/common/Button";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import Colors from "../../utils/colors";

const UserRideScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [scannerKey, setScannerKey] = useState(Date.now());
  const [startLat, setStartLat] = useState(null);
  const [startLon, setStartLon] = useState(null);
  const [endLat, setEndLat] = useState(null);
  const [endLon, setEndLon] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [scanCount, setScanCount] = useState(0);

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
      if (scanCount === 0) {
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
        showAlert("Enjoy your ride !");
        setScanCount(1);
      } else if (scanCount === 1) {
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

        const final_distance = distance(startLat, endLat, startLon, endLon);
        showAlert(`End ride type ${3} Km and in ${3} minutes!`);

        setScanCount(0);
      }
    } catch (error) {
      setScanned(false);
    }
  };

  const handleScanButtonPress = () => {
    setScanned(false);
    setScannerKey(Date.now());
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);

    if (alertMessage.includes("End ride type")) {
      navigation.navigate("UserFeedbackScreen");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function distance(startLat, endLat, startLon, endLon) {
    const earthRadius = 6371;

    const lat1 = deg2rad(startLat);
    const lon1 = deg2rad(startLon);
    const lat2 = deg2rad(endLat);
    const lon2 = deg2rad(endLon);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return Math.round(distance);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
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

      <Modal isVisible={isAlertVisible} onBackdropPress={hideAlert}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertMessage}>{alertMessage}</Text>
          <Pressable style={styles.alertButton} onPress={hideAlert}>
            <Text style={styles.alertButtonText}>OK</Text>
          </Pressable>
        </View>
      </Modal>
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

  alertContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  alertButton: {
    backgroundColor: Colors.primary500,
    padding: 15,
    borderRadius: 8,
    minWidth: 100,
  },
  alertButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
