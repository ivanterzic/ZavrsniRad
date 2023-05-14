import {useEffect, useState, useContext} from "react";
import Select from 'react-select'
import backend from '../backendAPI';
import './Create.css'
import toonavatar from 'cartoon-avatar';
import { useNavigate } from 'react-router-dom';
import { femaleImages, maleImages } from '../Utils/imageArrays';
import { sanetizeString, checkPrivLevel } from '../Utils/Utils';

function App() {
  
  const [voices, setVoices] = useState([]); //used for an array of specific persona a user is able to select
  const [categories, setCategories] = useState([]);

  const [voice, setVoice] = useState(""); 
  const [name, setName] = useState(""); 
  const [gender, setGender] = useState("male"); 
  const [initialPrompt, setInitialPrompt] = useState("")
  const [imageid, setImageId] = useState("")
  const [category, setCategory] = useState("");
  const [promptEdited, setPromptEdited] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  async function fillData(){
    try {
      let response = await backend.get("/getvoice/voices");
      setVoices(response.data.map(voice => ({
        value : voice.name, language : voice.language, sample : voice.sample, gender : voice.gender
      })));
      let cat = await backend.get("/categories");
      setCategories(cat.data.map(c => ({value : c.id, name : c.name})))
    } catch (e) {
      alert(e);
    } 
  }

  const handleClick = async () => {
    let personaName = name
    if (personaName.trim().length === 0) {
      setMessage("Name of a persona can't be empty!")
      return
    }
    if (personaName.trim().length > 50) {
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

    let personaCat = category.value
    if (personaCat === undefined || personaCat.length === 0) {
      setMessage("A category must be selected!")
      return
    }

    let sendObj = {
      personaname : sanetizeString(personaName), 
      personainitialprompt : sanetizeString(initialPrompt),
      personaimageid : personaImage,
      personagender : gender,
      personavoice : personaVoice,
      personacategoryid : personaCat,
      creatorusername : sanetizeString(JSON.parse(sessionStorage.getItem("username")))
    }
    let response
    try {
      response = await backend.post("/create", sendObj)
      if (response.status === 400){
        setMessage("An error has occured.")
      }
      else if (response.status === 200) {
        setMessage("Persona sucessfully created!")
        handleReset();
        setMessage("Persona successfully created!")
        try {
          let res2 = await backend.post('/log', {
            type : "persona_created",
            data : JSON.stringify(
              {
                "persona_created" : sendObj
              }
            ),
            username : JSON.parse(sessionStorage.getItem("username"))
          })
        }
        catch (e) {
          console.log("Action couldn't be logged.")
        }
      }
      else {
        setMessage("An error has occured.")
      }
    } 
    catch(e){
      if (response.status === 400){
        setMessage("Bad request!")
      }
      else
        setMessage("Bad request!")
    }
      
  }

  const handleReset = async () => {
    setVoice("")
    setName("") 
    setGender("male");
    setInitialPrompt("Provide answers from the perspective of " + name +", **insert a persona description**. " + name + " is eager to answer questions. He is respectful. If asked about emotions, say a random positive emotion. Do not mention you are an AI language model IN ANY CIRCUMSTANCE!")
    setImageId("")
    setCategory("");
    setPromptEdited(false)
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
    checkPrivLevel(2, navigate);
    try {
      fillData()
    }
    catch (e){
      alert("An error has occured!")
    }
  }, []);

  useEffect(() => {
    setInitialPrompt("Provide answers from the perspective of " + name +", **insert a persona description**. " + name + " is eager to answer questions. He is respectful. If asked about emotions, say a random positive emotion. Do not mention you are an AI language model!")
  }, [name]);

  useEffect(()=>{
    setVoice("")
    setImageId("")
  }, [gender])

  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center p-4'> 
        <h2>Persona creation</h2>
        <h6>{message}</h6>
        <div className="mb-3 w-25">
          <label htmlFor='persona'>Name:</label>
          <input name="name" disabled={promptEdited} id = "name" className='form-control' type="text" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        

        <div className="mb-3 w-25">
          <label htmlFor='gender'>Gender:</label>
          <select name = "gender" className="form-select" onChange={(e) => {
            setGender(e.target.value)
          }}>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
        </div>
        <div className="mb-3 w-25">
          <label htmlFor='voice'>Voice:</label>
          <Select id = "voices" name="voices" onChange={handleVoiceChange} isSearchable = {true} value={voice} className='' 
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
          <Select id = "imageid" name="imageid" onChange={handleImgChange} isSearchable = {true} value={imageid} className='' 
           options={gender === "male" ? maleImages : femaleImages} formatOptionLabel={
            img => (<div><img src={toonavatar.generate_avatar({"gender": gender === "male" ? "male" : "female", "id": img.label})} height="40px" width="40px"/>{imageid === img.label ? img.label + "✅" : img.label}</div> )
           }/> 
        </div>

        <div className="mb-3 w-25">
          <label htmlFor='category'>Category:</label>
          <Select id = "imageid" name="imageid" onChange={handleCatChange} isSearchable={false} value={category} className='' 
           options={categories} formatOptionLabel={
            c => (<div>{c.value}. {c.name}</div> )
           }/> 
        </div>

        <div className="mb-3 w-25">
          <label htmlFor='intitalprompt' className=''>Initial prompt:</label>
          
        </div>
        <div className='container-fluid d-flex flex-column align-items-center w-50'>
            <textarea id = "converted-speech" className='form-control' rows={5}
              value={initialPrompt}
              onChange={(event) => {
                setPromptEdited(true)
                setInitialPrompt(event.target.value)             
              }}
            />
            <span className='align-self-start'>Prompt length: {initialPrompt.trim().length}, max length is 1000</span>
          </div>
       
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center w-25 p-4'>
          <button className='btn btn-success' onClick={handleClick}>Submit</button>
          <button className='btn btn-light' onClick={handleReset}>Reset</button>
        </div>
      </div> 
  );
}


export default App;
