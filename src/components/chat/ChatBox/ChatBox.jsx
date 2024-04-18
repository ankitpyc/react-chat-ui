import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import {useDispatch,useSelector} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBox({activeUser,sendMessageFn}) {
    const {isActive,userName} = useSelector(state => state.userReducer)

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const {websock} = useSelector(state => state.userReducer)

    
    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);
      };



    return (

<div>
      {activeUser ? (
          <div  style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto',  display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
          <div className='chatHeader'>
          <Badge badgeInset="14%" color={isActive == true ? 'success' : 'danger'}>
            <Avatar src="https://s25.postimg.cc/3pn2ttdin/Pic-container3.jpg" >
              </Avatar> 
        </Badge>
        &nbsp;{activeUser.userInfo.userName}
          </div>
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
              onClick={sendMessageFn(newMessage)}
              style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div>Waiting for data...</div>
      )}
</div>

       

    );
}