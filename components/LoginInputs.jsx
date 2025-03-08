import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'


const LoginInputs = ({ labelText, input, setInput, color, boardType, secure }) => {

    return (
        <TextInput
            placeholder={labelText}
            value={input}
            onChangeText={text => setInput(text)}
            style={styles.input}
            placeholderTextColor={color}
            keyboardType={boardType}
            secureTextEntry={secure}

        />
    )
}

export default LoginInputs

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba( 50, 85, 147, 100)',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#1c4375',
        color: 'white',
        fontWeight: "bold"
    }
})