import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import { auth } from "../Firebase/fireBaseSetup";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    navigation.replace("Login");
  };

  const signupHandler = async() => {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text>Email</Text>
        <TextInput
          placeholder="email"
          value={email}
          setValue={setEmail}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry
          onChangeText={(changeText) => {
            setPassword(changeText);
          }}
        />

        <Text>Password</Text>
        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry
          onChangeText={(changeText) => {
            setPassword(changeText);
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
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
