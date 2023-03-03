import React, { useState } from 'react';
import {useEffect, createContext, useContext} from "react";
import './App.css';
import SelectOption from './Components/SelectOption/SelectOption'
import RadioContext from './Context/RadioContext';
import { RadioProvider } from './Context/RadioContext';
import PersonaContext, { PersonaProvider } from './Context/PersonaContext';
//import API from "./api";
import Chatbot from './Components/Chatbot/Chatbot';
import axios from 'axios';

function App() {
  const { radio, setRadio } = useContext(RadioContext);
  const { persona, setPersona } = useContext(PersonaContext);
  const [data, setData] = React.useState();

  async function fillPersona(){
    try {
      const response = await axios.get("http://localhost:3001/api");
      setData(response.data);
      setPersona(response.data);
    } catch (e) {
      console.log(e);
    } 
  }

  useEffect(() => {
    fillPersona()
  }, []);

  return (
      <div className="App">
        <SelectOption persona = {data}></SelectOption>
        <header className="App-header">
          <p>
            {!data ? "Loading persona..." : data.map( (d) => {
              return(
                d + " "
              )
            })}
          </p>

          <div>
            {radio === "Text" ? 
              <Chatbot></Chatbot>
            :
              <div>Visual placeholder</div>
            }
          </div>
        </header>
      </div>
  );
}

export default App;
