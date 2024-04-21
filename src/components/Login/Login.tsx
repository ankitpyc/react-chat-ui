import React,{useEffect, useState} from 'react'
import  Button  from '@mui/material/Button';
import {useNavigate } from "react-router-dom";
import {Grid, Stack, useTheme,TextField, Divider} from '@mui/material'
import {setUserDetails} from '../../redux-store/userSlice';
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios';

const Login = () => {
    const dispatch = useDispatch()
  const theme = useTheme()
    const navigate = useNavigate()
    const [userName,setUserName] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        setEmailError(false)
        setPasswordError(false)

        if (email == '') {
            setEmailError(true)
        }
        if (password == '') {
            setPasswordError(true)
        }
 
        if (email && password) {
            console.log(email, password)
        }
 
        var postBody = {
          "password" : password,
          "email" : email
      }
        axios.post("http://localhost:3023/LoginUser",postBody).then(function (response) {
          console.log(response);
          localStorage.setItem("userId",response.data.ID)
          localStorage.setItem("email",response.data.email)
          navigate("/chat")
        })
        .catch(function (error) {
          console.log(error);
        });
        

    }
    useEffect(() => {
    
    
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
  return ( 
    <Grid  sx={{background : theme.palette.background.paper,flexGrow:1 ,height:'100vh'}} container spacing={2}>
    <Grid sx={{ height: '100vh',backgroundImage:'url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjEwMTYtYy0wOF8xLWtzaDZtemEzLmpwZw.jpg)'}} style={{paddingRight:'0px'}} xs={6}>
    </Grid>    
    <Grid xs={6}>
    <Stack  sx= {{height:'90vh'}} justifyContent={'space-around'} alignContent={'center'}   m={4} spacing={1} p={4}>
      <Stack spacing={2}>
      <h1>Welcome to chatsy</h1>
      <small>Dont have an account ? Signs Up</small>
      <Divider/>

      </Stack>
      <Stack p={12}>
    <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
                label="Email"
                onChange={e => setEmail(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{mb: 3}}
                fullWidth
                value={email}
                error={emailError}
             />
             <TextField 
                label="Password"
                onChange={e => setPassword(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={password}
                error={passwordError}
                fullWidth
                sx={{mb: 3}}
             />
             <Button sx={{width: "100%",borderRadius:'5px'}} variant="contained" color="secondary" type="submit">Login</Button>
         
    </form>
    </Stack>
    <Divider/>

    <Stack>
      Login With Google 
    </Stack>
    </Stack>
    </Grid>  
    </Grid>   
 );
}

export default Login;