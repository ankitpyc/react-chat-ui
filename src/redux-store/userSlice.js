import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetail",
  initialState: {
    websock: "",
    userName: "",
    userId: "",
    isActive: false,
  },
  reducers: {
    setWebsocket(state, action) {
      console.log("Setting state and payload", action);
      state["websock"] = action.payload.websock;
    },

    setUserDetails(state, action) {
      state["userName"] = action.payload.userName;
      state["userId"] = action.payload.userId;
    },

    setUserOffline(state, action) {
      state["isActive"] = action.payload.isActive;
    },
  },
});

export const { setWebsocket, setUserDetails, setUserOffline } =
  userSlice.actions;

export default userSlice.reducer;
