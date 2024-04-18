import Avatar from '@mui/joy/Avatar';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import List from '@mui/joy/List';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import {useDispatch,useSelector} from 'react-redux';
import "../../../App.css";

export default function ActiveUserList ({onUsrClick}) {
    const {activeUsers} = useSelector(state => state.activeUserReducer)

    return (
      <div>
        <div style={{background: '#a95870',padding: '15px',textAlign: 'center',fontSize : 'small',fontWeight: '700',color: 'white'}}>Online Users</div>
        <List
              aria-labelledby="ellipsis-list-demo"
              sx={{ '--ListItemDecorator-size': '56px' }}
            >

            {activeUsers.map((user, index) => (
           <ListItem key={user.userInfo.userId}>
           <ListItemButton onClick={() => onUsrClick(user)}>
             <ListItemDecorator>
               <Avatar alt={user.userInfo.userName} src="/static/images/avatar/1.jpg" />
             </ListItemDecorator>
             <ListItemContent>
               <Typography level="title-sm">{user.userInfo.userName}</Typography>
               <Typography level="body-sm" noWrap>
                 I&apos; {user.messages.length == 0 ? (<i> <small>Start a new chat</small></i>) : (<i>{user.messages[user.messages.length-1].text}</i>)}
               </Typography>
             </ListItemContent>
             </ListItemButton>
           </ListItem>
        ))
        }
      </List>
      </div>
    );
}