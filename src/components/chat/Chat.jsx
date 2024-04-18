import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/joy/Grid';
import {useDispatch,useSelector} from 'react-redux';
import { setWebsocket, setUserOffline} from '../../redux-store/userSlice';
import { addActiveUsers,addChatMessages} from '../../redux-store/onlineUsers';
import "../../App.css";
import ChatBox from './ChatBox/ChatBox';
import ActiveUserList from './ActiveUsers/ActiveUserList';

export default function Chat (){
  const dispatch = useDispatch()
  const {message,setMessages} = useState([])
  const [activeUser,setActiveUser] = useState(null)
  const [ws,setWs] = useState(null)

  const {activeUsers} = useSelector(state => state.activeUserReducer)  
  function changeActiveUser(user){
    console.log(user)
    setActiveUser(user)
  }
  function sendMessage (message) {
    console.log("sending Message")
    if (ws && message.trim() !== '') {
      const chatMessage = {
        messageType: "CHAT_MESSAGE",
        text: message.trim(),
        recieverID : activeUser.userInfo.userId,
        userId: localStorage.getItem("userId"),
        date: Date.now()
      };
      console.log(JSON.stringify(chatMessage))
      ws.send(JSON.stringify(chatMessage));
    }
  };

  useEffect(() => {
    const msg = {
      mesageId : uuidv4(),
      messageType: "CONNECT_PING",
      userName : sessionStorage.getItem("userName"),
      text: "",
      recieverID : uuidv4(),
      userId: sessionStorage.getItem("userId"),
      date: Date.now(),
    };
    const websocket = new WebSocket('ws://127.0.0.1:2019/ws');
    setWs(websocket)

    websocket.onopen = () => {
      console.log(JSON.stringify(msg));
      websocket.send(JSON.stringify(msg))
      dispatch(setUserOffline({"isActive" : true}))
      console.log('WebSocket connected');
    };


    websocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      if (chatMessage.messageType == 'CONNECT_PING'){
        if(chatMessage.userId != sessionStorage.getItem("userId")){
          console.log(chatMessage)
          dispatch(addActiveUsers({"newUser" : chatMessage}))
        }
      } else {
        dispatch(addChatMessages({"userId" : activeUser.userId,"sender" : sessionStorage.getItem("userId"),"message" : chatMessage.message}))
        setMessages((prevMessages) => [...prevMessages, chatMessage]);
      }
    };

    websocket.onclose = () => {
      dispatch(setWebsocket({"webock" : null}))
      dispatch(setUserOffline({"isActive" : false}))
      console.log('WebSocket disconnected');
    };

  
  }, []);

  return (
  <Grid container spacing={2} sx={{ flexGrow: 1 }}>
    <Grid className={'side-nav-chatbox'} xs={3}>
      <ActiveUserList onUsrClick={changeActiveUser}/>
    </Grid>
  <Grid  style={{padding:'8px 0px'}} xs={9}>
    <ChatBox activeUser={activeUser} sendMessageFn={sendMessage}/>
  </Grid>
</Grid>
  );
};