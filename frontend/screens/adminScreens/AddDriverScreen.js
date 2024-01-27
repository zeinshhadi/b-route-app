import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import Button from "../../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../utils/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { Url } from "../../core/helper/Url";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const AddDriverScreen = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const [data, setData] = useState([{ label: "", value: "" }]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [fileName, setFileName] = useState(null);
  const pickImage = async () => {
    const imgDir = FileSystem.documentDirectory + "images/";
    const ensureDirExists = async () => {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    };
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result.assets);
      } else {
        setSelectedImage(null);
      }

      const type = result.assets[0].type;
      console.log(`Type: ${type}`);

      const originalFileName = result.assets[0].fileName;

      setImageType(type);

      const fileTypeSplit = type.split("/");
      console.log(`File Type Split: ${fileTypeSplit}`);

      const fileExtension = fileTypeSplit.length >= 2 ? fileTypeSplit[1] : "jpg";

      const generatedFileName = originalFileName || `image_${Date.now()}.${fileExtension}`;
      console.log(`Generated FileName: ${generatedFileName}`);
      console.log(`FileName Type: ${typeof generatedFileName}`);

      setFileName(generatedFileName);
    } catch (error) {
      Alert.alert("No image selected");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Url}/api/free/buses`, {
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
    const image = selectedImage[0].uri;
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

      const formData = new FormData();
      formData.append("first_name", userData.firstName);
      formData.append("last_name", userData.lastName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("phone_number", userData.phoneNumber);
      formData.append("driver_license", userData.driverLicense);
      formData.append("bus_id", userData.busId);
      formData.append("image", {
        uri: selectedImage[0].uri,
        type: "image/jpeg",
        name: fileName,
      });

      const response = await axios.post(`${Url}/api/register/driver`, formData, {
        headers: {
          Authorization: authorization,
          "Content-Type": "multipart/form-data",
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
          image: null,
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
    <View style={styles.outerContainer}>
      <View style={styles.formContainer}>
        <ScrollView>
          <Pressable onPress={pickImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage[0].uri }} style={styles.driverImage} />
            ) : (
              <Image source={require("../../assets/images/profiledef.jpg")} style={styles.driverImage} />
            )}
          </Pressable>

          <View style={styles.innerFormContainer}>
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
          <Button onPress={handleRegisterDriver} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Add Driver</Text>}
          </Button>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddDriverScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "white",
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
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
    alignSelf: "center",
    marginTop: 15,
    gap: 5,
  },
  titleFormScreen: {
    fontWeight: "500",
    fontSize: 24,
  },
  driverImage: {
    height: 150,
    width: 150,
    margin: 10,
    borderRadius: 150,
    alignSelf: "center",
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
});
