import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function GoalItem({ goal, deleteHandler, navigation }) {
    function handleDelete() {
      deleteHandler(goal.id);
    }

    function handlePress() {
      navigation.navigate('Details', {goalData: goal});
    }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{goal.text}</Text>
      <Button title="X" color="grey" onPress={handleDelete}/>
      <Button title="i" color="grey" onPress={handlePress}/>

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
    margin: 20,
    flexDirection:"row",
    alignItems:"center",
  },
});
