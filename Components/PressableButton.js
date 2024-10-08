import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function PressableButton({ children, compoentStyle, pressedHandler,pressedStyle }) {
  return (
    <Pressable style={({pressed})=> 
        [styles.defaultStyle, compoentStyle, 
            pressed&&styles.defaultPressedStyle,
            pressed&&pressedStyle]} 
    onPress={pressedHandler}>
        <View>
            {children}
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    defaultStyle:{
        color: "purple",
        padding: 5,
    },
    defaultPressedStyle: {
        color: "violet",
        opacity: 0.2,
    }
})