import { createSlice } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    darkMode: false,
}

export const toggleDarkModeSlice = createSlice({
    name: "toggleDarkMode",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkMode = action.payload
        },
    }
})

// exports action creator generator
// {
//     setDarkMode: (payload) => ({ type: 'darkMode/setDarkMode', payload }),
// }
export const { setDarkMode } = toggleDarkModeSlice.actions

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

// toggle darkMode anbd store in Async
export const toggleDarkMode = () => async (dispatch, getState) => {
    try {
        const currentMode = getState().toggleDarkMode.darkMode
        const newMode = !currentMode
        await AsyncStorage.setItem("darkMode", JSON.stringify(newMode))
        dispatch(setDarkMode(newMode))
    }
    catch (error) {
        console.error('Failed to save dark mode:', error);
    }
}

export default toggleDarkModeSlice.reducer