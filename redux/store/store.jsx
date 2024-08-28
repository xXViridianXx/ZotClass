// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { currentUserSlice } from '../reducers/user';
const store = configureStore({
    reducer: {
        currentUser: currentUserSlice.reducer,
    },
});

export default store;
