import React from 'react';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import Body from './Pages/Body';
import Login from './Pages/Login';
import Modify from './Pages/Modify';
import Create from './Pages/Create'
import NoAccess from './Pages/NoAccess';
import CreateUser from './Pages/CreateUser';
import Edit from './Pages/Edit'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {RadioProvider} from './Context/RadioContext';
import Header from './Components/Header/Header'
import {PersonaProvider} from './Context/PersonaContext';
import {ChatDataProvider} from './Context/ChatDataContext';
import {DisabledProvider} from './Context/DisabledContext';
import { UserTextInputProvider } from './Context/UserInputContext';
import {LogContextProvider} from './Context/LogIdContext';

import NoPage from './Pages/NoPage';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
  <>

      <UserTextInputProvider>
        <DisabledProvider>
          <LogContextProvider>
          <ChatDataProvider>
            <RadioProvider>
                <PersonaProvider>
                  <Router>
                    <Header loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}></Header>
                    <Routes>
                        <Route path="/" element={<Body />} /> 
                        <Route path ="login" element={<Login loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>} />
                        <Route path="modify" element={<Modify />} />
                        <Route path="create" element={<Create />} />
                        <Route path="edit" element={<Edit />} />
                        <Route path="createuser" element={<CreateUser />} />
                        <Route path="noaccess" element={<NoAccess />} />
                        <Route path="*" element={<NoPage />}>
                      </Route>
                    </Routes>
                  </Router>
                </PersonaProvider>
              </RadioProvider>
          </ChatDataProvider>
          </LogContextProvider>
        </DisabledProvider>
      </UserTextInputProvider>

  </>
    //
  );
}

export default App;
