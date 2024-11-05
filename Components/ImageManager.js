import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermission = async() => {
    if(!response.granted){
        const result = await requestPermission();
    }
    return true;
  }

  const takeImageHandler = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
    } catch (err) {
      console.log("take image", err);
    }
  };

  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler}></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
