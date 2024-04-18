import {createSlice} from '@reduxjs/toolkit'

const activeUsersSlice = createSlice({
    name : 'activeUserDetail',
    initialState :{"activeUsers": []},
    reducers : {
        addActiveUsers(state,action) {
            debugger ;
            let actUser = state.activeUsers.filter((user) => {
                return user.userInfo.userId == action.payload.newUser.userId
            })
            if(actUser.length == 0){
            state.activeUsers.push({"userInfo" : action.payload.newUser,"messages" : []});
            }
        },
        removeInctiveUsers(state,action) {
            console.log("removing user")
            // state.activeUsers push(action.payload.userId);
        },

        isActiveUser(state,action) {
            let currentUser = state.activeUsers.filter((user) => {
                console.log("checking " , user)
                return user.userInfo.userId == action.payload.userId   
           });
           if(currentUser === undefined || currentUser === null){
            addActiveUsers({})
           }
        },
        addChatMessages(state,action) {
            let currentUser = state.activeUsers.filter((user) => {
                 console.log("checking " , user.userInfo.userId)
                 return user.userInfo.userId == action.payload.sender   
            })
            console.log(currentUser)
            let otherUsers = state.activeUsers.filter((user) => {
                console.log("checking " , user.userInfo.userId)
                return user.userInfo.userId !== action.payload.sender   
           })
           debugger
           console.log(currentUser[0].userInfo.userId)
           currentUser[0].messages.push({"text":action.payload.message, "sender" : action.payload.sender})
           otherUsers.splice(0,0,currentUser[0])
           debugger
           state.activeUsers = otherUsers
        }

    }
})

export const {addActiveUsers,removeInctiveUsers,addChatMessages} = activeUsersSlice.actions 

export default activeUsersSlice.reducer