import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { auth } from "./Firebase/fireBaseSetup";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);
const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ title: "My Goals" }}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params ? route.params.goalData.text : "More details",
      })}
    />
  </>
);

export default function App() {
  const [isUserloggedin, setIsUserLoggedin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLoggedin(true);
      } else {
        setIsUserLoggedin(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "purple",
          },
          headerTintColor: "white",
        }}
      >
        {isUserloggedin ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
