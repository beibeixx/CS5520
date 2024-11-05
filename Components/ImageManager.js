import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermission = async () => {
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (err) {}
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You dont have permission");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
    } catch (err) {
      console.log("take image error", err);
    }
  };

  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler}></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
