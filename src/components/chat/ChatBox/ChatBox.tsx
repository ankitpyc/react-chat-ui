import Avatar from "@mui/joy/Avatar";
import Badge from "@mui/joy/Badge";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "../../../App.css";
import { Icon, Stack, Typography } from "@mui/material";
import { RootState } from "../../../redux-store/store";
import { makeGetUserWithMessages } from "../../../redux-store/userSelector";
import { faker } from "@faker-js/faker";
import SendIcon from "@mui/icons-material/Send";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import VideoCallIcon from "@mui/icons-material/VideoCall";

export default function ChatBox({ activeUserId, sendMessageFn }: any) {
  const { isActive, userName } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [newMessage, setNewMessage] = useState("");
  const currentUser = sessionStorage.getItem("userId");
  const { activeUsers } = useSelector(
    (state: RootState) => state.activeUserReducer
  );
  const currUser = activeUsers.filter(
    (user: any) => user.userInfo.userId == activeUserId
  );
  debugger;

  const handleMessageChange = (event: any) => {
    setNewMessage(event.target.value);
  };
  const sendMessage = () => {
    setNewMessage("");
    debugger;
    sendMessageFn(newMessage);
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
              color={currUser[0].isActive == true ? "success" : "danger"}
            >
              <Avatar src={faker.image.avatar()}></Avatar>
            </Badge>
            <Typography>{currUser[0].userInfo.userName}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={3} pr={2}>
            <PhoneEnabledIcon></PhoneEnabledIcon>
            <VideoCallIcon></VideoCallIcon>
          </Stack>
        </Stack>
        <div style={{ flexGrow: 1, marginTop: 12 }}>
          {currUser[0].messages.map((message: any, index: number) => (
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
              <Stack
                p={1}
                pl={1.2}
                pr={1.5}
                className={
                  message.sender == currentUser
                    ? "same-bubble-text"
                    : "opp-bubble-text"
                }
              >
                <Typography noWrap variant="body2">
                  {message.text}
                </Typography>
              </Stack>
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
