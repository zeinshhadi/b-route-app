import React from "react";
import { Image, StyleSheet } from "react-native";

const LogoComponent = () => {
  return <Image style={styles.image} source={require("../../assets/images/logo.png")} />;
};

export default LogoComponent;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 180,
    alignSelf: "center",
  },
});
