import { Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
import { useRoute } from "@react-navigation/native";
import { getOneDocument, updateDB } from "../Firebase/firestoreHelper";
import { auth } from "../Firebase/fireBaseSetup";

export default function LocationManager() {
  const navigation = useNavigation();
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const route = useRoute();

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await getOneDocument(auth.currentUser.uid, `users`);
        // console.log(userData);
        if (userData) {
          setLocation(userData.location);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  }, [route]);

  const saveLocationHandler = () => {
    updateDB(auth.currentUser.uid, { location }, "users");
    navigation.navigate("Home");
  };

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
      <Button
        title="Choose on map"
        onPress={() => {
          navigation.navigate("Map");
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
      <Button
        disabled={!location}
        title="save my location"
        onPress={saveLocationHandler}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: 300,
  },
});
