import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../utils/colors";
const AddBusScreen = () => {
  const data = [
    { label: "Zone 1", value: "1" },
    { label: "Zone 2", value: "2" },
    { label: "Zone 3", value: "3" },
    { label: "Zone 4", value: "4" },
    { label: "Zone 5", value: "5" },
    { label: "Zone 6", value: "6" },
    { label: "Zone 7", value: "7" },
    { label: "Zone 8", value: "8" },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [busInfo, setBusInfo] = useState({
    vin: "",
    color: "",
    plate_number: "",
    model: "",
    number_of_seats: "",
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
        <ScrollView>
          <View>
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus vin"
              placeholderTextColor="black"
              value={busInfo.firstName}
              onChangeText={(text) => handleInputChange("vin", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus color"
              placeholderTextColor="black"
              value={busInfo.lastName}
              onChangeText={(text) => handleInputChange("color", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus plate number"
              placeholderTextColor="black"
              value={busInfo.plate_number}
              onChangeText={(text) => handleInputChange("plate_number", text)}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Zone" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
                handleInputChange("BusId", item.value);
              }}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus model"
              secureTextEntry
              value={busInfo.model}
              placeholderTextColor="black"
              onChangeText={(text) => handleInputChange("model", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter number of seats"
              value={busInfo.number_of_seats}
              placeholderTextColor="black"
              onChangeText={(text) => handleInputChange("number_of_seats", text)}
            />
          </View>
        </ScrollView>
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
    paddingBottom: 10,
  },
  inputDesign: {
    borderRadius: 5,
    backgroundColor: Colors.cardColor,
    height: 50,
    width: "100%",
    marginVertical: 5,
    padding: 8,
  },
  formContainer: {
    width: "90%",
    justifyContent: "center",
  },
  titleFormScreen: {
    fontWeight: "500",
    fontSize: 24,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
