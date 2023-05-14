import React, { useEffect, useContext } from 'react'; 
import { useState } from 'react';
import './chatbot.css';
import PersonaContext from '../../Context/PersonaContext';
import ChatDataContext from '../../Context/ChatDataContext';
import DisabledContext from '../../Context/DisabledContext'
import UserTextInputContext from '../../Context/UserInputContext';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { scrollDown, generateUniqueId, loader, sanetizeString } from '../../Utils/Utils';
import { sendPrompt, sendInitial } from '../../Utils/GPTUtils';
import LogIdContext from '../../Context/LogIdContext';
import backend from '../../backendAPI';

function Chatbot() {
  
  const {persona} = useContext(PersonaContext)
  const {userTextInput, setUserTextInput} = useContext(UserTextInputContext)
  const {chatData, setChatData} = useContext(ChatDataContext)
  const {disabled, setDisabled} = useContext(DisabledContext)
  const {log, setLog} = useContext(LogIdContext)
  const [personaObj, setPersonaObj] = useState();
  const [status, setStatus] = useState("No")
  
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
    if (persona){ setPersonaObj(JSON.parse(persona)) }
  }, [persona])

  useEffect(() => { 
    setLog(null)
    if (personaObj && chatData.length == 0){
      console.log(personaObj)
      sendInitial(chatData, setChatData, personaObj.initialprompt + " Do not mention you are an AI model in any circumstance! Write OK for confirmation. The questions will be provided by the user in the following messages.", setDisabled, setStatus);
      logConversation()
    }
  }, [personaObj]);

  useEffect(() => { 
    logConversation()
    scrollDown(document.getElementById("chat-body"))
  }, [chatData]);

  useEffect(()=>{
    !personaObj || status === "Pending" ? setDisabled(true) : setDisabled(false)
  }, [status, personaObj])

  


  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <div className='chat-wrapper'>
        <div className='border-bottom chat-header d-flex flex-row justify-content-between'>
            <div>{!personaObj ? "No persona selected!" :  
              <div className='container-fluid d-flex flex-row align-items-center justify-content-center persona-desc'>
                  <ProfileAvatar image = {personaObj.imageurl}></ProfileAvatar>
                  <div id = "chat-header" className='m-2 container-fluid d-flex flex-column align-items-start justify-content-start persona-desc'>
                      <div><h6 className='align-self-start'>{personaObj.name}</h6> </div>
                  </div>
              </div>
            }</div>
        </div>
        <div id = "chat-body" className='chat-body overflow-auto d-flex flex-column'>
          {chatData.slice(2).map( (d) => {
            
              let r = d.role.toString()
              let c = d.content.toString()
              
              return r === "assistant" ? 
                (<div className='d-flex flex-row' key = {generateUniqueId()}>
                  <div className='bg-success text-light mt-1 chat-message ai-chat-message'>{c}</div>
                </div>
                )
                :
                (<div className="d-flex flex-row-reverse" key = {generateUniqueId()}>
                  <div className='bg-info text-light mt-1 chat-message user-chat-message'>{c}</div>
                </div>
                );
            }
          )}
        </div>
      </div>
      <div className='container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap input-wrap'>
        <input className='form-control form-control-md input-form' type="text" onChange = {(e) => setUserTextInput(e.target.value)} value = {userTextInput} placeholder = {status === "Pending" ? "Establishing a connection..." : !personaObj ? ("No persona selected!") : "Ask " + personaObj.name + " something..."} disabled = {!personaObj || status === "Pending" ? true : false}/>
        <button className='btn btn-success' onClick = { (e) => {
          if (userTextInput.trim() !== ""){
            sendPrompt(chatData, setChatData, userTextInput, setUserTextInput, setDisabled)
          } } } disabled = {disabled}>Send message</button>
      </div> 
      {document.getElementById("chat-body") ? scrollDown(document.getElementById("chat-body")) : null}
    </div>
    
  );
}
export default Chatbot;