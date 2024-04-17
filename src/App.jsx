import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/joy/Grid';
import Avatar from '@mui/joy/Avatar';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import List from '@mui/joy/List';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';


import "./App.css";
const App = () => {
  const [messages, setMessages] = useState([]);
  const [userDetails , setUserDetails] = useState({})
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers , setActiveUsers] = useState([]);
  const [ws, setWs] = useState(null);
console.log("rendered¸¸¸")

  useEffect(() => {
    var userID = uuidv4()
    const msg = {
      mesageId : uuidv4(),
      messageType: "CONNECT_PING",
      text: "",
      recieverID : uuidv4(),
      userId: userID,
      date: Date.now(),
    };
    const webSocket = new WebSocket('ws://127.0.0.1:2019/ws');
    setWs(webSocket);


    webSocket.onopen = () => {
      console.log(JSON.stringify(msg));
      webSocket.send(JSON.stringify(msg))
      localStorage.setItem("userId",userID)
      console.log('WebSocket connected');
    };


    webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data);
      console.log(chatMessage)
      if (chatMessage.messageType == 'CONNECT_PING'){
        if(chatMessage.userId != localStorage.getItem("userId")){
        console.log("got a ping for")
        setActiveUsers((prevActiveUsers) => [...prevActiveUsers, chatMessage]);
        }
      } else {
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      }
    };

    webSocket.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }, []);

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = () => {
    if (ws && newMessage.trim() !== '') {
      const chatMessage = {
        messageType: "BROADCAST",
        text: newMessage.trim(),
        recieverID : uuidv4(),
        userId: localStorage.getItem("userId"),
        date: Date.now()
      };
      ws.send(JSON.stringify(chatMessage));
      setNewMessage('');
    }
  };

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
  <Grid className={'side-nav-chatbox'} xs={3}>

  {activeUsers.map((user, index) => (
    <p>{user.userId}</p>
  ))
  }
  <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <ListItem>
        <ListItemButton onClick={() => alert('You clicked')}>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Brunch this weekend?</Typography>
            <Typography level="body-sm" noWrap>
              I&apos;ll be in your neighborhood doing errands this Tuesday.
            </Typography>
          </ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListDivider inset='startContent'></ListDivider>
        <ListItem>
        <ListItemButton onClick={() => alert('You clicked')}>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/2.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Summer BBQ</Typography>
            <Typography level="body-sm" noWrap>
              Wish I could come, but I&apos;m out of town this Friday.
            </Typography>
          </ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
  </Grid>
  <Grid style={{padding:'8px 0px'}} xs={9}>
   
    <div  style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto',  display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <div className='chatHeader'>Header</div>
      <div style={{ marginBottom: '20px', flexGrow: '1', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} className={message.userId === localStorage.getItem("userId") ? 'self-bubble' : 'opp-bubble'}>
              <div style={{marginRight: '10px' }}>
                {message.userId == localStorage.getItem("userId") ? ( 
                  <Avatar size="sm" alt="Remy Sharp" src="https://s25.postimg.cc/3pn2ttdin/Pic-container3.jpg" />
                ) : (
                  <Avatar size="sm" alt="Ankit Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS947ZWhTbpW_LXv2_tRRTGV_M3wSxhCifJXRWTBTHAzSylmpZMFnk70IBn2dyOxh6n_xo&usqp=CAU" />
                )}
              </div>
            <div
              className={message.userId == localStorage.getItem("userId") ? 'same-bubble-text' : 'opp-bubble-text'}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex',margin:'4% 10px', alignItems: 'center' }}>
        <input
          type="text"
          value={newMessage}
          placeholder='Type your message here ..'
          onChange={handleMessageChange}
          style={{ flex: '1', padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  </Grid>

</Grid>
    
    
  );
};

export default App;
