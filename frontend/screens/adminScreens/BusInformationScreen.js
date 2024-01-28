import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import BusInfoCard from "../../components/cards/busDetails/BusInfoCard";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../utils/colors";
import axios from "axios";
import { Url } from "../../core/helper/Url";
import { useSelector } from "react-redux";
const BusInformationScreen = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const item = route.params.item;
  const { id, model, plate_number, color, vin, number_of_seats } = item;
  const userId = item.driver.user.id;
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${Url}/api/delete/driver/${userId}`, {
        headers: { Authorization: authorization },
      });
      if (response.status === "success") {
        navigation.navigate("BusesRegisteredScreen");
      }
    } catch (error) {
      setLoading(false);
      console.log(`error : ${error}`);
    }
    setLoading(false);
  };
  const driverName = item.driver.user.first_name + " " + item.driver.user.last_name;
  const driverImageUri = item.driver.image;
  return (
    <View style={styles.BusInformationContainer}>
      <DriverDetailsCard driverImageUri={driverImageUri} />
      <BusInfoCard
        id={id}
        model={model}
        plateNumber={plate_number}
        color={color}
        vin={vin}
        numberOfSeats={number_of_seats}
        driverCredentials={driverName}
      />

      <View style={styles.buttonPosition}>
        <Pressable onPress={() => setShowDelete(!showDelete)}>
          <MaterialIcons name="delete" size={24} color={Colors.primary500} />
        </Pressable>
      </View>

      {showDelete && (
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          {loading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={styles.deleteButtonText}>Confirm Delete</Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default BusInformationScreen;

const styles = StyleSheet.create({
  BusInformationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    gap: 10,
  },
  buttonPosition: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  deleteButton: {
    backgroundColor: Colors.primary500,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  deleteButtonText: {
    color: "white",
  },
});
