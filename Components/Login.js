import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { useState } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = () => {
    navigation.replace("Signup");
  };

  const loginHandler = () => {
    navigation.replace("Signup");
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
        <Button title="login" onPress={loginHandler}></Button>
        <Button title="sign up" onPress={signupHandler}></Button>
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
