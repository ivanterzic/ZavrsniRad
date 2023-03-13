import React, { useState, useContext, useEffect} from 'react';
import PersonaContext from '../../Context/PersonaContext';
import './Interactive.css';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechToText from '../SpeechToText/SpeechToText';
import ChatDataContext from '../../Context/ChatDataContext';
import DisabledContext from '../../Context/DisabledContext';
import UserTextInputContext from '../../Context/UserInputContext';
import { sendInitial, sendPrompt } from '../../Utils/GPTUtils';

function Interactive() {

  const {persona} = useContext(PersonaContext)
  const {userTextInput, setUserTextInput} = useContext(UserTextInputContext)
  const {chatData, setChatData} = useContext(ChatDataContext)
  const {disabled, setDisabled} = useContext(DisabledContext)
  
  const [personaObj, setPersonaObj] = useState();
  const [status, setStatus] = useState("No")
 
  const [speakData, setSpeakData] = useState("");

  useEffect(() => {
    if (persona){
      setPersonaObj(JSON.parse(persona))
    }
  }, [persona])

  useEffect(() => { 
    if (personaObj && chatData.length == 0)
      sendInitial(chatData, setChatData, personaObj.initialPrompt, setDisabled, setStatus );
  }, [personaObj]);
  
  useEffect(()=>{
    !personaObj || status === "Pending" ? setDisabled(true) : setDisabled(false)
  }, [status, personaObj])

    return ( 
        <>
            <div id='chat-header'></div>
            <div className='container-fluid d-flex flex-row align-items-center justify-content-between'>
                <div className='wrap'><TextToSpeech data = {speakData}></TextToSpeech></div>
                <div className='container-fluid d-flex flex-column align-items-center justify-content-center flex-wrap'>
                    <div className='p-4 container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap'>
                        <input className='form-control form-control-md input-form' type="text" onChange = { (e) => {
                          setUserTextInput(e.target.value)
                          
                        }} value = {userTextInput} placeholder = {status === "Pending" ? "Establishing a connection..." : !personaObj ? ("No persona selected!") : "Ask " + personaObj.name + " something..."} disabled = {!personaObj || status === "Pending" ? true : false}/>
                        <button className='btn btn-success' onClick = { async (e) => {
                          if (userTextInput.trim() !== ""){
                            let r = await sendPrompt(chatData, setChatData, userTextInput, setUserTextInput)
                            console.log(r)
                            setSpeakData(r)
                          }
                          
                          }} disabled = {disabled}>Send message</button>
                    </div>
                    <h5>Or...</h5>
                    <SpeechToText className="w-100" setSpeakData = {setSpeakData}></SpeechToText>
                </div> 
            </div>
        </>
    );
}

export default Interactive;
