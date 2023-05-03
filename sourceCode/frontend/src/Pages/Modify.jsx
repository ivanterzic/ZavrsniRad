import React from 'react';
import {useEffect, useState, useContext} from "react";
import Select from 'react-select'
import backend from '../backendAPI';
import './Create.css'
import toonavatar from 'cartoon-avatar';
import { useNavigate } from 'react-router-dom';
import { femaleImages, maleImages } from '../Utils/imageArrays';
import { sanetizeString } from '../Utils/Utils';

function App() {
  
  const [voices, setVoices] = useState([]); //used for an array of specific persona a user is able to select
  const [voice, setVoice] = useState(""); 
  const [name, setName] = useState(""); 
  const [gender, setGender] = useState("Male"); 
  const [initialPrompt, setInitialPrompt] = useState("")
  const [imageid, setImageId] = useState("")
  const [message, setMessage] = useState("")
  const [persona, setPersona] = useState("")
  const [personaArray, setPersonaArray] = useState([])
  const [personaSelected, setPersonaSelected] = useState(false)
  const navigate = useNavigate()

  async function fillData(){
    try {
      let response = await backend.get("/getvoice/voices");
      setVoices(response.data.map(voice => ({
        value : voice.name, language : voice.language, sample : voice.sample, gender : voice.gender
      })));
      response = await backend.get("/personadata");
      setPersonaArray(response.data.map(p => ({
        value : p.id, persona :  p
      })))
    } catch (e) {
      alert(e);
    } 
  }

  const handleClick = async () => {
    if (name.trim().length === 0) {
      setMessage("Name of a persona can't be empty!")
      return
    }
    if (name.trim().length > 50) {
      setMessage("Persona name must not be longer than 50 characters")
      return
    }

    let personaVoice = voice.value
    if (personaVoice === undefined || personaVoice.trim().length === 0) {
      setMessage("A voice must be selected!")
      return
    }

    if (initialPrompt === undefined || initialPrompt.trim().length === 0) {
      setMessage("An initial prompt must be written!")
      return
    }
    if (initialPrompt.trim().length > 1000) {
      setMessage("An initial prompt must not be longer than 1000 characters!")
      return
    }

    let personaImage = imageid.value
    if (personaImage === undefined || personaImage.length === 0) {
      setMessage("An image must be selected!")
      return
    }
    let sendObj = {
      personaname : name, 
      personainitialprompt : sanetizeString(initialPrompt),
      personaimageid : imageid.value,
      personagender : gender,
      personavoice : voice.value,
      creatorusername : sessionStorage.getItem("username"),
      originalpersona : persona.persona.id
    }
    let response

    try {
      response = await backend.post("/create/modified", sendObj)
      if (response.status === 400){
        setMessage("An error has occured.")
      }
      else if (response.status === 200) {
        handleReset();
        setMessage("Modified persona sucessfully created!")
        fillData()
      }
      else {
        setMessage("An error has occured.")
      }
    } 
    catch(e){
      setMessage("An error has occured!")
    }
      
  }

  const handleReset = async () => {
    setPersona("")
    setVoice("")
    setName("") 
    setGender("");
    setInitialPrompt("")
    setImageId("")
    setPersonaSelected(false)
  }

  const handleImgChange = (val) => {
    
    gender === "male" ? 
    setImageId(maleImages.filter( i => {if (i.value === val) return i})[0])
    :
    setImageId(femaleImages.filter( i => {if (i.value === val) return i})[0])
  };

  const handleVoiceChange = (val) => {
    setVoice(voices.filter( i => {if (i.value === val) return i})[0]);
  };

  const handlePersonaChange = (val) => {
    setPersona(val);
    setGender(val.persona.gender)
    setName(val.persona.name)
    handleVoiceChange(val.persona.voice)
    handleImgChange(val.persona.imageid)
    setInitialPrompt(val.persona.initialprompt)
    setPersonaSelected(true)
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") === undefined) {
      navigate('/login')
    }
    else if (JSON.parse(sessionStorage.getItem("privlevel")) !== 2){
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
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center p-4'> 
        <h2>Persona variation creation</h2>
        <h6>{message}</h6>

        <div className="mb-3 w-25">
          <label htmlFor='voice'>Persona picker:</label>
          <Select id = "persona" name="persona" onChange={handlePersonaChange} isSearchable = {true} value={persona} className='' 
           options={personaArray} formatOptionLabel={
            p => (
              <div key = {p.id} className= 'd-flex flex-row allign-items-center justify-content-between'>
                <div>
                  {p.persona.name}
                </div> 
              </div>
            )
           }/> 
        </div>

        <div className="mb-3 w-25">
          <label htmlFor='persona'>Name:</label>
          <input name="name" id = "name" disabled={!personaSelected} className='form-control' type="text" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="mb-3 w-25">
          <label htmlFor='voice'>Voice:</label>
          <Select isDisabled={!personaSelected} id = "voices" name="voices" onChange={handleVoiceChange} isSearchable = {true} value={voice} className='' 
           options={gender === "male" ? voices.filter(v => v.gender === "Male") : voices.filter(v => v.gender === "Female")} formatOptionLabel={
            v => (
              <div key = {v.value} className= 'd-flex flex-row allign-items-center justify-content-between'>
                <div>
                  {v.value}, {v.language},  <a href={v.sample}>Sample👈</a>
                </div> 
              </div>
            )
           }/> 
        </div>
        
        <div className="mb-3 w-25">
          <label htmlFor='imageid'>Image:</label>
          <Select isDisabled={!personaSelected} id = "imageid" name="imageid" onChange={handleImgChange} isSearchable = {true} value={imageid} className='' 
           options={maleImages} formatOptionLabel={
            img => (<div><img src={toonavatar.generate_avatar({"gender": gender, "id": img.label})} height="40px" width="40px"/>{imageid === img.label ? img.label + "✅" : img.label}</div> )
           }/> 
        </div>
        <div className="mb-3 w-25">
          <label htmlFor='intitalprompt'>Initial prompt:</label>
          
        </div>
        <div className='container-fluid d-flex flex-column align-items-center w-50'>
            <textarea disabled={!personaSelected} id = "converted-speech" className='form-control' rows={5}
              value={initialPrompt}
              onChange={(event) => {
                setInitialPrompt(event.target.value)             
              }}
            />
            {initialPrompt !== undefined ? <span className='align-self-start'>Prompt length: {initialPrompt.trim().length}, max length is 1000</span> : null}
            
          </div>
       
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center w-25 p-4'>
          <button disabled={!personaSelected} className='btn btn-success' onClick={handleClick}>Submit</button>
          <button className='btn btn-light' onClick={handleReset}>Reset</button>
        </div>
      </div>
      
  );
}


export default App;
