import React from "react";
import { Text, View } from "react-native";

const UserRideScreen = () => {
  return (
    <View>
      <Text>Ride</Text>
    </View>
  );
};

export default UserRideScreen;

// import React from "react";
// import { Alert, Text, View } from "react-native";
// import QRCodeScanner from "react-native-qrcode-scanner";
// import { RNCamera } from "react-native-camera";
// const UserRideScreen = () => {
//   return <QRCodeScanner onRead={(data) => Alert(data)} flashMode={RNCamera.Constants.FlashMode.torch} />;
// };

// export default UserRideScreen;
