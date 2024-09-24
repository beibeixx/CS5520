import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Modal,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function Input({
  textInputFocus,
  inputHandler,
  visibility,
  cancelHandler,
}) {
  const [text, setText] = useState("");
  const [focus, setFocus] = useState(false);
  const [count, setCount] = useState(0);
  function handleConfirm() {
    inputHandler(text);
    setText("");
  }

  const handleCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          cancelHandler();
          setText("");
        },
      },
    ]);
  };

  return (
    <Modal animationType="slide" visible={visibility} transparent={ture}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
            }}
            style={styles.image}
            alt="Image of a an arrow"
          />
          <Image
            source={require("../assets/target-icon.png")}
            style={styles.image}
            alt="Image of a an arrow"
          />
          <TextInput
            style={styles.input}
            autoFocus={textInputFocus}
            autoCorrect={true}
            placeholder="Type something"
            keyboardType="default"
            value={text}
            onChangeText={(changeText) => {
              setText(changeText);
              setCount(changeText.length);
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          {focus && count > 0 && <Text>{count}</Text>}
          {!focus && count > 0 && (
            <Text>
              {count >= 3 ? "Thank you" : "Please type more than 3 characters"}
            </Text>
          )}
          <View style={styles.buttonsRow}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button
                title="Confirm"
                onPress={handleConfirm}
                disabled={count < 3}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "purple",
    borderWidth: 2,
    padding: 5,
    marginVertical: 10,
  },
  modalContainer: {
    borderRadius: 6,
    backgroundColor: "#999",
    alignItems: "center",
  },
  buttonContainer: {
    width: "30%",
    margin: 10,
  },
  buttonsRow: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
  },
});
