import { useEffect, useState } from "react";
import RegistrationScreen from "./RegistrationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { backend_url } from "../../../profile";
import { socket_url } from "../../../profile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Image,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";

import Loader from "../components/Loader";
import { NavigationContainer } from "@react-navigation/native";

export default function Dashboard({ route, navigation }) {
  const { itemId } = route.params;
  const { driver } = route.params;
  const [areaMarginTop, setAreaMarginTop] = useState(50);

  const [pickupLocation, setPickupLocation] = useState();
  const [destination, setDestination] = useState("");
  const [data, setData] = useState();
  const [showSuggestionPickup, ChangeSuggestionPickup] = useState(true);

  const [loading, setLoading] = useState(false);

  const [pickupLocationError, setPickupLocationErorr] = useState("");
  const [showImage, changeImageStatus] = useState(true);

  const Stack = createNativeStackNavigator();

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!pickupLocation) {
      setPickupLocationErorr("Please input location");

      isValid = false;
    }

    if (isValid) {
      OrderButtonHandler();
    }
  };

  const OrderButtonHandler = () => {
    // console.log(driver);

    const bodys = {
      location: pickupLocation,
      vehicleType: driver.vehicleType,
      email: driver.email,
    };
    console.log(bodys.vehicleType);

    let headers = new Headers();
    let message = "";
    let newDr = {
      name: driver.name,
      location: pickupLocation,
      vehicleType: driver.vehicleType,
      email: driver.email,
      phoneNumber: driver.phoneNumber,
    };
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Authorization", "Basic ");

    fetch(`${backend_url}/api/pendingDrivers`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(bodys),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
        if (res.message === "success") {
          navigation.navigate("HomeScreen", {
            itemId: 86,
            driver: newDr,
          });
        }
      });
  };

  const clearPickupLocation = () => {
    setPickupLocation("");
  };

  const getItemText = (item) => {
    let mainText = item.address.name;
    let place_name = item.display_place;
    let state_name = item.state;
    let country_name = item.country;
    if (item.type === "city" && item.address.state)
      mainText += ", " + item.address.state;
    let newText =
      item.address.name +
      ", " +
      item.address.state +
      ", " +
      item.address.country;
    return (
      <View style={styles.itemTextConatiner}>
        <MaterialIcons
          name={item.type === "city" ? "location-city" : "location-on"}
          color={"black"}
          size={30}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            {item.address.name}, {item.address.state}, {item.address.country}
          </Text>
        </View>
      </View>
    );
  };

  const onChangeText = async (text) => {
    ChangeSuggestionPickup(true);
    setPickupLocation(text);
    if (text.length === 0) return setData([]);
    if (text.length > 2) {
      const res = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=pk.289ae4bca17e0652428d2f37c71b1d10&q=${text}`
      );

      // const res = await fetch(endpoint);
      if (res) {
        const data = await res.json();
        if (data.length > 0) setData(data);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: "transparent",
            color: "black",
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
              size={25}
              style={{
                color: "black",
                // margin: 10,
                padding: 10,
                borderRadius: 25,
                borderStyle: "solid",
                borderColor: "white",
                borderWidth: 2,
                // margin: 5,
                // marginBottom: 8,
              }}
            />
          </View>
          <Text style={{ color: "black", marginTop: 30 }}>{driver.name}</Text>
        </View>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {showImage && (
          <Image
            source={require("../../../assets/taxi/drive.jpg")}
            style={{
              width: 300,
              height: 180,
              marginTop: 20,
              marginLeft: 20,
            }}
          />
        )}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: areaMarginTop,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Ready for Ride
          </Text>
          {/* <Text>{vehicleType}</Text> */}
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputLabel}>Your Location</Text>
          <TextInput
            placeholder="Location"
            value={pickupLocation}
            onChangeText={onChangeText}
            onFocus={() => {
              setAreaMarginTop(-30);
              changeImageStatus(false);
            }}
            onBlur={() => {
              setAreaMarginTop(50);
              changeImageStatus(true);
            }}
            style={styles.input}
            error={pickupLocationError}
          />

          <Text onPress={clearPickupLocation} style={styles.clear}>
            X
          </Text>

          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={() => {
                  // alert("navigate passing" + JSON.stringify(item));
                  setPickupLocation(
                    item.address.name +
                      ", " +
                      item.address.state +
                      ", " +
                      item.address.country
                  );
                  ChangeSuggestionPickup(false);
                }}
              >
                {showSuggestionPickup && getItemText(item)}
              </Pressable>
            )}
            keyExtractor={(item, index) => item.osm_id + index}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Button title="Notify" style={{ width: 20 }} onPress={validate} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30, backgroundColor: "white" },
  inputLabel: { marginLeft: 12, marginVertical: 5, fontSize: 12 },
  inputLabelDestination: { marginLeft: 12, fontSize: 12 },

  input: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  clear: {
    position: "absolute",
    top: 30,
    right: 20,
    color: "#333",
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
