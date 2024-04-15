import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    var userID = uuidv4()
    const msg = {
      mesageId : uuidv4(),
      messageType: "CONNECT_PING",
      text: "",
      id: userID,
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
      console.log(chatMessage.text)
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    };

    webSocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      webSocket.close();
    };
  }, []);

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = () => {
    if (ws && newMessage.trim() !== '') {
      const chatMessage = {
        messageType: "CHAT_MESSAGE",
        text: newMessage.trim(),
        id: localStorage.getItem("userId"),
        date: Date.now()
      };
      ws.send(JSON.stringify(chatMessage));
      setNewMessage('');
    }
  };

  return (
    
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <div style={{ marginBottom: '20px', flexGrow: '1', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} className={message.id == localStorage.getItem("userId") ? 'self-bubble' : 'opp-bubble'}>
              <div style={{marginRight: '10px' }}>
                { message.id == localStorage.getItem("userId") ? ( 
                <img
                  src="https://s25.postimg.cc/3pn2ttdin/Pic-container3.jpg" // Replace with your profile image URL
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                ) : (
                 <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS947ZWhTbpW_LXv2_tRRTGV_M3wSxhCifJXRWTBTHAzSylmpZMFnk70IBn2dyOxh6n_xo&usqp=CAU" // Replace with your profile image URL
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                )}
              </div>
            <div
              className={message.id === localStorage.getItem("userId") ? 'same-bubble-text' : 'opp-bubble-text'}>
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
  );
};

export default App;
