import React,{useEffect, useState} from 'react'
import  Button  from '@mui/material/Button';
import { Stack } from '@mui/material';
import {TextField} from '@mui/material'
import { Input } from '@mui/base/Input';
import {setUserDetails} from '../../redux-store/userSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userName,setUserName] = useState()

    useEffect(() => {
    
    console.log("wxwsxw")
    
      }, []);

    function onClick() {
        let userId = crypto.randomUUID()
        dispatch(setUserDetails({"userId" : userId,"userName" : userName}))
        sessionStorage.setItem("userId",userId)
        sessionStorage.setItem("userName",userName)
        navigate("/chat")
      }
      function onNameChange(event : any) {
        console.log(event.target.value)
        setUserName(event.target.value)
      }
return  (
    <Stack direction="column"
    style={{height:'100vh'}}
    justifyContent="center"
    alignItems="center"
    spacing={2}>
<TextField
  id="outlined-controlled"
  label="User Name"
  onChange={onNameChange} name={userName} value={userName}   
/>
<Button variant="contained"  onClick={onClick} >Login</Button>
      </Stack>

    
)
}

export default Login;