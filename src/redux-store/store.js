import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import activeUsersSlice from './onlineUsers'

export const store = configureStore({
    reducer : {
        userReducer : userSlice,
        activeUserReducer : activeUsersSlice
    }
});

export default store;