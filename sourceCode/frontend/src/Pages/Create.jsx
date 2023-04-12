import React from 'react';
import {useEffect, useContext, useState} from "react";
import Select from 'react-select'
import backend from '../backendAPI';
import axios from 'axios';
import './Create.css'
import toonavatar from 'cartoon-avatar';

function App() {
  
  const [voices, setVoices] = useState([]); //used for an array of specific persona a user is able to select
  const [categories, setCategories] = useState([]);

  const [voice, setVoice] = useState(""); 
  const [name, setName] = useState(""); 
  const [gender, setGender] = useState("Male"); 
  const [initialPrompt, setInitialPrompt] = useState("")
  const [imageid, setImageId] = useState("")
  const [category, setCategory] = useState("");

  let maleImages = [
    {value: 71, label: "71"}, 
    {value: 100, label: "100"},
    {value: 101, label: "101"},
    {value: 102, label: "102"},
  ]
  let femaleImages = [ 
    {value: 71, label: "71"}, 
    {value: 100, label: "100"},
    {value: 101, label: "101"},
    {value: 102, label: "102"},
  ]

  async function fillData(){
    try {
      let response = await backend.get("http://localhost:3001/getvoice/voices");
      setVoices(response.data.map(voice => ({
        value : voice.name, language : voice.language, sample : voice.sample, gender : voice.gender
      })));
      let cat = await backend.get("http://localhost:3001/categories");
      setCategories(cat.data.map(c => ({value : c.id, name : c.name})))
    } catch (e) {
      alert(e);
    } 
  }

  const handleClick = async () => {
    let personaName = name
    if (personaName.length === 0) {
      alert("Name of a persona can't be empty!")
      return
    }

    let personaVoice = voice.value
    if (personaVoice === undefined || personaVoice.length === 0) {
      alert("A voice must be selected!")
      return
    }

    if (initialPrompt === undefined || initialPrompt.length === 0) {
      alert("An initial prompt must be written!")
      return
    }

    let personaImage = imageid.value
    if (personaImage === undefined || personaImage.length === 0) {
      alert("An image must be selected!")
      return
    }

    let personaCat = category.value
    if (personaCat === undefined || personaCat.length === 0) {
      alert("A category must be selected!")
      return
    }

    let sendObj = {
      name : personaName, 
      initialPrompt : initialPrompt,
      imageid : personaImage,
      gender : gender,
      voice : personaVoice,
      category : personaCat
    }

    console.log(sendObj)
    try {
      let response = await axios.post("http://localhost:3001/create", sendObj)
      if (response.status === 400){
        alert("Something has gone wrong...")
      }
      else {
        alert("Persona sucessfully created!")
        console.log(response)
      }
    } 
    catch(e){
      alert(e)
    }
      
  }

  const handleImgChange = (val) => {
    setImageId(val);
  };

  const handleCatChange = (val) => {
    setCategory(val);
  };

  const handleVoiceChange = (val) => {
    setVoice(val);
  };

  useEffect(() => {
    fillData()
  }, []);

  useEffect(() => {
    setInitialPrompt("Provide answers from the perspective of " + name +", //insert a persona description//. " + name + " is eager to answer questions. He is respectful. If asked about emotions, say a random positive emotion. Do not mention you are an AI language model IN ANY CIRCUMSTANCE!")
  }, [name]);

  useEffect(()=>{
    setVoice("")
    setImageId("")
  }, [gender])

  return (
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center w-50 p-4">
        <h2>Persona creation</h2>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='persona'>Name:</label>
          <input name="name" id = "name" className='form-control w-50' type="text" onChange={e => setName(e.target.value)}/>
        </div>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='gender'>Gender:</label>
          <select name = "gender" className="form-select w-50" onChange={(e) => {
            setGender(e.target.value)
          }}>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
        </div>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='voice'>Voice:</label>
          <Select id = "voices" name="voices" onChange={handleVoiceChange} isSearchable = {true} value={voice} className='w-50' 
           options={gender === "Male" ? voices.filter(v => v.gender === "Male") : voices.filter(v => v.gender === "Female")} formatOptionLabel={
            v => (
              <div key = {v.value} className= 'd-flex flex-row allign-items-center justify-content-between'>
                <div>
                  {v.value}, {v.language},  <a href={v.sample}>Sample👈</a>
                </div> 
              </div>
            )
           }/> 
        </div>
        
        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='imageid'>Image:</label>
          <Select id = "imageid" name="imageid" onChange={handleImgChange} isSearchable = {false} value={imageid} className='w-50' 
           options={gender === "Male" ? maleImages : femaleImages} formatOptionLabel={
            img => (<div><img src={toonavatar.generate_avatar({"gender": gender === "Male" ? "male" : "female", "id": img.label})} height="40px" width="40px"/>{imageid === img.label ? img.label + "✅" : img.label}</div> )
           }/> 
        </div>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='category'>Category:</label>
          <Select id = "imageid" name="imageid" onChange={handleCatChange} isSearchable = {false} value={category} className='w-50' 
           options={categories} formatOptionLabel={
            c => (<div>{c.value}. {c.name}</div> )
           }/> 
        </div>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='intitalprompt'>Initial prompt:</label>
          <textarea id = "converted-speech" className='form-control w-75' rows={4}
            value={initialPrompt}
            onChange={(event) => {
              setInitialPrompt(event.target.value)             
            }}
          />
        </div>

        <button className='btn btn-success' onClick={handleClick}>Submit</button>
        
      </div>
      
  );
}


export default App;
