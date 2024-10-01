import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "./Components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./Components/GoalDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "My Goals",
            headerStyle: {
              backgroundColor: "purple",
            },
            // headerTitleStyle: {
            //   color: "#f4511e",
            // },
            headerTintColor: "white", //both back button and title
          }}
        />
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params ? route.params.goalData.text : "More details",
            headerRight: () => {
              return <Button title="Warning"
              onPress={ () => {
                console.log("warning")
              }}></Button>
            }
    
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
