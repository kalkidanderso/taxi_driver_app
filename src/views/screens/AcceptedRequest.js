import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import Button from "../components/Button";

import { io } from "socket.io-client";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Entypo";

import { runTiming } from "react-native-redash";

import socketIoClient from "socket.io-client";
import { socket_url } from "../../../profile";
import { backend_url } from "../../../profile";

const socket = socketIoClient(socket_url, {
  autoConnect: false,
});

const RequestScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { driver } = route.params;
  const { data } = route.params;

  const [dropButton, showDropButton] = useState(false);
  const [pickButton, showPickButton] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState([]);
  let key = 0;

  useEffect(() => {
    socket.on("latest", (data) => {
      console.log(data);
    });
    socket.on("message", (msg) => {
      console.log(msg);
    });

    socket.connect();
  }, []);

  const pickingPassengers = () => {
    let newData = [driver, data];

    socket.emit("passengersPicked", newData);
    showDropButton(true);
    showPickButton(false);
  };

  const dropPassengers = () => {
    let newData = [driver, data];

    socket.emit("passengersDroped", newData);
    navigation.navigate("Dashboard", {
      itemId: 86,
      driver: driver,
    });
  };

  //   const AcceptingRideRequest = () => {
  //     let data = [driver, rideData];
  //     socket.emit("acceptingRequest", data);
  //   };
  //   const RegjectingRequest = () => {
  //     navigation.navigate("HomeScreen", {
  //       itemId: 86,
  //       driver: driver,
  //     });
  //   };
  let passengers = [];

  fetch(`${backend_url}/api/rides`)
    .then((res) => res.json())
    .then((res) => {
      // console.log("--------------------");

      passengers = [...res.passengers];
      let news = [];
      res.passengers.map((passenger) => {
        if (
          passenger.status === "pending" &&
          passenger.vehicleType === driver.vehicleType &&
          passenger.destination === data.destination &&
          news.length <= 9
          // passengers.pickupLocation === data.pickupLocation &&
          // passenger.destination === data.destination
        ) {
          news.push(passenger.phoneNumber);
        }
      });
      setPhoneNumber(news);

      // console.log(news);
    });

  // console.log(phoneNumber);
  const getKey = () => {
    return key++;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: "#333",
            color: "white",
            margin: 0,
            padding: 0,
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            // height: 50,
          }}
        >
          <View style={{ padding: 10 }}>
            <Icon5
              name="user"
              size={30}
              style={{
                color: "white",
                padding: 7,
                borderRadius: 25,
                borderStyle: "solid",
                borderColor: "white",
                borderWidth: 2,
              }}
            />
          </View>
          <Text style={{ color: "white", marginTop: 30 }}>{driver.name}</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <View style={styles.alerts}>
            {pickButton && (
              <Text style={{ fontSize: 16 }}>
                Your Ride request is Accepted
              </Text>
            )}
            {dropButton && (
              <Text style={{ fontSize: 16 }}>Ride is in progress!</Text>
            )}

            <View
              style={{
                fontSize: 14,
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text>Pickup Location:</Text>
              <Icon3 name="location-pin" size={20} />
              <Text style={{ fontWeight: "bold" }}>{data.pickupLocation}</Text>
            </View>
            <View
              style={{
                fontSize: 14,
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text>Destination:</Text>
              <Icon3 name="location-pin" size={17} />
              <Text style={{ fontWeight: "bold" }}>{data.destination}</Text>
            </View>
            <View
              style={{
                fontSize: 14,
                // display: "flex",
                // flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text>Passengers Phone Number:</Text>
              <View style={{ marginLeft: 30 }}>
                {phoneNumber.map((phone) => (
                  <Text key={getKey}>{phone}</Text>
                ))}
              </View>
              {/* <Icon3 name="location-pin" size={17} /> */}
              {/* <Text style={{ fontWeight: "bold" }}>{phoneNumber[0]}</Text> */}
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              {pickButton && (
                <TouchableOpacity
                  onPress={pickingPassengers}
                  style={{
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 6,
                    margin: 6,
                  }}
                >
                  <Text style={{ padding: 5 }}>Notify Picking</Text>
                </TouchableOpacity>
              )}
              {dropButton && (
                <TouchableOpacity
                  onPress={dropPassengers}
                  style={{
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 6,
                    margin: 6,
                  }}
                >
                  <Text style={{ padding: 5 }}>
                    Notify Droping And Payment Acceptance
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 60, marginTop: 20 }}></View>

        {/* <Button
          title="Remove Signal"
          style={{ width: 20 }}
          // onPress={removeSignal}
        /> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  alerts: {
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "95%",
    color: "black",
    borderStyle: "solid",
    borderColor: "white",
    borderWidth: 6,
    borderRadius: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  },
  container: { flex: 1, marginTop: 40 },
  inputLabel: { marginLeft: 12, marginVertical: 5, fontSize: 12 },
  inputLabelDestination: { marginLeft: 12, fontSize: 12 },

  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clear: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "black",
    color: "white",
    padding: 7,
    opacity: 0.5,
  },
  clearDestination: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "black",
    color: "white",
    padding: 7,
    opacity: 0.5,
  },

  itemTextConatiner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textContainer: { marginLeft: 10, flexShrink: 1 },
  mainText: { fontWeight: "700" },
  country: { fontSize: 12 },
});
export default RequestScreen;
