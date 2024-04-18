import {createSlice} from '@reduxjs/toolkit'


const activeUsersSlice = createSlice({
    name : 'activeUserDetail',
    initialState :{"activeUsers": []},
    reducers : {
        addActiveUsers(state,action) {
            state.activeUsers.push({"userInfo" : action.payload.newUser,"messages" : []});
        },
        removeInctiveUsers(state,action) {
            console.log("removing user")
            // state.activeUsers push(action.payload.userId);
        },
        addChatMessages(state,action) {
            console.log("adding messages")
            state.activeUsers[action.payload.userId].messages.push({"sender" : action.payload.sender,"message" : action.payload.message})
        }

    }
})

export const {addActiveUsers,removeInctiveUsers,addChatMessages} = activeUsersSlice.actions 

export default activeUsersSlice.reducer