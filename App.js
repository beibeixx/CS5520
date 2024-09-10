import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('')
  const appName = "My app!"
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <TextInput
        placeholder="here is it"
        autoCorrect={true}
        keyboardType='default'
        value={text}
        style={{ borderBottomColor: "purple", borderBottomWidth: 2}}
        onChangeText={function (changedText) {
          setText(changedText);
        }}
      />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
