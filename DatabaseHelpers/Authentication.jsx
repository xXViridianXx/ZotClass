import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { database, doc, setDoc } from '../config/firebase'
import user from '../redux/reducers/user'
// import Toast from 'react-native-root-toast'


// const showToast = (text) => {
//     let toast = Toast.show(text, {
//         duration: Toast.durations.SHORT,
//         backgroundColor: '#D90429',
//         position: 150,
//         shadow: false,
//     });
// };


const createDocument = async (email, username, uid) => {
    try {
        await setDoc(doc(database, 'users', uid), {
            email: email,
            username: username
        })
        console.log(`Data submitted; uid: ${uid}`)
    }
    catch (error) {
        console.log('Error' + error.message)
    }
}

const signIn = async (email, password) => {
    const auth = getAuth()
    if (email && password) {
        try {
            let userSignInInfo = await signInWithEmailAndPassword(auth, email, password)

            const user = userSignInInfo.user

            console.log('Logged In With', user.email)
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                showToast('Invalid email address')
            }
            if (error.code === 'auth/wrong-password') {
                showToast('Invalid password')
            }
            showToast('Invalid credentials')
            console.error('Error signing in: ', error.message)
        }
    }
    else if (email) {
        // showToast('Enter password')
    }
    else if (password) {
        // showToast('Enter email')
    }
    else {
        // showToast('Enter email and password')
    }
}

const signUp = async (email, password, confirmPassword, username) => {
    const auth = getAuth()

    if (password != confirmPassword) {
        // showToast('Password Do Not Match')
        return false
    }
    if (email && password) {

        try {
            let credentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = credentials.user
            uid = user.uid
            createDocument(email, username, uid)
            console.log('Successfully created an account with', user.email)
            return true
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                // showToast('The email is already in use')
            }
            if (error.code === 'auth/invalid-email') {
                // showToast("Invalid email")
            }

            console.error('Error creating account', error.message)
        }

        return false
    }
    else {
        // showToast('Missing required fields')
    }

    return false
}

export { signIn, signUp }