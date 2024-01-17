import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ActivityIndicator, Image, ScrollView, Alert } from "react-native";
import Button from "../../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../utils/colors";
import axios from "axios";
import { useSelector } from "react-redux";
const AddDriverScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;

  const [data, setData] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.100:8000/api/free/buses", {
          headers: { Authorization: authorization },
        });

        const formattedData = response.data.buses.map((bus) => ({
          label: `Bus ${bus.id} - ${bus.model}`,
          value: bus.id,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchData();
  }, [authorization, handleRegisterDriver]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    driverLicense: "",
    busId: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleRegisterDriver = async () => {
    try {
      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.password ||
        !userData.phoneNumber ||
        !userData.driverLicense
      ) {
        console.error("Please fill in all fields");
        return;
      }

      setLoading(true);

      const registrationData = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone_number: userData.phoneNumber,
        bus_id: userData.busId,
        driver_license: userData.driverLicense,
        image: "abcabc",
      };

      console.log("Registration Request Data:", registrationData);

      const response = await axios.post("http://192.168.0.100:8000/api/register/driver", registrationData, {
        headers: {
          Authorization: authorization,
        },
      });

      console.log("Registration Response:", response.data.status);

      if (response.data.status === "success") {
        setUserData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          driverLicense: "",
          busId: 0,
        });
        setValue(null);
        Alert.alert("Driver Created successfully");
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
    <ScrollView>
      <View style={styles.outerContainer}>
        <View style={styles.driverImageContainer}>
          <Image style={styles.driverImage} source={require("../../assets/images/driver.jpg")} />
        </View>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your First Name"
              placeholderTextColor="black"
              value={userData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your Last Name"
              placeholderTextColor="black"
              value={userData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your email"
              placeholderTextColor="black"
              value={userData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your password"
              placeholderTextColor="black"
              secureTextEntry
              value={userData.password}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your phone number"
              placeholderTextColor="black"
              value={userData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
            />
            <TextInput
              style={styles.inputDesign}
              placeholder="Enter your Driver license"
              placeholderTextColor="black"
              value={userData.driverLicense}
              onChangeText={(text) => handleInputChange("driverLicense", text)}
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
              placeholder={!isFocus ? "Select Bus" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
                handleInputChange("busId", item.value);
              }}
            />
          </View>
        </View>
        <Button onPress={handleRegisterDriver} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Driver</Text>}
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddDriverScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    paddingBottom: 15,
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
  driverImage: {
    height: 150,
    width: 220,
    margin: 10,
    borderRadius: 10,
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
