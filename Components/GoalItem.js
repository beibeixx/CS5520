import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GoalItem({ goal }) {
  return (
    <View key={goal.id} style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 15,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 50,
    height: 100,
  },
});
