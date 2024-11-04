import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import {
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/fireBaseSetup";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = () => {
    navigation.replace("Signup");
  };

  const loginHandler = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("All fields need to be filled");
      return;
    }

    // any other check you could do to make we have balid date
    // regex for email and password etc...
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred.user);
    } catch (err) {
      console.log("login in error", err);
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
        <Button title="login" onPress={loginHandler}></Button>
        <Button title="sign up" onPress={signupHandler}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
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
