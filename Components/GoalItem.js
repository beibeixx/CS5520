import { StyleSheet, Text, View, Button, Pressable, Alert } from "react-native";
import React from "react";
import PressableButton from "./PressableButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function GoalItem({ goal, deleteHandler, navigation }) {
  function handleDelete() {
    deleteHandler(goal.id);
  }

  function handlePress() {
    navigation.navigate("Details", { goalData: goal });
  }

  function handleLongPress() {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => handleDelete(),
        }
      ]
    );

  }

  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed && styles.pressedStyle];
        }}
        android_ripple={{ color: "red", radius: 10 }}
        onLongPress={handleLongPress}
      >
        <Text style={styles.text}>{goal.text}</Text>
        <PressableButton
          componentStyle={styles.deleteButton}
          pressedHandler={handleDelete}
          pressedStyle={styles.pressedStyle}
        >
          <AntDesign name="delete" size={24} color="black" />
        </PressableButton>
        {/* <Button title="X" color="grey" onPress={handleDelete} /> */}
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
  },
  deleteButton: {
    backgroundColor: "yellow",
  },
});
