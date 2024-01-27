import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Pressable, Modal, ScrollView } from "react-native";
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
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState();
  const [driverImageUri, setDriverImageUri] = useState();
  const [seatColors, setSeatColors] = useState(Array(10).fill("grey"));
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get(`${Url}/api/driver/bus/${driver_id}`, {
          headers: { Authorization: authorization },
        });

        const busData = response.data.bus;
        const numberOfSeats = busData.number_of_seats;

        setDriverImageUri(response.data.bus.driver.image);
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
  const openModal = async () => {
    try {
      const response = await axios.get(`${Url}/api/driver/reviews/${driver_id}`, {
        headers: { Authorization: authorization },
      });
      console.log(response.data);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(`error ${error}`);
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get(`${Url}/api/get/seat`);

        const newSeatColors = response.data.seats.map((seat) => (seat.status === 1 ? "grey" : Colors.primary500));
        setSeatColors(newSeatColors);
      } catch (error) {
        console.log(`error ${error}`);
      }
    };

    fetchSeatData();

    const intervalId = setInterval(fetchSeatData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const renderSeats = () => {
    const seats = [];

    for (let i = 0; i <= 10; i++) {
      seats.push(
        <View style={[styles.seatContainer]} key={i}>
          <MaterialIcons name="event-seat" size={44} color={seatColors[i - 1]} />
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
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <ScrollView>
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewContainer}>
                <Text>{review.text}</Text>
              </View>
            ))}
          </ScrollView>
          <Pressable onPress={closeModal}>
            <Text>Close</Text>
          </Pressable>
        </View>
      </Modal>
      <DriverDetailsCard
        driverFirstName={driverFirstName}
        driverLastName={driverLastName}
        driverImageUri={driverImageUri}
      />
      <View style={styles.bigBusCardContainer}>
        <Text style={styles.bigBusCardContainerText}>Available Seats</Text>
        <Text style={styles.bigBusCardContainerText}>{numberOfSeats}</Text>
      </View>
      <View style={styles.seatBusCardContainerMain}>
        <View style={styles.seatRow}>{renderSeats().slice(1, 4)}</View>
        <View style={styles.seatRow}>{renderSeats().slice(4, 7)}</View>
        <View style={styles.seatRow}>{renderSeats().slice(7, 10)}</View>
      </View>
      <Pressable onPress={() => handleStartRide()}>
        <View style={styles.buttonStyle}>{<Text style={styles.buttonTextStyle}>Start your ride</Text>}</View>
      </Pressable>
      <View style={styles.buttonPosition}>
        <Pressable onPress={openModal}>
          <MaterialIcons name="feedback" size={24} color={Colors.primary500} />
        </Pressable>
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
  buttonPosition: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteButton: {
    backgroundColor: Colors.primary500,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
