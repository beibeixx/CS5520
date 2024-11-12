import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";

export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState({});

  const verifyPermission = async () => {
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {}
  };

  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You dont have permission");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      console.log(location)
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (err) {
      console.log("Location error", err);
    }
  };

  return (
    <View>
      <Button
        title="Locate me"
        onPress={() => {
          locateUserHandler();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
