import { createSelector } from '@reduxjs/toolkit';

export const selectActiveUsers = (state: { activeUsers: any; }) => state.activeUsers;

export const makeGetUserWithMessages = () =>
  createSelector(
    [selectActiveUsers, (_, userId) => userId],
    (activeUsers, userId) => {
      debugger
      const user = activeUsers.find((user: {
        userInfo: any; id: any;
      }) => user.userInfo.id === userId);

      if (user) {
        return {
          ...user,
          messages: user.messages // Assuming messages is an array of messages
        };
      } else {
        return null; // Return null if user is not found
      }
    }
  );