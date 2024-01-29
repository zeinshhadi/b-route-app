import React from "react";
import LogoComponent from "../components/common/LogoComponent";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/common/Button";
const SplashScreen = ({ navigation }) => {
  const handleSplashButton = () => {
    navigation.navigate("LogInScreen");
  };
  return (
    <View style={styles.splashScreenContainer}>
      <LogoComponent />

      <View style={styles.splashTitleContainer}>
        <Text style={styles.splashTitle}>Welcome to B-ROUTE</Text>
        <Text style={styles.splashFirstText}>Your Ultimate Bus Companion!</Text>
      </View>
      <View style={styles.splashParagraphContainer}>
        <Text style={styles.splashParagraph}>
          Get ready for a seamless journey with real-time bus updates, live arrival times, and seat availability.
          Whether you're a daily commuter, a concerned parent, or an adventurous tourist, we've got you covered!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSplashButton}>
          <Text>Continue</Text>
        </Button>
      </View>
    </View>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    gap: 10,
  },
  splashTitleContainer: {
    marginVertical: 20,
  },
  splashParagraphContainer: {
    width: "90%",
    alignSelf: "center",
  },
  splashTitle: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
  },
  splashFirstText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },
  splashParagraph: {
    textAlign: "center",
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 100,
  },
});
