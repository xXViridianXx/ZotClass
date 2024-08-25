import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import LoginInputs from '../components/LoginInputs'
// import { signUp, create} from '../components/Helpers'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'



const SignUpScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

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
                    <Text style={styles.introText}>Welcome Aboard</Text>
                </View>

                <View style={styles.inputContainer}>
                    <LoginInputs labelText={'Username'} input={username} setInput={setUsername} style={styles.input} color={'#1c4375'} boardType='default' secure={false} />
                    <LoginInputs labelText={'Email'} input={email} setInput={setEmail} style={styles.input} color={'#1c4375'} boardType='email-address' secure={false} />
                    <LoginInputs labelText={'Password'} input={password} setInput={setPassword} style={styles.input} color={'#1c4375'} boardType='default' secure={true} />
                    <LoginInputs labelText={'Confirm Password'} input={confirmPassword} setInput={setConfirmPassword} style={styles.input} color={'#1c4375'} boardType='default' secure={true} />
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={styles.button}>
                        <Text style={styles.buttonText}>Lets Go</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpContainer}>
                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 500 }}>Already Have An Account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }}>
                            <Text style={styles.buttonOutlineText}> Sign In</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

export default SignUpScreen

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
        color: '#FFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#e5e5e5'
    },
    buttonOutline: {
        backgroundColor: '#E63946',
    },
    buttonOutlineText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#FFF'

    }
})