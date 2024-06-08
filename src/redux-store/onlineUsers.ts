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
                state.activeUsers.push({ userInfo: newUser, messages: [], unread: 0, isActive: true });
            } else {
                state.activeUsers[userIndex].isActive = true;
            }
        },
        removeInactiveUsers(state, action: PayloadAction<{ userId: string }>) {
            const { userId } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, userId);

            if (userIndex !== -1) {
                state.activeUsers[userIndex].isActive = false;
            }
        },
        addReceivedMessages(state, action: PayloadAction<{id : string ,sender: string; message: string; receiver: string , deliveryStatus : MessageDeliveryStatus,time : string }>) {
            debugger
            const { id ,sender, message, receiver, time } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, sender);

            if (userIndex !== -1) {
                const user = state.activeUsers[userIndex];
                user.messages.push({id : id ,text: message, sender, receiver,sentTime : time,});
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
                    text: message, sender, receiver, status: deliveryStatus,
                    sentTime: time
                });
                // Move the updated user to the front of the array
                state.activeUsers.splice(userIndex, 1);
                state.activeUsers.unshift(user);
            }
        },
        markAllRead(state,action: PayloadAction<{ sender: string}>) {
            const { sender } = action.payload;
            const userIndex = findUserIndex(state.activeUsers,sender)
            const user = state.activeUsers[userIndex];
            user.unread = 0;
        },
        updateMessageStatus(state, action : PayloadAction<{sender : string;receiver : string;messageId : string}>) {
            debugger
            const { sender,receiver,messageId } = action.payload;
            const userIndex = findUserIndex(state.activeUsers,receiver)
            const messind = findMessageIndex(state.activeUsers[userIndex].messages,messageId)
            state.activeUsers[userIndex].messages[messind].status = MessageDeliveryStatus.SENT
        }
    }
});

export const { addActiveUsers, removeInactiveUsers, addSentMessages, addReceivedMessages, markAllRead,updateMessageStatus} = activeUsersSlice.actions;

export default activeUsersSlice.reducer;