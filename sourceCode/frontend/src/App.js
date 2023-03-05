import React from 'react';
import {useEffect, useContext, useState} from "react";
import './App.css';
import SelectOption from './Components/SelectOption/SelectOption'
import RadioContext from './Context/RadioContext';
import PersonaContext from './Context/PersonaContext';
import Chatbot from './Components/Chatbot/Chatbot';
import axios from 'axios';

function App() {
  const { radio, setRadio } = useContext(RadioContext);
  const { persona, setPersona } = useContext(PersonaContext); //used for storing a selected persona
  const [data, setData] = useState([]); //used for an array of specific persona a user is able to select

  async function fillData(){
    try {
      const response = await axios.get("http://localhost:3001/api");
      setData(response.data);
    } catch (e) {
      console.log(e);
    } 
  }

  useEffect(() => {
    fillData()
  }, []);

  //useEffect(() => {console.log(data)}, [data]); //printing data to make sure it is ok!

  return (
      <div className="App">
        <header className="App-header">
        <SelectOption data = {data}></SelectOption>
          <div>
            {radio === "Text" ? 
              //persona ? (<Chatbot></Chatbot>) : null
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
