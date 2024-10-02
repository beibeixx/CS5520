import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";

export default function GoalDetails({ navigation, route }) {
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => {
            setIsWarning((prevState) => !prevState);
            navigation.setOptions({
              title: isWarning
                ? route.params
                  ? route.params.goalData.text
                  : "More details"
                : "Warning!",
            });
          }}
        />
      ),
    });
  }, [navigation]);

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
});
