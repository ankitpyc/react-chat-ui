import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    userId: string;
    userName: string;
}

interface Message {
    text: string;
    sender: string;
    receiver: string;
}

interface ActiveUser {
    userInfo: UserInfo;
    messages: Message[];
    unread: number;
    isActive?: boolean;
}

interface ActiveUsersState {
    activeUsers: ActiveUser[];
}

const findUserIndex = (users: ActiveUser[], userId: string): number => 
    users.findIndex(user => user.userInfo.userId === userId);

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
        addReceivedMessages(state, action: PayloadAction<{ sender: string; message: string; receiver: string }>) {
            const { sender, message, receiver } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, sender);

            if (userIndex !== -1) {
                const user = state.activeUsers[userIndex];
                user.messages.push({ text: message, sender, receiver });
                user.unread += 1;

                // Move the updated user to the front of the array
                state.activeUsers.splice(userIndex, 1);
                state.activeUsers.unshift(user);
            }
        },
        addSentMessages(state, action: PayloadAction<{ sender: string; message: string; receiver: string }>) {
            const { sender, message, receiver } = action.payload;
            const userIndex = findUserIndex(state.activeUsers, receiver);

            if (userIndex !== -1) {
                const user = state.activeUsers[userIndex];
                user.messages.push({ text: message, sender, receiver });

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
        } 
    }
});

export const { addActiveUsers, removeInactiveUsers, addSentMessages, addReceivedMessages, markAllRead} = activeUsersSlice.actions;

export default activeUsersSlice.reducer;