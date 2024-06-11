import React, { useState, useEffect, createContext } from "react";
import Grid from "@mui/joy/Grid";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import {ChatBox} from "./ChatBox/ChatBox";
import ActiveUserList from "./ActiveUsers/ActiveUserList";
import { useTheme } from "@mui/material";
import { MessagingService } from "../../service/MessagingService";
import { SocketManager } from "../../service/SocketManager";
import ActiveContext from "../../redux-store/context/UserContext";
import { ActiveUser } from "../../redux-store/interf";



export default function Chat() {
  const theme = useTheme();
  const messageService = new MessagingService();
  const [activeUser, setActiveUser] = useState<ActiveUser>(null);
  const socketManager:SocketManager = new SocketManager()
  return (
    <ActiveContext.Provider value={{ activeUser, setActiveUser }}>
    <Grid
      sx={{ background: theme.palette.background.paper, flexGrow: 1 }}
      container
      spacing={2}
    >
      <Grid style={{ paddingRight: "0px" }}className={"side-nav-chatbox"}
        xs={2}
      >
        <ActiveUserList />
      </Grid>
      <Grid style={{ padding: "8px 0px" }} xs={10}>
        {activeUser ? (
          <ChatBox socketManager={socketManager} />
        ) : (
          <div
            style={{
              height: "100vh",
              textAlign: "center",
              background: "#fff",
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
