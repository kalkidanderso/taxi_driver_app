import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

import { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Image,
  Alert,
} from "react-native";
// import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";

import { socket_url } from "../../../profile";
import { backend_url } from "../../../profile";

var formData = new FormData();

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    phone: "",
    email: "dersokalkidan@gmail.com",
    password: "root@123",
  });
  const [errors, setErrors] = React.useState({});
  const [response, setResponse] = useState();
  const [loading, setLoading] = React.useState(false);
  const [passengers, setPassengers] = useState([
    { phoneNumber: "0912121212" },
    { phoneNumber: "0989898989" },
  ]);
  let ps = [];
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch(`${backend_url}/api/drivers`)
      .then((res) => res.json())
      .then((res) => {
        // console.log(".....,", res.driver);
        res.driver.map((d) => {
          let newDriver = {
            name: d.name,
            email: d.email,
            password: d.password,
            phoneNumber: d.phoneNumber,
            profileImage: d.profileImage,
            city: d.city,
            address: d.address,
          };
          if (ps.length === 0 || ps.length === 1 || ps.length === 2) {
            ps.push(newDriver);
          }
          if (drivers.length === 0) {
            setDrivers([drivers]);
          } else {
            let oldDriver = [...drivers];
            oldDriver.push(newDriver);
            setDrivers(oldDriver);
          }
        });
        // setDrivers(JSON.parse(res.driver));
      });
  }, []);
  // console.log(drivers);
  // console.log("....", ps);

  // fetch("http://192.168.8.106:3000/api/passengers")
  //   .then((res) => res.json())
  //   .then((res) => {
  //     setPassengers(res.passenger);
  //     res.passenger.map((pass) => {
  //       ps.push(pass);
  //     });
  //   });
  // if (ps.length !== 0) {
  // setPassengers(passengers);
  // }

  const getData = (phoneNumber) => {
    let condition = false;
    passengers.map((ps) => {
      if (ps.phoneNumber === phoneNumber) {
        condition = true;
      }
    });
    return condition;
  };
  const validateEmail = (emil) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (emailRegex.test(inputs.email)) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = () => {
    let conditions = true;
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;
    if (reg.test(inputs.password)) {
      return true;
    } else {
      return false;
    }
  };

  const validate = () => {
    console.log("Register is redirected");

    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      console.log("no email");
      isValid = false;
    } else if (!validateEmail()) {
      handleError("Incorrect email format", "email");
      console.log("incorrect email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      console.log("no password");
      isValid = false;
    }
    //  else if (!validatePassword()) {
    //   handleError("Incorrect password format", "password");
    //   console.log("incorrect password");

    //   isValid = false;
    // }

    if (isValid) {
      register();
    }
  };

  const register = () => {
    // if (ps.length !== 0) {
    setLoading(true);
    //   navigation.navigate("Dashboard");
    // }

    setTimeout(() => {
      try {
        fetch(`${backend_url}/api/drivers`)
          .then((res) => res.json())
          .then((res) => {
            // console.log(res.driver[1]);
            res.driver.map((dr) => {
              // let emails = dr.email;
              // let passwords = dr.password;
              if (
                dr.email === inputs.email &&
                inputs.password === dr.password
              ) {
                setLoading(false);
                let newDriver = {
                  name: dr.name,
                  email: dr.email,
                  password: dr.password,
                  phoneNumber: dr.phoneNumber,
                  profileImage: dr.profileImage,
                  city: dr.city,
                  address: dr.address,
                  vehicleType: dr.vehicleType,
                };

                navigation.navigate("Dashboard", {
                  itemId: 86,
                  driver: newDriver,
                });
              }
            });
          });
        console.log("outside fetch");
        setLoading(false);
        // navigation.navigate("RegistrationScreen");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          width: 200,
          height: 180,
          marginTop: 30,
          marginLeft: 80,
          marginBottom: -70,
        }}
      >
        <Image
          source={require("../../../assets/img/newTaxi.jpg")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{
          // paddingTop: 50,
          paddingHorizontal: 20,
          marginTop: 80,
          marginLeft: 30,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 30,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Taxi Dispatcher Driver's App
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Button title="Log In" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
