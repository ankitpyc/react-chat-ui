import React, { useState, useEffect } from "react";
import Grid from "@mui/joy/Grid";
import { useDispatch, useSelector } from "react-redux";
import { setWebsocket, setUserOffline } from "../../redux-store/userSlice";
import {markAllRead} from "../../redux-store/onlineUsers";
import "../../App.css";
import ChatBox from "./ChatBox/ChatBox";
import ActiveUserList from "./ActiveUsers/ActiveUserList";
import { useTheme } from "@mui/material";
import Message from "./message";
import SystemMessage from "./message";
import { MessagingService } from "../../service/MessagingService";
import { json } from "react-router-dom";

export default function Chat() {
  const messageService = new MessagingService();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [activeUser, setActiveUser] = useState(null);
  const currUserId = sessionStorage.getItem("ID");
  const currUserName = sessionStorage.getItem("userName");
  const [ws, setWs] = useState(null);
  function changeActiveUser(user: any) {
    setActiveUser(user.userInfo.userId);
    dispatch(markAllRead({
      sender : user.userInfo.userId
    }))
  }

  const sendMessage = (message: string) => {
    console.log("sending Message");
    if (ws && message.trim() !== "") {
      var chatMessage: Message;
      chatMessage = messageService.creatChatMessage(message,currUserName,activeUser,currUserId);
      messageService.AddMessageToStore(chatMessage)
      ws.send(JSON.stringify(chatMessage));
    }
  };

  useEffect(() => {
    console.log("Initiating websocket connection");
    var ping = messageService.createPingMessage(currUserName,currUserId);
    const websocket = new WebSocket("ws:/localhost:2023/ws");
    setWs(websocket);
    websocket.onopen = () => {
      console.info("Websocket connection established")
      console.log(JSON.stringify(ping));
      websocket.send(JSON.stringify(ping));
      dispatch(setUserOffline({ isActive: true  }));
    };

    websocket.onmessage = (event) => {
      console.log("recieved message ", JSON.stringify(event.data))
      const chatMessage : SystemMessage = JSON.parse(event.data);
      const ackMessage = messageService.handleAndProcessMessageEvent(chatMessage)
      if (ackMessage !== null ){
      websocket.send(JSON.stringify(ackMessage))
      }
    };

    websocket.onclose = () => {
     console.log("Closing connection .. ") 
      dispatch(setUserOffline({ isActive: false }));
      setInterval(() => {
      },5000)
      console.log("WebSocket disconnected");
    };
  }, []);

  return (
    <Grid
      sx={{ background: theme.palette.background.paper, flexGrow: 1 }}
      container
      spacing={2}
    >
      <Grid
        style={{ paddingRight: "0px" }}
        className={"side-nav-chatbox"}
        xs={2}
      >
        <ActiveUserList onUsrClick={changeActiveUser} />
      </Grid>
      <Grid style={{ padding: "8px 0px" }} xs={10}>
        {activeUser ? (
          <ChatBox activeUserId={activeUser} sendMessageFn={sendMessage} />
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
  );
}
