import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function Input() {
    const [text, setText] = useState('')
    return (
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
    )
}

const styles = StyleSheet.create({})