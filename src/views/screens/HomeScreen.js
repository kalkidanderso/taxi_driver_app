import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { io } from "socket.io-client";

import { backend_url } from "../../../profile";
import { socket_url } from "../../../profile";

import socketIoClient from "socket.io-client";
import { url } from "../../../profile";
const socket = socketIoClient(socket_url, {
  autoConnect: false,
});

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import Button from "../components/Button";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { Ionicons } from "@expo/vector-icons";
import Icon5 from "react-native-vector-icons/FontAwesome5";

// import CircularProgres from "../components/CircularProgress";

import Animated, { Easing } from "react-native-reanimated";
import { runTiming } from "react-native-redash";

// import CircularProgress from "../components/CircularProgress2";

const { Clock } = Animated;

const HomeScree = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { driver } = route.params;

  const [userDetails, setUserDetails] = useState("Kalkidan Derso");
  const [message, setMessage] = useState("Ride Signaled successfully!");
  const [rideMessage, setRideMessage] = useState("Waiting for Rides");
  const [barValue, setBarValue] = useState(0);
  const [rideData, setRideData] = useState();

  React.useEffect(() => {
    // getUserData();
    if (barValue === 100) {
      setBarValue(0);
    }

    socket.on("latest", (data) => {
      // expect server to send us the latest messages
      console.log(data);
    });
    socket.on("message", (msg) => {
      console.log(msg);
    });

    socket.on("drivers", (data) => {
      // console.log(data[1].email);
      let conditions = false;
      data[0].map((dd) => {
        if (dd.email === driver.email) {
          conditions = true;
        }
      });
      let rideData;

      if (conditions) {
        socket.close();
        navigation.navigate("RequestScreen", {
          itemId: 86,
          driver: driver,
          rideData: data[1],
        });
      }

      // if (
      //   driver.vehicleType === data.vehicleType &&
      //   driver.email === data.email
      // ) {
      //   navigation.navigate("RequestScreen");
      // }
    });

    socket.connect();
  }, []);

  const clock = new Clock();
  const config = {
    duration: 10 * 1000,
    toValue: 1,
    easing: Easing.linear,
  };

  // var socket = io.connect("http://192.168.8.100:8000");
  // socket.on("connect", function (data) {
  //   socket.emit("join", "Hello World from client");
  // });

  setTimeout(() => {
    setMessage("");
  }, 5000);
  const getUserData = async () => {
    // const userData = await AsyncStorage.getItem('userData');
    // if (userData) {
    // setUserDetails(JSON.parse(userData));
    setUserDetails("This is the detail page");
    // }
  };
  const removeSignal = () => {
    const bodys = {
      location: driver.location,
      vehicleType: driver.vehicleType,
      email: driver.email,
    };

    let headers = new Headers();
    let message = "";

    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");

    fetch(`${backend_url}/api/pendingDrivers/removeSignal`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodys),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        if (res.message === "penRemoved") {
          navigation.navigate("Dashboard", {
            itemId: 86,
            driver: driver,
          });
        }
      });
  };

  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("LoginScreen");
  };

  return (
    // <SafeAreaView style={styles.container}>
    //   <View
    //     style={{
    //       backgroundColor: "#333",
    //       color: "white",
    //       margin: 0,
    //       padding: 0,
    //       width: "100%",
    //       display: "flex",
    //       flexDirection: "row-reverse",
    //       // height: 50,
    //     }}
    //   ></View>
    //   <View style={{ padding: 10 }}>
    //     <Icon5
    //       name="user"
    //       size={30}
    //       style={{
    //         color: "white",
    //         // margin: 10,
    //         padding: 10,
    //         borderRadius: "50%",
    //         borderStyle: "solid",
    //         borderColor: "white",
    //         borderWidth: 2,
    //         // margin: 5,
    //         // marginBottom: 8,
    //       }}
    //     />
    //   </View>
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: "center",
    //       justifyContent: "center",
    //       paddingHorizontal: 40,
    //     }}
    //   >
    //     <Text style={{ fontSize: 20, fontWeight: "bold" }}>
    //       Welcome {userDetails?.fullname}
    //     </Text>
    //     <Button title="Logout" onPress={logout} />
    //   </View>
    // </SafeAreaView>

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
        <Text
          style={{
            color: "green",
            textAlign: "center",
            marginTop: 70,
            marginRight: 30,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {message}
        </Text>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 70,
          }}
        >
          <Text style={{ fontSize: 20 }}>{rideMessage}</Text>
          {/* <Text>{vehicleType}</Text> */}
        </View>
        <View style={{ marginLeft: 90, marginTop: 20 }}>
          {/* <CircularProgress /> */}
          <CircularProgress
            value={100}
            radius={80}
            inActiveStrokeOpacity={0.5}
            activeStrokeWidth={15}
            inActiveStrokeWidth={20}
            progressValueStyle={{ fontWeight: "100", color: "white" }}
            activeStrokeColor="green"
            activeStrokeSecondaryColor="yellow"
            inActiveStrokeColor="black"
            duration={100000}
            dashedStrokeConfig={{
              count: 50,
              width: 4,
            }}
            // onAnimationComplete={alert("Wait for Ride")}
          />
        </View>
        {/* <View style={styles.containers}> */}
        {/* <CircularProgress /> */}
        {/* </View> */}
        <Button
          title="Remove Signal"
          style={{ width: 20 }}
          onPress={removeSignal}
        />
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

export default HomeScree;
