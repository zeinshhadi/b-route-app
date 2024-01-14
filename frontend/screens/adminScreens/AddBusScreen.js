import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Button from "../../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../utils/colors";
import { useSelector } from "react-redux";
import axios from "axios";
const AddBusScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [data, setData] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.101:8000/api/zones", {
          headers: { Authorization: authorization },
        });

        const formattedData = response.data["zones"].map((zone) => ({
          label: `Zone ${zone.id} - ${zone.zone_name}`,
          value: zone.id,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    fetchData();
  }, [authorization]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [busInfo, setBusInfo] = useState({
    vin: 0,
    color: "",
    plate_number: 0,
    model: "",
    number_of_seats: 0,
    zone_id: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setBusInfo((prevBusInfo) => ({
      ...prevBusInfo,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      if (!busInfo.vin || !busInfo.color || !busInfo.plate_number || !busInfo.model || !busInfo.number_of_seats) {
        console.error("Please fill in all fields");
        return;
      }

      setLoading(true);

      const registrationData = {
        vin: busInfo.vin,
        color: busInfo.color,
        plate_number: busInfo.plate_number,
        model: busInfo.model,
        number_of_seats: busInfo.number_of_seats,
        zone_id: busInfo.zone_id,
      };

      console.log("Registration Request Data:", registrationData);

      const response = await axios.post("http://192.168.0.101:8000/api/register/bus", registrationData, {
        headers: {
          Authorization: authorization,
        },
      });

      console.log("Registration Response:", response.data.status);

      if (response.data.status === "success") {
        console.log("Bus Created successfully");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error.message || error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.formContainer}>
        <ScrollView style={styles.scrollViewFull}>
          <View style={styles.innerContainerAddBus}>
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus vin"
              placeholderTextColor="black"
              type="number"
              value={busInfo.vin}
              onChangeText={(text) => handleInputChange("vin", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus color"
              placeholderTextColor="black"
              value={busInfo.color}
              onChangeText={(text) => handleInputChange("color", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus plate number"
              placeholderTextColor="black"
              type="number"
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
                handleInputChange("zone_id", item.value);
              }}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus model"
              value={busInfo.model}
              placeholderTextColor="black"
              onChangeText={(text) => handleInputChange("model", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter number of seats"
              value={busInfo.number_of_seats}
              type="number"
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
  scrollViewFull: {
    marginTop: 30,
  },
  innerContainerAddBus: {
    flex: 1,
  },
});
