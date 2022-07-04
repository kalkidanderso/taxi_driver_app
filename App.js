import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/views/screens/Dashboard";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import RequestScreen from "./src/views/screens/RequestScreen";
import AcceptedRequest from "./src/views/screens/AcceptedRequest";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./src/views/components/Loader";

// import Map from './src/map/Map';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    setInitialRouteName("RegistrationSceen");
    // setInitialR/outeName("Dashboard");
    // setInitialRouteName("Dashboard");
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="RequestScreen" component={RequestScreen} />
            <Stack.Screen name="AcceptedRequest" component={AcceptedRequest} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
