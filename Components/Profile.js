import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PressableButton from "./PressableButton";
import { updateWarningInDB } from "../Firebase/firestoreHelper";
import GoalUsers from "./GoalUsers";
import { auth } from "../Firebase/fireBaseSetup";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile({navigation}) {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  warning: {
    color: "red",
  },
  iconStyle: {
    backgroundColor: "red",
    opacity: 0.5,
  },
});
