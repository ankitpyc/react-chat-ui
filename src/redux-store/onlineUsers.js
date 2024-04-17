import {createSlice} from '@reduxjs/toolkit'


const activeUsersSlice = createSlice({
    name : 'activeUserDetail',
    initialState :{"activeUsers": []},
    reducers : {
        addActiveUsers(state,action) {
            state.activeUsers.push(action.payload.newUser);
        },
        removeInctiveUsers(state,action) {
            console.log("removing user")
            // state.activeUsers push(action.payload.userId);
        },
    }

})

export const {addActiveUsers,removeInctiveUsers} = activeUsersSlice.actions 

export default activeUsersSlice.reducer