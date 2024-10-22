import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header({ name }) {
  // console.log(name);
  const { width, height } = useWindowDimensions();
  const paddingVerticalDynamic = height < 415 ? 0 : 10;
  return (
    <View>
      <Text style={[styles.text, {paddingVertical: paddingVerticalDynamic}]}>Welcome to {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "darkblue",
    fontSize: 24,
    //fontSize: windowWidth < 380 ? 20: 26,
    borderColor: "darkblue",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});
