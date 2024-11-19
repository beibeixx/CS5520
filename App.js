import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { auth } from "./Firebase/fireBaseSetup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Profile from "./Components/Profile";
import PressableButton from "./Components/PressableButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Map from "./Components/Map";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true };
  },
});

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
      options={({ navigation }) => {
        return {
          title: "My Goals",
          headerRight: () => (
            <PressableButton
              componentStyle={{ backgroundColor: "purple" }}
              pressedHandler={() => {
                navigation.navigate("Profile");
              }}
            >
              <MaterialIcons name="person-outline" size={24} color="white" />
            </PressableButton>
          ),
        };
      }}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params ? route.params.goalData.text : "More details",
      })}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => {
        return {
          headerRight: () => (
            <PressableButton
              componentStyle={{ backgroundColor: "purple" }}
              pressedHandler={() => {
                signOut(auth);
              }}
            >
              <AntDesign name="logout" size={24} color="white" />
            </PressableButton>
          ),
        };
      }}
    />
    <Stack.Screen name="Map" component={Map} />
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
