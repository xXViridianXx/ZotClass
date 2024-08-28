import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import LoginInputs from '../components/LoginInputs'
// import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
// import { initializeApp } from 'firebase/app'
// import { firebaseConfig } from '../firebaseConfig'
import { signIn } from '../DatabaseHelpers/Authentication'
import { useDispatch } from 'react-redux'
// linking firebase
// initializeApp(firebaseConfig)

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleSignIn = async () => {
        const valid = await signIn(email, password, dispatch)
        if (valid) {
            setTimeout(() => {
                navigation.navigate("Home");
            }, 100);
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
                    <Text style={styles.introText}>Schedules On The Go</Text>
                </View>

                <View style={styles.inputContainer}>

                    <LoginInputs labelText={'Email'} input={email} setInput={setEmail} style={styles.input} color={'#1c4375'} boardType='email-address' secure={false} />
                    <LoginInputs labelText={'Password'} input={password} setInput={setPassword} style={styles.input} color={'#1c4375'} boardType='default' secure={true} />

                    <TouchableOpacity onPress={() => { navigation.navigate("ForgotPasswordScreen") }}>
                        <Text style={{ color: '#FFF', fontWeight: 500, padding: 8, fontSize: 12 }}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity onPress={() => { handleSignIn() }} style={styles.button}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={styles.button}>
                        <Text style={styles.buttonText}>Continue As Guest</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpContainer}>
                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 500 }}>New To The App?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignUpScreen') }} >
                            <Text style={styles.buttonOutlineText}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

export default LoginScreen

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