import Avatar from '@mui/joy/Avatar';
import React, { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/joy/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import '../../../App.css'
import Badge from '@mui/joy/Badge';
import {useDispatch, useSelector} from 'react-redux';
import { faker } from '@faker-js/faker';
import "../../../App.css";
import { Divider, Stack } from '@mui/material'; 
import { RootState } from '../../../redux-store/store';
import ActiveContext from '../../../redux-store/context/UserContext';
import { ActiveUser, MessageDeliveryStatus } from '../../../redux-store/interf';
import { markAllRead } from '../../../redux-store/onlineUsers';
import { MessagingService } from '../../../service/MessagingService';
import { SocketManager } from '../../../service/SocketManager';

interface SockProps {
  socketManager : SocketManager
}

const ActiveUserList : React.FC<SockProps> = ({ socketManager }) =>  {
    const dispatch = useDispatch()
    const messagingService = new MessagingService()
    const {activeUsers} = useSelector((state : RootState) => state.activeUserReducer)
    const {userName} = useSelector((state : RootState) => state.userReducer)
    const {setActiveUser} = useContext(ActiveContext)
    function UpdateActiveUser(user:ActiveUser) {
      setActiveUser(user)
      if (user.unread != 0) {
        dispatch(markAllRead({sender : user.userInfo.userId}))
        var ack = messagingService.CreateAckMessage("",sessionStorage.getItem("ID"),user.userInfo.userId,MessageDeliveryStatus.READ)
        socketManager.SendMessage(JSON.stringify(ack))
      }

    }
    return (
      <Stack sx={{background : '#FFFFFF'}} direction='column'>
        <Stack p={1.5} direction='row' alignItems='center' alignContent='space-around'>
            <Avatar alt={userName} src={faker.image.avatar()} />
            <Typography sx={{marginLeft:'12px'}} variant='body1'>{userName}</Typography>
            </Stack>
      <Stack>
      <Divider/>
        <Stack p={2}><Typography variant="h6">Chats</Typography></Stack>
        <Divider/>
        <Stack>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} aria-labelledby="ellipsis-list-demo">
            {activeUsers.map((user, index) => (
              <Stack>
      <ListItem  alignItems="flex-start">
      <ListItemButton className='hoverOnListItems'  onClick={() => UpdateActiveUser(user)}>
        <ListItemAvatar>
        <Badge  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right',
  }} badgeInset="14%" color={user.isActive == true ? 'success' : 'danger'}>

          <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={user.userInfo.userName}
          style={{"overflow" : "hidden","whiteSpace" : "nowrap  "}}
          secondary={
            <React.Fragment>
              <Typography
          style={{ "overflow" : "hidden" ,"textOverflow" : "ellipsis","whiteSpace" : "nowrap"}}
          component="span"
                variant="body2"
                color="text.primary"
              >
                              {user.messages.length == 0 ? "say Hi 👋 !" : user.messages[user.messages.length-1].sender == sessionStorage.getItem("ID") ? "you : "  + user.messages[user.messages.length-1].text : user.messages[user.messages.length-1].text}

              </Typography>
            </React.Fragment>
          }
        />
        <Badge size='sm' color='primary' badgeContent={user.unread}></Badge>
      </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" /></Stack>
        ))
        }
      </List>
      </Stack>
      </Stack>
      </Stack>
    );
}

export default ActiveUserList;  