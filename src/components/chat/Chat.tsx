import React,{useState, useEffect } from 'react';
import Grid from '@mui/joy/Grid';
import {useDispatch,useSelector} from 'react-redux';
import { setWebsocket, setUserOffline} from '../../redux-store/userSlice';
import { addActiveUsers,addRecievedMessages, addSentMessages,removeInctiveUsers} from '../../redux-store/onlineUsers';
import "../../App.css";
import ChatBox from './ChatBox/ChatBox';
import ActiveUserList from './ActiveUsers/ActiveUserList';
import { useTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Message from './message';

export default function Chat (){
  const dispatch = useDispatch()
  const theme = useTheme()
  const [activeUser,setActiveUser] = useState(null)
  const currUserId = sessionStorage.getItem("userId")
  const currUserName = sessionStorage.getItem("userName")

  const [ws,setWs] = useState(null)
  function changeActiveUser(user: any){
    console.log("changing active user",user)
    setActiveUser(user.userInfo.userId)
  }

  function creatChatMessage(type:string,text:string) : Message{
    var chatMessage:Message = {messageType:type,userName : currUserName,text:text,recieverID: activeUser,messageId:crypto.randomUUID(),userId:currUserId,isDelivered:false,isRead:false,isSent:false,date : Date.now()}
    return chatMessage
  }

  function createPingMessage() : Message{
    var chatMessage:Message = {messageType:"CONNECT_PING",userName:currUserName,text:"",recieverID: "",messageId:crypto.randomUUID(),userId:currUserId,isDelivered:false,isRead:false,isSent:false,date : Date.now()}
    return chatMessage
  }

  const sendMessage = (message: string) =>{
    console.log("sending Message")
    if (ws && message.trim() !== '') {
      var chatMessage : Message
      chatMessage = creatChatMessage("CHAT_MESSAGE",message)
      dispatch(addSentMessages({"reciever" : chatMessage.recieverID,"sender" : chatMessage.userId,"message" : chatMessage.text}))
      ws.send(JSON.stringify(chatMessage));
    }
  };
  const msg = {
    mesageId : crypto.randomUUID(),
    messageType: "CONNECT_PING",
    userName : sessionStorage.getItem("userName"),
    text: "",
    recieverID : "",
    userId: sessionStorage.getItem("userId"),
    date: Date.now(),
  };
  useEffect(() => {
    var ping = createPingMessage()
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
      } else if(chatMessage.messageType == 'CLOSE'){
        debugger
        dispatch(removeInctiveUsers({"userId" : chatMessage.userId}))
      } else {
        console.log("user ",sessionStorage.getItem("userId"))
        console.log(chatMessage)
        dispatch(addRecievedMessages({"userId" : chatMessage.recieverID,"sender" : chatMessage.userId,"message" : chatMessage.text}))
      }
    };

    websocket.onclose = () => {
      dispatch(setUserOffline({"isActive" : false}))
      console.log('WebSocket disconnected');
    };

  
  }, []);

  return (
  <Grid sx={{background : theme.palette.background.paper,flexGrow:1 }} container spacing={2}>
    <Grid style={{paddingRight:'0px'}} className={'side-nav-chatbox'} xs={2}>
      <ActiveUserList onUsrClick={changeActiveUser}/>
    </Grid>
  <Grid style={{padding:'8px 0px'}} xs={10}>
    {activeUser ? 
    <ChatBox activeUserId={activeUser} sendMessageFn={sendMessage}/> :         
    <div style={{height:'100vh',textAlign:'center',background : '#fff',display:'flex',flexDirection : 'column' , justifyContent : 'center'}}><i>Start sending messages to your loved ones 🗽.</i></div>
    }
  </Grid>
</Grid>
  );
};