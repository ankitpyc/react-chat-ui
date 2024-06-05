import React from 'react';
import {Routes , Route,Link} from "react-router-dom"
import "./App.css";
import Chat from './components/chat/Chat';
import {AxiosProvider} from './utils/axiosInterceptor'
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <AxiosProvider>
      <Routes>
            <Route path="/login" element={<Login/> } /> 
            <Route path="/chat" element={<Chat/> } /> 
            <Route path="*" element={<NotFound/> } /> 
      </Routes>
  </AxiosProvider>
  )
};

export default App;
