import { StyleSheet, Text, useAnimatedValue, View } from "react-native";
import React, { useEffect } from "react";

export default function GoalUsers() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <View>
      <Text>GoalUsers</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
