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
import ImageManager from "./ImageManager";

export default function Input({
  textInputFocus,
  inputHandler,
  visibility,
  cancelHandler,
}) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const minimumChar = 3;
  function handleConfirm() {
    inputHandler({ text, imageUri });
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

  function receiveUmageUri(uri) {
    setImageUri(uri);
  }

  return (
    <Modal animationType="slide" visible={visibility} transparent={true}>
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
            }}
            onFocus={() => setBlur(true)}
            onBlur={() => setBlur(false)}
          />
          {blur ? (
            text.length >= minimumChar ? (
              <Text>Thank you</Text>
            ) : (
              <Text>Please type more than {minimumChar} characters</Text>
            )
          ) : (
            text && <Text>{text.length}</Text>
          )}
          <ImageManager receiveUmageUri={receiveUmageUri} />
          <View style={styles.buttonsRow}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button
                title="Confirm"
                onPress={handleConfirm}
                disabled={text.length < minimumChar}
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
