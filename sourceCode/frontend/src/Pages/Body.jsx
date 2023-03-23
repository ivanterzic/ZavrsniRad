import React from 'react';
import {useEffect, useContext, useState} from "react";

import SelectOption from '../Components/SelectOption/SelectOption'
import RadioContext from '../Context/RadioContext';
import PersonaContext from '../Context/PersonaContext';
import Chatbot from '../Components/Chatbot/Chatbot';
import Interactive from '../Components/Interactive/Interactive'
import axios from 'axios';

import toonavatar from 'cartoon-avatar';

function App() {
  const { radio, setRadio } = useContext(RadioContext);
  const { persona, setPersona } = useContext(PersonaContext); //used for storing a selected persona
  const [data, setData] = useState([]); //used for an array of specific persona a user is able to select
  const [loaded, setLoaded] = useState();

  async function fillData(){
    try {
      const response = await axios.get("http://localhost:3001/personadata");
      for (let p of response.data){
        console.log(p.image)
        p.image = toonavatar.generate_avatar(p.image);
        console.log(p.image)
      }
      setData(response.data);
      setLoaded(true)
    } catch (e) {
      console.log(e);
      setLoaded(false)
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
        {loaded === false ? <h5 className="d-flex flex-row allign-items-center justify-content-center">Unable to reach server, no persona loaded!</h5> : null}
        <div>
          {radio === "Text" ? 
            <Chatbot></Chatbot>
            :
            <Interactive></Interactive>
          }
        </div>
        </header>
      </div>
  );
}

export default App;
