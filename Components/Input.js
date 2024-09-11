import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function Input(props) {
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(true)

    return (
        <View>
            <TextInput
                placeholder="here is it"
                autoCorrect={true}
                keyboardType='default'
                value={text}
                style={{ borderBottomColor: "purple", borderBottomWidth: 2}}
                onChangeText={function (changedText) {
                setText(changedText);
                }}
                autoFocus={props.autoFocus}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
            />
            {text.length > 0 && isFocused && (
                <Text style={styles.counter}>{text.length} characters</Text>
            )}
            {!isFocused && (
                <Text style={styles.message}>
                    {text.length >= 3 ? "Thank you" : "Please type more than 3 characters"}
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({})