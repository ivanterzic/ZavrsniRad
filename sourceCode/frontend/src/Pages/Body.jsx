import React from 'react';
import {useEffect, useContext, useState} from "react";

import SelectOption from '../Components/SelectOption/SelectOption'
import RadioContext from '../Context/RadioContext';
import PersonaContext from '../Context/PersonaContext';
import Chatbot from '../Components/Chatbot/Chatbot';
import Interactive from '../Components/Interactive/Interactive'

import toonavatar from 'cartoon-avatar';
import Conversation from '../Components/Conversation/Conversation';
import backend from '../backendAPI';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';

function App() {
  
  const navigate = useNavigate();

  const {user, setUser} = useContext(UserContext)
  const { radio, setRadio } = useContext(RadioContext);
  const { persona, setPersona } = useContext(PersonaContext); //used for storing a selected persona
  const [data, setData] = useState([]); //used for an array of specific persona a user is able to select
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState();

  async function fillData(){
    try {
      let response = await backend.get("/personadata");
      for (let p of response.data){
        p.imageurl = toonavatar.generate_avatar(
          {"gender": p.gender, 
            "id": p.imageid ? p.imageid : null
        });  
      }
      setData(response.data);
      let cat = await backend.get("/categories");
      setCategories(cat.data)
      setLoaded(true)
    } catch (e) {
      console.log(e);
      setLoaded(false)
    } 
  }

  useEffect(() => {
    if (user === undefined) {
      navigate('/login')
    }
    else if (user["privlevel"] !== 3){
      navigate('/noaccess')
    }
    try {
      fillData()
    }
    catch (e){
      alert("An error has occured!")
    }
  }, []);


  return (
      <div className="App">
        <header className="App-header">
        <SelectOption data = {data} categories = {categories}></SelectOption>
        {loaded === false ? <h5 className="d-flex flex-row allign-items-center justify-content-center">Unable to reach server, no persona loaded!</h5> : null}
        <div>
          {radio === "Text" ? <Chatbot></Chatbot> :
            radio === "Interactive" ? <Interactive></Interactive>:
            <Conversation data = {data} categories = {categories}></Conversation>
          }
        </div>
        </header>
      </div>
  );
}

export default App;
