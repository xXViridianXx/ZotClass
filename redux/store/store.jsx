// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { toggleDarkModeSlice } from '../reducers/user';
const store = configureStore({
    reducer: {
        toggleDarkMode: toggleDarkModeSlice.reducer,
    },
});

export default store;
