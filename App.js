import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import React, { useState } from "react";

export default function App() {
  const appName = "My app";
  const [receivedData, setReceivedData] = useState("");
  const [visible, setVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  const handleInputData = (data) => {
    console.log("App.js", data);
    let newGoal = { text: data, id: Math.random() };
    setGoals((prebGoals) => {
      return [...prebGoals, newGoal];
    });
    // setReceivedData(data);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button title="Add a Goal" onPress={() => setVisible(true)} />
        <Input
          textInputFocus={true}
          inputHandler={handleInputData}
          cancelHandler={handleCancel}
          visibility={visible}
        />
      </View>
      <View style={styles.bottomView}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>

        {goals.map((goal) => {
          return (
            <View key={goal.id} style={styles.textContainer}>
              <Text style={styles.text}>{goal.text}</Text>
            </View>
          );
        })}
        {/* <Text style={styles.text}>{receivedData} </Text> */}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "center",
  },
  scrollViewContainer:{
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
    marginTop: 50,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    color: "white",
    backgroundColor: "darkblue",
    flex: 4,
    // alignItems: "center",
  },
});
