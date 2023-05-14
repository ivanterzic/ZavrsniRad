import React, { useState, useContext, useEffect} from 'react';
import PersonaContext from '../../Context/PersonaContext';
import './Interactive.css';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechToText from '../SpeechToText/SpeechToText';
import ChatDataContext from '../../Context/ChatDataContext';
import DisabledContext from '../../Context/DisabledContext';
import UserTextInputContext from '../../Context/UserInputContext';
import { sendInitial, sendPrompt } from '../../Utils/GPTUtils';
import backend from '../../backendAPI';
import { sanetizeString } from '../../Utils/Utils';
import LogIdContext from '../../Context/LogIdContext';

function Interactive() {

  const {persona} = useContext(PersonaContext)
  const {userTextInput, setUserTextInput} = useContext(UserTextInputContext)
  const {chatData, setChatData} = useContext(ChatDataContext)
  const {disabled, setDisabled} = useContext(DisabledContext)
  const {log, setLog} = useContext(LogIdContext)
  const [personaObj, setPersonaObj] = useState();
  const [status, setStatus] = useState("No")
 
  const [speakData, setSpeakData] = useState("");
  
  async function logConversation(){
    let res
    if (log === null){
      try {
        res = await backend.post('/log', {
          type : "conversation",
          data : (JSON.stringify({
            persona : sanetizeString(JSON.stringify(persona)),
            chatData : sanetizeString(JSON.stringify(chatData))
          })),
          username : JSON.parse(sessionStorage.getItem("username"))
        })
        res = res.data[0].logid
        setLog(res)
      }
      catch (e) {
        console.log("Action couldn't be logged.")
      }
    }
    else {
      try {
        res = await backend.post('/log/update_log', {
          logid : log,
          data : (JSON.stringify({
            persona : sanetizeString(JSON.stringify(persona)),
            chatData : sanetizeString(JSON.stringify(chatData))
          })),
        })
      }
      catch (e) {
        console.log("Action couldn't be logged.")
      }
    }
  }

  useEffect(() => {
    setLog(null)
    if (persona){
      setPersonaObj(JSON.parse(persona))
    }
  }, [persona])

  useEffect(() => { 
    setLog(null)
    if (personaObj && chatData.length == 0){
      sendInitial(chatData, setChatData, personaObj.initialprompt + " Do not mention you are an AI model in any circumstance! Write OK for confirmation. The questions will be provided by the user in the following messages.", setDisabled, setStatus);
      logConversation()
    }
   
  }, [personaObj]);
  
  useEffect(()=>{
    !personaObj || status === "Pending" ? setDisabled(true) : setDisabled(false)
  }, [status, personaObj])

    return ( 
        <>           
          <div className='container-fluid d-flex flex-row align-items-center justify-content-between flew-wrap'>
              <div className='wrap'><TextToSpeech data = {speakData}></TextToSpeech></div>
              <div className='container-fluid d-flex flex-column align-items-center justify-content-center flex-wrap'>
                  <div className='p-4 container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap'>
                      <input className='form-control form-control-md input-form' type="text" onChange = { (e) => {
                        setUserTextInput(e.target.value)
                      }} value = {userTextInput} placeholder = {status === "Pending" ? "Establishing a connection..." : !personaObj ? ("No persona selected!") : "Ask " + personaObj.name + " something..."} disabled = {!personaObj || status === "Pending" ? true : false}/>
                      <button className='btn btn-success' onClick = { async (e) => {
                          if (userTextInput.trim() !== ""){
                            try {
                              let r = await sendPrompt(chatData, setChatData, userTextInput, setUserTextInput, setDisabled)
                              logConversation()
                              console.log(r)
                              setSpeakData(r)
                              logConversation()
                            }
                            catch (e) {
                              alert("An error has occured!")
                              console.log(e)
                            }
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
