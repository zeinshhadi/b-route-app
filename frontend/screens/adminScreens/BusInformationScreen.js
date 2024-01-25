import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import BusInfoCard from "../../components/cards/busDetails/BusInfoCard";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../utils/colors";
const BusInformationScreen = ({ navigation }) => {
  const route = useRoute();

  const item = route.params.item;
  const { id, model, plate_number, color, vin, number_of_seats, zone_id } = item;

  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this driver?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          navigation.goBack();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.BusInformationContainer}>
      <DriverDetailsCard driverFirstName={item.driver.user.first_name} driverLastName={item.driver.user.last_name} />
      <BusInfoCard
        id={id}
        model={model}
        plateNumber={plate_number}
        color={color}
        vin={vin}
        numberOfSeats={number_of_seats}
        zoneId={zone_id}
      />

      <View style={styles.buttonPosition}>
        <Pressable onPress={() => setShowDelete(!showDelete)}>
          <MaterialIcons name="delete" size={24} color={Colors.primary500} />
        </Pressable>
      </View>

      {showDelete && (
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Confirm Delete</Text>
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
    gap: 20,
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
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  deleteButtonText: {
    color: "white",
  },
});
