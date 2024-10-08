import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    darkMode: false,
    uid: null
}

// export const toggleDarkModeSlice = createSlice({
//     name: "toggleDarkMode",
//     initialState,
//     reducers: {
//         setDarkMode: (state, action) => {
//             state.darkMode = action.payload
//         },
//     }
// })

export const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload
        },
        setUID: (state, action) => {
            state.uid = action.payload
        },
        clearUID: (state, action) => {
            state.uid = null
        }
    }
})

// exports action creator generator
// {
//     setDarkMode: (payload) => ({ type: 'darkMode/setDarkMode', payload }),
// }
// export const { setDarkMode } = toggleDarkModeSlice.actions
export const { setDarkMode, setUID, clearUID } = currentUserSlice.actions;

// load from async
export const loadDarkMode = () => async (dispatch) => {
    try {
        const savedMode = await AsyncStorage.getItem('darkMode')
        if (savedMode !== null) {
            dispatch(setDarkMode(JSON.parse(savedMode)))
        }
    }
    catch (error) {
        console.error("Failed to load dark mode: ", error)
    }
}

// toggle darkMode and store in Async
export const toggleDarkMode = () => async (dispatch, getState) => {
    try {
        const currentMode = getState().currentUser.darkMode
        const newMode = !currentMode
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode))
        dispatch(setDarkMode(newMode))
    }
    catch (error) {
        console.error('Failed to save dark mode:', error);
    }
}

// setting uid in async
export const setUserID = (uid) => async (dispatch) => {
    try {
        await AsyncStorage.setItem("uid", uid)
        dispatch(setUID(uid))
    } catch (error) {
        console.error('Failed to set UID:', error);
    }
}

// retrieves uid from aysnc
export const getUserID = () => async (dispatch) => {
    try {
        const uid = await AsyncStorage.getItem('uid');
        if (uid !== null) {
            dispatch(setUID(uid));
        }
    } catch (error) {
        console.error('Failed to load UID:', error);
    }
}

// used on log out
export const clearUserID = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('uid');
        dispatch(clearUID());
    } catch (error) {
        console.error('Failed to clear UID:', error);
    }
};



export default currentUserSlice.reducer