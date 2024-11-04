import { Button, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React from "react";
import { useState } from "react";
import { auth } from "../Firebase/fireBaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signupHandler = async () => {
    try {
      if (
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword === 0
      ) {
        Alert.alert("All fields need to be filled");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Passwords did not match");
        return;
      }
      // any other check you could do to make we have balid date
      // regex for email and password etc...
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCred.user);
    } catch (err) {
      console.log("sign up", err);
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(changeText) => {
            setEmail(changeText);
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          secureTextEntry
          onChangeText={(changeText) => {
            setPassword(changeText);
          }}
        />

        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={(changeText) => {
            setConfirmPassword(changeText);
          }}
        />

        <Button title="Register" onPress={signupHandler}></Button>
        <Button title="Go login" onPress={loginHandler}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "stretch",
    justifyContent: "center",
  },
  input: {
    borderColor: "#552055",
    borderWidth: 2,
    width: "90%",
    margin: 5,
    padding: 5,
  },
  label: {
    marginLeft: 10,
  },
});
