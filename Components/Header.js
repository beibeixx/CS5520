import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Header({ name }) {
  console.log(name);
  return (
    <View>
      <Text style={styles.text}>Welcome to {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "darkblue",
    fontSize: 24,
    borderColor: "darkblue",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});
