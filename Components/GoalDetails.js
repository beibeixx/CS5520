import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import PressableButton from "./PressableButton";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  function warningHandler() {
    setIsWarning(true);
    navigation.setOptions({ title: "Warning!" });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // <Button title="Warning" color="white" onPress={warningHandler} />
        <PressableButton
          compoentStyle={styles.iconStyle}
          pressedHandler={warningHandler}
        >
          <Ionicons name="warning" size={24} color="black" />
        </PressableButton>
      ),
    });
  }, []);

  function moreDetailsHandler() {
    navigation.push("Details");
  }
  return (
    <View>
      {route.params ? (
        <Text style={isWarning && styles.warning}>
          Goal is {route.params.goalData.text} and its id is{" "}
          {route.params.goalData.id}
        </Text>
      ) : (
        <Text style={isWarning && styles.warning}>More Details</Text>
      )}
      <Button title="More Details" onPress={moreDetailsHandler}></Button>
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
  }
});
