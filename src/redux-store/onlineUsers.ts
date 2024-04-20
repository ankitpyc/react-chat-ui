import {createSlice, current} from '@reduxjs/toolkit'

const activeUsersSlice = createSlice({
    name : 'activeUserDetail',
    initialState :{"activeUsers": []},
    reducers : {
        addActiveUsers(state,action) {
            let actUser = state.activeUsers.findIndex((user) => {
                return user.userInfo.userId == action.payload.newUser.userId
            })
            if(actUser == -1){
            state.activeUsers.push({"userInfo" : action.payload.newUser,"messages" : []});
            } else{
                state.activeUsers[actUser].isActive = true
            }
        },
        removeInctiveUsers(state,action) {
            let inactiveUser = state.activeUsers.findIndex((user) => {
                return user.userInfo.userId == action.payload.userId
            })
            debugger
            if(inactiveUser !== -1){
                state.activeUsers[inactiveUser].isActive = false
            }
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
        addRecievedMessages(state,action) {
            debugger;
            let currentUser = state.activeUsers.filter((user) => {
                 console.log("checking " , user.userInfo.userId)
                 return user.userInfo.userId == action.payload.sender   
            })
            let otherUsers = state.activeUsers.filter((user) => {
                console.log("checking " , user.userInfo.userId)
                return user.userInfo.userId !== action.payload.sender   
           })
           if(currentUser.length == 0){
            
           }
           console.log(currentUser[0].userInfo.userId)
           currentUser[0].messages.push({"text":action.payload.message, "sender" : action.payload.sender,"reciever" : action.payload.reciever})
           otherUsers.splice(0,0,currentUser[0])
           debugger
           state.activeUsers = otherUsers
        },

        addSentMessages(state,action) {
            debugger;
            let currentUser = state.activeUsers.filter((user) => {
                 console.log("checking " , user.userInfo.userId)
                 return user.userInfo.userId == action.payload.reciever   
            })
            let otherUsers = state.activeUsers.filter((user) => {
                console.log("checking " , user.userInfo.userId)
                return user.userInfo.userId !== action.payload.reciever   
           })
           if(currentUser.length == 0){
            
           }
           console.log(currentUser[0].userInfo.userId)
           currentUser[0].messages.push({"text":action.payload.message, "sender" : action.payload.sender,"reciever" : action.payload.reciever})
           otherUsers.splice(0,0,currentUser[0])
           state.activeUsers = otherUsers
        }

    }
})

export const {addActiveUsers,removeInctiveUsers,addSentMessages,addRecievedMessages} = activeUsersSlice.actions 

export default activeUsersSlice.reducer