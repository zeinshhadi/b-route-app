import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, Platform } from "react-native";
import DriverDetailsCard from "../../components/cards/DriverDetailsCard";
import SmallCardDetails from "../../components/cards/SmallCardDetails";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Url } from "../../core/redux/helper/Url";
import { useSelector } from "react-redux";
const BusDetails = () => {
  const authState = useSelector((state) => state.auth);
  const authorization = "bearer " + authState.token;
  const route = useRoute();
  const driver_id = route.params;
  const [busInformation, setBusInformation] = useState(null);
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState();

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`${Url}/api/driver/bus/${driver_id}`, {
          headers: { Authorization: authorization },
        });

        const busData = response.data.bus;

        setBusInformation(busData);

        const numberOfSeats = busData.number_of_seats;
        console.log(numberOfSeats);
        setNumberOfSeats(numberOfSeats);
        const { driver } = busData;
        if (driver && driver.user) {
          setDriverFirstName(driver.user.first_name);
          setDriverLastName(driver.user.last_name);
        }
      } catch (error) {
        console.log(`error ${error}`);
      }
    };

    fetchBusData();
  }, [driver_id]);
  console.log("busInformation:", busInformation);
  return (
    <View style={styles.mainContainer}>
      <DriverDetailsCard driverFirstName={driverFirstName} driverLastName={driverLastName} />
      <SmallCardDetails numberOfSeats={numberOfSeats} />
      <View style={styles.bigBusCardContainerMain}>
        <View style={styles.bigBusCardContainer}>
          <Text style={styles.bigBusCardContainerText}>Next Zone</Text>
          <Text style={styles.bigBusCardContainerText}>3</Text>
        </View>
        <View style={styles.bigBusCardContainer}>
          <Text style={styles.bigBusCardContainerText}>Next Stop Arrival</Text>
          <Text style={styles.bigBusCardContainerText}>8:30 am</Text>
        </View>
      </View>
    </View>
  );
};

export default BusDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
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
    backgroundColor: "#ccc",
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
});
