import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import activeUsersSlice from './onlineUsers'

export const store = configureStore({
    reducer : {
        userReducer : userSlice,
        activeUserReducer : activeUsersSlice
    }
});


export type RootState = ReturnType<typeof store.getState>;

export default store;