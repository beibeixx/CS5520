import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

export default function LocationManager() {
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

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
      console.log(location);
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
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_API_mapsApiKey}`,
          }}
          style={styles.map}
          alt="Preview of the image taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: 100,
  },
});
