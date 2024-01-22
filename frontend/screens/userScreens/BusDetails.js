import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Url } from "../../core/helper/Url";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../utils/colors";

const BusDetails = ({ navigation }) => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const route = useRoute();
  const driver_id = route.params;
  const [busInformation, setBusInformation] = useState(null);
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState();
  const [driverImageUri, setDriverImageUri] = useState(null);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`${Url}/api/driver/bus/${driver_id}`, {
          headers: { Authorization: authorization },
        });

        const busData = response.data.bus;

        setBusInformation(busData);

        const numberOfSeats = busData.number_of_seats;
        console.log(busData);
        setNumberOfSeats(numberOfSeats);
        const { driver } = busData;
        if (driver && driver.user) {
          setDriverFirstName(driver.user.first_name);
          setDriverLastName(driver.user.last_name);
          const fullImageUrl = `${Url}/${busData.driver.image}`;
          setDriverImageUri(fullImageUrl);
          console.log(fullImageUrl);
        }
      } catch (error) {
        console.log(`error ${error}`);
      }
    };

    fetchBusData();
  }, [driver_id]);

  const renderSeats = () => {
    const seats = [];

    for (let i = 0; i < 9; i++) {
      seats.push(
        <View key={i} style={styles.seatContainer}>
          <MaterialIcons name="event-seat" size={44} color="grey" />
        </View>
      );
    }

    return seats;
  };

  const handleStartRide = () => {
    navigation.navigate("UserRideScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <DriverDetailsCard driverFirstName={driverFirstName} driverLastName={driverLastName} />
      <View style={styles.bigBusCardContainer}>
        <Text style={styles.bigBusCardContainerText}>Available Seats</Text>
        <Text style={styles.bigBusCardContainerText}>{numberOfSeats}</Text>
      </View>
      <View style={styles.seatBusCardContainerMain}>
        <View style={styles.seatRow}>{renderSeats().slice(0, 3)}</View>
        <View style={styles.seatRow}>{renderSeats().slice(3, 6)}</View>
        <View style={styles.seatRow}>{renderSeats().slice(6, 9)}</View>
      </View>
      <Pressable onPress={() => handleStartRide()}>
        <View style={styles.buttonStyle}>{<Text style={styles.buttonTextStyle}>Start your ride</Text>}</View>
      </Pressable>
    </View>
  );
};

export default BusDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    backgroundColor: "white",
  },
  rowInfo: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  bigBusCardContainerMain: {
    gap: 10,
  },
  bigBusCardContainer: {
    backgroundColor: Colors.cardColor,
    borderRadius: 10,
    marginHorizontal: 25,
    gap: 10,
    padding: 20,
  },
  bigBusCardContainerText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  seatBusCardContainerMain: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    gap: 20,
    width: "87%",
    alignSelf: "center",
    borderRadius: 10,
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  seatContainer: {
    marginBottom: 10,
  },
  buttonStyle: {
    alignSelf: "center",
    backgroundColor: Colors.primary500,
    padding: 10,
    width: "85%",
    borderRadius: 10,
  },
  buttonTextStyle: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
