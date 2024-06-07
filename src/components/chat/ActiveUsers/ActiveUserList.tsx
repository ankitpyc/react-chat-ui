import Avatar from '@mui/joy/Avatar';
import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/joy/List';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import '../../../App.css'
import Badge from '@mui/joy/Badge';
import {useSelector} from 'react-redux';
import { faker } from '@faker-js/faker';
import "../../../App.css";
import { Divider, Stack } from '@mui/material'; 
import { RootState } from '../../../redux-store/store';

const ActiveUserList = ({onUsrClick} : any) => {
    const {activeUsers} = useSelector((state : RootState) => state.activeUserReducer)
    const {userName} = useSelector((state : RootState) => state.userReducer)
    return (
      <Stack sx={{background : '#f8FAFF'}} direction='column'>
        <Stack p={2} direction='row' alignItems='center' alignContent='space-around'>
            <Avatar alt={userName} src={faker.image.avatar()} />
            <Typography sx={{marginLeft:'12px'}} variant='body1'>{userName}</Typography>
            </Stack>
      <Stack>
      <Divider/>
        <Stack p={2}><Typography variant="h6">Chats</Typography></Stack>
        <Divider/>
        <Stack>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }} aria-labelledby="ellipsis-list-demo">
            {activeUsers.filter(user => user.isActive == true).map((user, index) => (
              <Stack>
      <ListItem  alignItems="flex-start">
      <ListItemButton className='hoverOnListItems'  onClick={() => onUsrClick(user)}>
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
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {user.messages.length == 0 ? "say Hi 👋 !" : user.messages[user.messages.length-1].sender == sessionStorage.getItem("ID") ? "you : "  + user.messages[user.messages.length-1].text : user.messages[user.messages.length-1].text}
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