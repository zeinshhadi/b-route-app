import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import LogoComponent from "../../components/common/LogoComponent";
import axios from "axios";
const AddBusScreen = ({ navigation }) => {
  const [busInfo, setBusInfo] = useState({
    vin: 0,
    color: "",
    plate_number: 0,
    model: "",
    number_of_seats: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setBusInfo((prevBusInfo) => ({
      ...prevBusInfo,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    console.log(busInfo);
  };
  return (
    <View style={styles.outerContainer}>
      <Text style={styles.titleFormScreen}>Add Bus</Text>
      <View style={styles.formContainer}>
        <View>
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus vin"
            value={busInfo.firstName}
            onChangeText={(text) => handleInputChange("vin", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus color"
            value={busInfo.lastName}
            onChangeText={(text) => handleInputChange("color", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus plate number"
            value={busInfo.plate_number}
            onChangeText={(text) => handleInputChange("plate_number", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter bus model"
            secureTextEntry
            value={busInfo.model}
            onChangeText={(text) => handleInputChange("model", text)}
          />
          <TextInput
            style={styles.inputDesign}
            placeholder="Enter number of seats"
            value={busInfo.number_of_seats}
            onChangeText={(text) => handleInputChange("number_of_seats", text)}
          />
        </View>
      </View>
      <Button onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Bus</Text>}
      </Button>
    </View>
  );
};

export default AddBusScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "white",
  },
  inputDesign: {
    borderRadius: 5,
    backgroundColor: "#D9D9D9",
    height: 50,
    width: "100%",
    margin: 5,
    padding: 8,
  },
  formContainer: {
    width: "80%",
    justifyContent: "center",
  },

  titleFormScreen: {
    fontWeight: "500",
    fontSize: 24,
  },
});
