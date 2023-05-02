import React from 'react';
import './App.css';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Body from './Pages/Body';
import Login from './Pages/Login';
import Modify from './Pages/Modify';
import Create from './Pages/Create'
import NoAccess from './Pages/NoAccess';
import CreateUser from './Pages/CreateUser';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {RadioProvider} from './Context/RadioContext';
import Header from './Components/Header/Header'
import {PersonaProvider} from './Context/PersonaContext';
import {ChatDataProvider} from './Context/ChatDataContext';
import {DisabledProvider} from './Context/DisabledContext';
import { UserTextInputProvider } from './Context/UserInputContext';
import NoPage from './Pages/NoPage';
import { UserProvider } from './Context/UserContext';
/*"start": "PORT=4300 react-scripts start",*/
function App() {

  return (
  <>
  <UserProvider>
    <UserTextInputProvider>
      <DisabledProvider>
        <ChatDataProvider>
          <RadioProvider>
              <PersonaProvider>
                <Router>
                  <Header></Header>
                  <Routes>
                      <Route path="/" element={<Body />} />
                      <Route path ="login" element={<Login />} />
                      <Route path="modify" element={<Modify />} />
                      <Route path="create" element={<Create />} />
                      <Route path="createuser" element={<CreateUser />} />
                      <Route path="noaccess" element={<NoAccess />} />
                      <Route path="*" element={<NoPage />}>
                    </Route>
                  </Routes>
                </Router>
              </PersonaProvider>
            </RadioProvider>
        </ChatDataProvider>
      </DisabledProvider>
    </UserTextInputProvider>
  </UserProvider>
    
  </>
    
  );
}

export default App;
