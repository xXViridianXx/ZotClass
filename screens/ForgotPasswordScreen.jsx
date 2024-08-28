import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import LoginInputs from '../components/LoginInputs'

import { signIn } from '../DatabaseHelpers/Authentication'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../DatabaseHelpers/Authentication'

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [sentResentLink, setSentResetLink] = useState(false)
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleReset = async () => {
        try {
            setSentResetLink(false)
            const valid = await resetPassword(email)
            if (valid) {
                setSentResetLink(true)
            }
        } catch (error) {
            console.log("error resetting email")
        }
    }

    return (




        // keyboard won't cover input fields

        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
            >
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>ZotClass</Text>
                </View>

                <View style={styles.introContainer}>
                    <Text style={styles.introText}>Lost In Aldrich?</Text>
                </View>

                <View style={styles.inputContainer}>
                    {sentResentLink ? <Text style={{color: "white", fontWeight: "bold", fontSize: 13}}>Check Your Email for a Reset Link</Text> : null}
                    <LoginInputs labelText={'Email'} input={email} setInput={setEmail} style={styles.input} color={'#1c4375'} boardType='email-address' secure={false} />
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity onPress={() => { handleReset() }} style={styles.button}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                        <Text style={styles.buttonText}>Back To Login</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba( 50, 85, 147, 100)',
    },

    signUpContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    logoContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 300
    },
    logoText: {
        color: '#FFF',
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic'

    },

    introContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20

    },
    introText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '500',
        // fontStyle: 'italic'
    },
    inputContainer: {
        width: '70%',
    },
    buttonContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#1c4375',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF'
    },
    buttonOutlineText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#FFF'
    }
})