import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/redux/helper/Url";
import Button from "../../components/common/Button";
const UserRideScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [rideStatus, setRideStatus] = useState(false);

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
        console.log(response.data);
        setRideStatus(true);
      } else {
        const decodedData = JSON.parse(data);
        const user_id = decodedData.driver_id;
        const response = await axios.post(
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
        console.log(response.data);
        setRideStatus(false);
        navigation.navigate("UserFeedbackScreen");
      }
    } catch (error) {
      console.error("error", error);
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
      {scanned && <Button onPress={() => setScanned(false)}>Scan to end your ride </Button>}
    </View>
  );
};

export default UserRideScreen;
const styles = StyleSheet.create({ container: { flex: 1 } });
