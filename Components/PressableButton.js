import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  componentStyle,
  pressedHandler,
  pressedStyle,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.defaultStyle,
        componentStyle,
        pressed && styles.defaultPressedStyle,
        pressed && pressedStyle,
      ]}
      onPress={pressedHandler}
    >
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "cornflowerblue",
    padding: 5,
  },
  defaultPressedStyle: {
    backgroundColor: "violet",
    opacity: 0.2,
  },
});
