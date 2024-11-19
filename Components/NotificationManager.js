import { Button, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  const verifyPermission = async () => {
    try {
      const permissionResponse = await Notifications.getPermissionsAsync();

      if (permissionResponse.granted) {
        return true;
      }

      const requestPermission = await Notifications.requestPermissionsAsync();
      return requestPermission.granted;
    } catch (err) {
      console.log("verify permission err", err);
    }
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You dont have permission");
        return;
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "First notification",
          body: "This is my first notification",
        },
        trigger: {
          seconds: 3,
        },
      });
    } catch (err) {
      console.log("set notification error", err);
    }
  };

  return (
    <View>
      <Button
        title="Schedule a Notification"
        onPress={scheduleNotificationHandler}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
