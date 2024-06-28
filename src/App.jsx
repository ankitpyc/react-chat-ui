import React from 'react';
import {Routes , Route,Link} from "react-router-dom"
import "./App.css";
import Chat from './components/chat/Chat';
import {AxiosProvider} from './utils/axiosInterceptor'
import Login from './components/login/Login';
import NotFound from './components/notfound/NotFound';
import Register from './components/register/Register';

const App = () => {
  return (
    <AxiosProvider>
      <Routes>
            <Route path="/login" element={<Login/> } /> 
            <Route path="/chat" element={<Chat/> } /> 
            <Route path="*" element={<NotFound/> } /> 
            <Route path='/register' element={<Register />} />
      </Routes>
  </AxiosProvider>
  )
};

export default App;
