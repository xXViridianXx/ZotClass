import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth'
import { database, doc, setDoc } from '../config/firebase'
import Toast from 'react-native-root-toast'
import { useDispatch } from 'react-redux';
import { setUserID } from '../redux/reducers/user';


const showToast = (text) => {
    let toast = Toast.show(text, {
        duration: Toast.durations.SHORT,
        backgroundColor: '#D90429',
        position: 150,
        shadow: false,
    });
};


const resetPassword = async (email) => {
    const auth = getAuth()
    try {
        if (email.length == 0) {
            console.log("email is 0")
            showToast('Please Enter Email Address')
            return false
        }
        await sendPasswordResetEmail(auth, email)
        console.log(`reset sent`)
        return true;
    }
    catch (error) {
        if (error.code === 'auth/invalid-email') {
            showToast('Invalid Email')
            return false
        }
        if (error.code === 'auth/user-not-found') {
            showToast('Invalid email address')
            return false
        }
        console.log("Error reseting: ", error)
        showToast('An Error Occured, Try Again')
        return false
    }
}

const signIn = async (email, password, dispatch) => {
    const auth = getAuth()
    if (email && password) {
        try {
            let userSignInInfo = await signInWithEmailAndPassword(auth, email, password)

            const user = userSignInInfo.user
            dispatch(setUserID(user.uid));
            console.log('Logged In With', user.email)
            return true
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                showToast('Invalid email address')
                return false
            }
            if (error.code === 'auth/wrong-password') {
                showToast('Invalid password')
                return false
            }
            showToast('Invalid Email or Password')
            console.error('Error signing in: ', error.message)
            return false
        }
    }
    else if (email) {
        showToast('Enter password')
        return false
    }
    else if (password) {
        showToast('Enter email')
        return false
    }
    showToast('Enter email and password')
    return false
}

const signUp = async (email, password, confirmPassword, dispatch) => {
    const auth = getAuth()
    if (email && password) {
        if (password != confirmPassword) {
            showToast('Passwords Do Not Match')
            return false
        }
        try {
            let credentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = credentials.user
            // uid = user.uid
            // createDocument(email, uid)
            dispatch(setUserID(user.uid));
            console.log('Successfully created an account with', user.email)
            return true
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                showToast('Email Already In Use')
                return false
            }
            if (error.code === 'auth/invalid-email') {
                showToast('Invalid Email')
                return false
            }
            if (error.code === 'auth/weak-password') {
                console.log("weak password")
                showToast('Password must be atleast 6 characters')
                return false
            }
            console.error('Error creating account', error.message)
        }

        return false
    }
    showToast('Enter Missing Fields')
    return false
}

export { signIn, signUp, resetPassword }