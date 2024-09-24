import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function GoalItem({ goal, deleteHandler }) {
    function handleDelete() {
        deleteHandler(goal.id);
    }
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete}/>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "purple",
    padding: 10,
    fontSize: 20,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 10,
    // height: 100,
    flexDirection:"row",
    alignItems:"center",
  },
});
