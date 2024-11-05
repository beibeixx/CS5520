import { Alert, Button, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ receiveUmageUri }) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

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

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
        receiveUmageUri(result.assets[0].uri);
      }
    } catch (err) {
      console.log("take image error", err);
    }
  };

  return (
    <View>
      <Button title="Take An Image" onPress={takeImageHandler}></Button>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          alt="Preview of the image taken"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
