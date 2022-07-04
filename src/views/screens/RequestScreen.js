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

// import * as Progress from "react-native-progress";
import { io } from "socket.io-client";
// import SocketIOClient from "socket.io-client/dist/socket.io.js";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon3 from "react-native-vector-icons/Entypo";
// import CircularProgres from "../components/CircularProgress";

import { runTiming } from "react-native-redash";

import socketIoClient from "socket.io-client";
import { socket_url } from "../../../profile";
import { backend_url } from "../../../profile";

const socket = socketIoClient(socket_url, {
  autoConnect: true,
});

const RequestScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { driver } = route.params;
  const { rideData } = route.params;

  const [userDetails, setUserDetails] = useState("Kalkidan Derso");

  useEffect(() => {
    socket.on("rejectDriver", (data) => {
      console.log("-----This this this-------");
      console.log(data[1]);
      if (data[0].phoneNumber !== driver.phoneNumber) {
        RegjectingRequest();
      } else {
        AccptedRequestScreen(data[1]);
      }
    });

    socket.on("redirectDrivers", (data) => {
      console.log("...........Reirecting driver.............");
    });
    socket.connect();
  });

  const AcceptingRideRequest = () => {
    console.log("Accepting...");
    let data = [driver, rideData];
    const socket = socketIoClient(socket_url, {
      autoConnect: true,
    });

    socket.emit("acceptingRequest", data);
    console.log("Accepting...");
  };

  const AccptedRequestScreen = (data) => {
    navigation.navigate("AcceptedRequest", {
      itemId: 86,
      driver: driver,
      data: data,
    });
  };

  const RegjectingRequest = () => {
    navigation.navigate("HomeScreen", {
      itemId: 86,
      driver: driver,
    });
  };

  const getUserData = async () => {
    setUserDetails("This is the detail page");
  };

  const logout = () => {
    // navigation.navigate("LoginScreen");
    console.log("Cancelled Ride");
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
                // margin: 10,
                padding: 7,
                borderRadius: 25,
                borderStyle: "solid",
                borderColor: "white",
                borderWidth: 2,
                // margin: 5,
                // marginBottom: 8,
              }}
            />
          </View>
          <Text style={{ color: "white", marginTop: 30 }}>{driver.name}</Text>
        </View>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <View style={styles.alerts}>
            <Text style={{ fontSize: 16 }}>New Incoming Request</Text>
            <View
              style={{ fontSize: 14, display: "flex", flexDirection: "row" }}
            >
              <Text>Pickup Location:</Text>
              <Icon3 name="location-pin" size={20} />
              <Text style={{ fontWeight: "bold" }}>
                {rideData.pickupLocation}
              </Text>
            </View>
            <View
              style={{ fontSize: 14, display: "flex", flexDirection: "row" }}
            >
              <Text>Destination:</Text>
              <Icon3 name="location-pin" size={20} />
              <Text style={{ fontWeight: "bold" }}>{rideData.destination}</Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={AcceptingRideRequest}
                style={{
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 6,
                  margin: 6,
                }}
              >
                <Text style={{ padding: 5 }}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={RegjectingRequest}
                style={{
                  borderColor: "black",
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 6,
                  margin: 6,
                }}
              >
                <Text style={{ padding: 5 }}>Reject</Text>
              </TouchableOpacity>
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
    width: "98%",
    color: "white",
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
