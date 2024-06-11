import Avatar from "@mui/joy/Avatar";
import Badge from "@mui/joy/Badge";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useContext } from "react";
import "../../../App.css";
import { Paper, Stack, Typography } from "@mui/material";
import { RootState } from "../../../redux-store/store";
import { faker } from "@faker-js/faker";
import SendIcon from "@mui/icons-material/Send";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { ActiveUser, MessageDeliveryStatus, UserMessage } from "../../../redux-store/interf";
import ActiveContext from "../../../redux-store/context/UserContext";
import { ChatManager } from "../../../service/ChatManager";
import { SocketManager } from "../../../service/SocketManager";

interface SockProps {
  socketManager : SocketManager
}

export const ChatBox : React.FC<SockProps> = ({ socketManager }) => {
  debugger
  const {activeUser} = useContext(ActiveContext)
  const [newMessage, setNewMessage] = useState("");
  const currentUser = sessionStorage.getItem("ID");
  const handleMessageChange = (event: any) => {setNewMessage(event.target.value);};
  const {activeUsers} = useSelector((state : RootState) => state.activeUserReducer)
  const chatService = new ChatManager(socketManager)
  const currentUsers = activeUsers.filter((user: ActiveUser) => 
    user.userInfo.userId == activeUser.userInfo.userId
  ) 
    
  const sendMessage = () => {
    debugger
    chatService.sendMessage(newMessage,activeUser)
    setNewMessage("");

  };

  return (
    <div>
      <Stack
        style={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Stack
          p={1}
          direction="row"
          alignContent="baseline"
          justifyContent={"space-between"}
          alignItems="center"
          className="chatHeader"
        >
          <Stack
            m={1}
            spacing={2}
            alignItems={"center"}
            direction={"row"}
            alignContent={"center"}
          >
            <Badge
              badgeInset="14%"
              color={currentUsers[0].isActive == true ? "success" : "danger"}
            >
              <Avatar src={faker.image.avatar()}></Avatar>
            </Badge>
            <Typography>{currentUsers[0].userInfo.userName}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={3} pr={2}>
            <PhoneEnabledIcon></PhoneEnabledIcon>
            <VideoCallIcon></VideoCallIcon>
          </Stack>
        </Stack>
        <div style={{ flexGrow: 1, marginTop: 12 }}>
          {
          currentUsers[0].messages.map((message : UserMessage, index: number) => (
            <Stack
              direction={message.sender === currentUser ? "row" : "row-reverse"}
              alignItems="center"
              alignContent="space-around"
              key={index}
              className={
                message.sender === currentUser ? "self-bubble" : "opp-bubble"
              }
            >
              <Stack style={{ marginRight: "10px" }}>
                {message.sender == currentUser ? (
                  <Avatar
                    size="sm"
                    alt="Remy Sharp"
                    src={faker.image.avatar()}
                  />
                ) : (
                  <Avatar
                    size="sm"
                    alt="Ankit Sharp"
                    src={faker.image.avatar()}
                  />
                )}
              </Stack>
              <Paper className={
                  message.sender == currentUser
                    ? "same-bubble-text"
                    : "opp-bubble-text"
                } elevation={1}>
                  <Stack direction={"row"} p={0.5} textAlign={"center"} display={"flex"}>
              <Stack
                p={1}
                pl={1.4}
                pr={1.6}>
                <Typography noWrap variant="body2">
                  {message.text}
                </Typography>
              </Stack>
              
              <Stack direction={"column"}  alignContent={"flex-end"} alignItems={"flex-end"} justifyContent={'space-between'}>
              <Stack>
                <span style={{fontSize : '12px'}}>{message.sentTime}</span>
              </Stack>  
                {
                message.status != undefined && message.sender == currentUser  && message.status == MessageDeliveryStatus.SENT &&
                  <CheckIcon sx={{ fontSize: 10 }}></CheckIcon>
                }
                {
                message.status != undefined && message.sender == currentUser && message.status == MessageDeliveryStatus.DELIVERED &&
                  <DoneAllIcon sx={{ fontSize: 10 }}></DoneAllIcon>
                }
                {
                message.status != undefined && message.sender == currentUser &&message.status == MessageDeliveryStatus.READ &&
                   <DoneAllIcon color={'info'} sx={{ fontSize: 10 }}></DoneAllIcon>
                }
              </Stack>
              </Stack>
              </Paper>
            </Stack>
          ))}
        </div>
        <div
          style={{ display: "flex", margin: "4% 10px", alignItems: "center" }}
        >
          <input
            type="text"
            value={newMessage}
            placeholder="Type your message here .."
            onChange={handleMessageChange}
            style={{
              flex: "1",
              padding: "8px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <SendIcon></SendIcon>
          </button>
        </div>
      </Stack>
    </div>
  );
}
