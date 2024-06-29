import React, { useState, useEffect, createContext } from "react";
import Grid from "@mui/joy/Grid";
import "../../App.css";
import {ChatBox} from "./ChatBox/ChatBox";
import ActiveUserList from "./ActiveUsers/ActiveUserList";
import { SocketManager } from "../../service/SocketManager";
import ActiveContext from "../../context/UserContext";
import { ActiveUser } from "../../dto/interface";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchUserChats } from "../../redux-store/thunk/thunkActions";
import { Drawer } from "@mui/material";

export default function Chat() {
  const [activeUser, setActiveUser] = useState<ActiveUser>(null);
  const dispatch = useAppDispatch()
  const currentUser = sessionStorage.getItem("ID")
  const currUserName = sessionStorage.getItem("userName")
  const socketManager:SocketManager = new SocketManager()
  useEffect(() => {
    console.log("loading user chats .... ");
    dispatch(fetchUserChats(Number(sessionStorage.getItem("ID"))));
  },[]);
    
  return (
    <ActiveContext.Provider value={{ activeUser, setActiveUser , currentUser,currUserName }}>
    <Grid
      sx={{ background: "#fdfdfd", flexGrow: 1 }}
      container
      spacing={2}
    >
      <Grid style={{ paddingRight: "0px" }}className={"side-nav-chatbox"}
        xs={3}
      >

        <ActiveUserList socketManager = {socketManager}  />
      </Grid>
      <Grid style={{ padding: "8px 0px" }} xs={9}>
        {activeUser ? (
          <ChatBox socketManager={socketManager} />
        ) : (
          <div
            style={{
              height: "100vh",
              textAlign: "center",
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <i>Start sending messages to your loved ones 🗽.</i>
          </div>
        )}
      </Grid>
    </Grid>
    </ActiveContext.Provider>
  );
}
