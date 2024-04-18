import {React,useEffect, useState} from 'react'
import { Button } from '@mui/base/Button';
import { Input } from '@mui/base/Input';
import {setUserDetails} from '../../redux-store/userSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useHistory, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';



const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userName,setUserName] = useState()

    useEffect(() => {
    
    console.log("wxwsxw")
    
      }, []);

    function onClick() {
        let userId = uuidv4()
        dispatch(setUserDetails({"userId" : userId,"userName" : userName}))
        sessionStorage.setItem("userId",userId)
        sessionStorage.setItem("userName",userName)
        navigate("/chat")
      }
      function onNameChange(event) {
        console.log(event.target.value)
        setUserName(event.target.value)
      }
return  (
    <div>
<Input onChange={onNameChange} name={userName} value={userName}  aria-label="account input" placeholder="Enter Account Number" />
<Button onClick={onClick} slots={{ root: 'span' }}>Button</Button>
    </div>
)
}

export default Login;