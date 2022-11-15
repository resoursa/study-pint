import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOLE_API_TOKEN}>
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='/*' element={<Home />}/>
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App