import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
const QrScreen = () => {
  const authState = useSelector((state) => state.auth);
  driver_id = authState.user.id;
  const dataToEncode = "YourDataHere";

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

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QRCode value={dataToEncode} size={200} color="black" backgroundColor="white" />
    </View>
  );
};

export default QrScreen;
