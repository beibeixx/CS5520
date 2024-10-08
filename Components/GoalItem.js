import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import React from "react";

export default function GoalItem({ goal, deleteHandler, navigation }) {
  function handleDelete() {
    deleteHandler(goal.id);
  }

  function handlePress() {
    navigation.navigate("Details", { goalData: goal });
  }

  return (
    <View style={styles.textContainer}>
      <Pressable onPress={handlePress} 
      style={ ({pressed}) => {
        return [styles.horizontalContainer, pressed && styles.pressedStyle]
      }}
      android_ripple={{color: 'red', radius: 10}}>
        <Text style={styles.text}>{goal.text}</Text>
        <Button title="X" color="grey" onPress={handleDelete} />
        {/* <Button title="i" color="grey" onPress={handlePress} /> */}
      </Pressable>
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
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: "blue",
  }
});
