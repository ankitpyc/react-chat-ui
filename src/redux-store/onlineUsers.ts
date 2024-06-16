import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveUser, ActiveUsersState, MessageDeliveryStatus, UserInfo, UserMessage } from './interf';

const findUserIndex = (users: ActiveUser[], userId: string): number => 
    users.findIndex(user => user.userInfo.userId === userId);

const findMessageIndex = (messages: UserMessage[], messageId: string): number => 
    messages.findIndex(message => message.id === messageId);    
const initialState: ActiveUsersState = { activeUsers: [] };

const activeUsersSlice = createSlice({
    name: 'activeUserDetail',
    initialState,
    reducers: {
        addActiveUsers(state, action: PayloadAction<{ newUser: UserInfo }>) {
            const { newUser } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, newUser.userId);
            if (userIndex === -1) {
                state.activeUsers.push({ userInfo: newUser, messages: [], unread: 0, isActive: true , chatId : ""});
            } else {
                state.activeUsers[userIndex].isActive = true;
            }
        },

        //TODO :: Dont remove this from the array , keep it inactive
        removeInactiveUsers(state, action: PayloadAction<{ userId: string }>) {
            const { userId } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, userId);

            if (userIndex !== -1) {
                state.activeUsers[userIndex].isActive = false;
            }
        },
        addReceivedMessages(state, action: PayloadAction<{id : string ,sender: string; message: string; receiver: string , deliveryStatus : MessageDeliveryStatus,time : string }>) {
            const { id ,sender, message, receiver, time } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, sender);

            if (userIndex !== -1) {
                const user = state.activeUsers[userIndex];
                user.messages.push({id : id ,text: message, sender, receiver,sentTime : time,status : MessageDeliveryStatus.SENT});
                user.unread += 1;

                // Move the updated user to the front of the array
                state.activeUsers.splice(userIndex, 1);
                state.activeUsers.unshift(user);
            }
        },

        addSentMessages(state, action: PayloadAction<{ id : string,sender: string; message: string; receiver: string,deliveryStatus : MessageDeliveryStatus,time : string }>) {
            const { id ,sender, message, receiver,deliveryStatus ,time } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, receiver);
            if (userIndex !== -1) {
                const user = state.activeUsers[userIndex];  
                user.messages.push({
                    id : id ,
                    text: message, sender, receiver, 
                    status: deliveryStatus,
                    sentTime: time
                });
                // Move the updated user to the front of the array
                state.activeUsers.splice(userIndex, 1);
                state.activeUsers.unshift(user);
            }
        },

        // this marks all the messages of the user read 
        markAllRead(state,action: PayloadAction<{ sender: string}>) {
            const { sender } = action.payload;
            const userIndex = findUserIndex(state.activeUsers,sender)
            const user = state.activeUsers[userIndex];
            // fetching all unread messages . 
            user.messages.forEach(message => {
                if(message.status !== MessageDeliveryStatus.READ){
                    message.status = MessageDeliveryStatus.READ
                }
            })  
            user.unread = 0;
        },
        updateMessageStatus(state, action : PayloadAction<{sender : string;receiver : string;messageId : string,chatId : string,messageStatus : MessageDeliveryStatus}>) {
            const { sender,receiver,messageId,chatId,messageStatus } = action.payload;
            debugger
            const userIndex = findUserIndex(state.activeUsers,sender)
            if ((messageId == "" || messageId == undefined) && messageStatus == MessageDeliveryStatus.READ) {

            }
            const messind = findMessageIndex(state.activeUsers[userIndex].messages,messageId)
            // Updates the messages when the data comes from the ACK
            state.activeUsers[userIndex].messages[messind].status = messageStatus
            state.activeUsers[userIndex].chatId = chatId;
        }
    }
});

export const { addActiveUsers, removeInactiveUsers, addSentMessages, addReceivedMessages, markAllRead,updateMessageStatus} = activeUsersSlice.actions;

export default activeUsersSlice.reducer;