import React from "react";
import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QrScreen = () => {
  const dataToEncode = "YourDataHere";

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <QRCode value={dataToEncode} size={200} color="black" backgroundColor="white" />
    </View>
  );
};

export default QrScreen;
