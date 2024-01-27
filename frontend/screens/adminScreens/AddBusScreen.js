import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert, Image } from "react-native";
import Button from "../../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../utils/colors";
import { useSelector } from "react-redux";
import axios from "axios";
import { Url } from "../../core/helper/Url";

const AddBusScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [data, setData] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url}/api/zones`, {
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
    vin: "",
    color: "",
    plate_number: "",
    model: "",
    number_of_seats: "",
    zone_id: "",
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

      const response = await axios.post(`${Url}/api/register/bus`, registrationData, {
        headers: {
          Authorization: authorization,
        },
      });

      console.log("Registration Response:", response.data.status);

      if (response.data.status === "success") {
        Alert.alert("Bus Created successfully");
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
        <ScrollView>
          <Image style={styles.image} source={require("../../assets/images/addbusimg.png")} />
          <View style={styles.innerFormContainer}>
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter bus vin"
              placeholderTextColor="black"
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
              value={busInfo.plate_number}
              onChangeText={(text) => handleInputChange("plate_number", text)}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: Colors.primary500 }]}
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
              placeholderTextColor="black"
              onChangeText={(text) => handleInputChange("number_of_seats", text)}
            />
          </View>
          <Button onPress={handleRegister} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Bus</Text>}
          </Button>
        </ScrollView>
      </View>
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
    backgroundColor: "white",
    height: 50,
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "grey",
  },
  formContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    marginTop: 15,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
    backgroundColor: Colors.cardColor,
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
  innerFormContainer: {
    gap: 5,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
