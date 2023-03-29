import React, { useEffect, useContext } from 'react'; 
import { useState } from 'react';
import './Conversation.css';

import { scrollDown, generateUniqueId, loader } from '../../Utils/Utils';
import { sendTwoPersonaPrompt } from '../../Utils/GPTUtils';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

//DODATI TYPING ZA P1 i P2, promjenu teme

function Conversation(props) {
  
  const [chatData, setChatData] = useState([])

  const [status, setStatus] = useState("No")

  const [persona1, setPersona1] = useState(undefined)
  const [persona2, setPersona2] = useState(undefined)

  const [persona1Data, setPersona1Data] = useState([])
  const [persona2Data, setPersona2Data] = useState([])

  const [topic, setTopic] = useState("")
  const [conversationHappening, setConversationHappening] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const [turn, setTurn] = useState(2)

  let pendingText = "";
  /*useEffect(() => {
    if (persona){ setPersonaObj(JSON.parse(persona)) }
  }, [persona])*/

  /*useEffect(() => { 
    if (personaObj && chatData.length == 0)
      sendInitial(chatData, setChatData, personaObj.initialPrompt, setDisabled, setStatus );
  }, [personaObj]);*/

  async function continueConversation(){ 
    if(conversationHappening == true){
        if (turn == 2){
            pendingText = await sendTwoPersonaPrompt(persona2Data, newMessage, setPersona2Data)
            chatData.push({"role" : "p2", "content" : pendingText})
            setTurn(1)
            setNewMessage(pendingText)
            
        }
        if (turn == 1) {
            pendingText = await sendTwoPersonaPrompt(persona1Data, newMessage, setPersona1Data)
            chatData.push({"role" : "p1", "content" : pendingText})
            setTurn(2)
            setNewMessage(pendingText)
        }
    }
  }

  useEffect(()=>{
    console.log("p1")
    console.log(persona1Data)
    console.log("p2")
    console.log(persona2Data)
    console.log(chatData)
    console.log(turn)
    if (conversationHappening && newMessage != "")
        continueConversation()
  }, [conversationHappening, newMessage])

  useEffect(() => { 
    scrollDown(document.getElementById("chat-body"))
  }, [chatData]);


  return (
    <>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
        
            <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
                <select id = "persona1-select" name = "persona" className="selectpicker p-2" onChange={(e)=>{
                    setPersona1(JSON.parse(e.target.value))
                }}/*size={3}*/>
                    <optgroup label="?">
                        <option selected hidden value={undefined}>Select a persona...</option>
                        { 
                            props.data.map((p) => {
                                /*if(p.name !== persona2.name)*/     
                                return (<option key = {p.name} value = {JSON.stringify(p)}>{p.name}</option>)
                            })
                        }
                    </optgroup>
                </select>  
            </div>
            <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
                <select id = "persona2-select" name = "persona" className="selectpicker p-2" onChange={(e)=>{
                    setPersona2(JSON.parse(e.target.value))
                }}/*size={3}*/>
                    <optgroup label="?">
                        <option selected hidden value={undefined}>Select a persona...</option>
                        { 
                            props.data.map((p) => {
                                /*if(persona1 p.name !== persona1.name) //HOCEMO LI DA SE MOZE ISTA PERSONA?*/
                                return (<option key = {p.name} value = {JSON.stringify(p)}>{p.name}</option>)

                               
                            })
                        }
                    </optgroup>
                </select>  
            </div>
            <input value={topic} class="form-control form-control-sm w-25" type="text" placeholder="Pick a topic" disabled = {conversationHappening} onChange = {(e) => {
                setTopic(e.target.value)
            }}></input>
            <button type="button" className="btn btn-success" onClick={async (e) => {
                if (persona1 == undefined || !persona2){
                    alert("Please select both personas!")
                }
                else if (!topic || topic === ""){
                    alert("Please choose a topic!")
                }
                else if (persona1 === persona2) alert("Please select different personas!")
                else {
                    let resp = window.confirm("Are you sure you want to select these two persona: " + persona1.name + " and " + persona2.name +"? Current chat data will be deleted! ")
                    if (resp){
                        setChatData([])
                        setPersona2Data([
                            {
                                "role" : "user", 
                              "content" : persona2.initialPrompt + ` The user is in this case ${persona1.name}. The topic of the conversation is ${topic}. ${persona2.name} will initiate the conversation.`
                            }, {
                                "role" : "assistant", 
                                "content" : "OK"
                            }])

                        pendingText = await sendTwoPersonaPrompt(persona1Data, persona1.initialPrompt + ` The user is in this case ${persona2.name}. The topic of the conversation is ${topic}, initiate a conversation with a short message. Talk from the perspective of ${persona1.name}!`, setPersona1Data)
                        await setChatData([{"role" : "p1", "content" : pendingText}])
                        setNewMessage(pendingText)
                        setConversationStarted(true)
                        setConversationHappening(true)
                    }
                    else {
                        console.log("Action was cancelled. No persona change has occured.")
                    }
                }
            }}>Submit</button>
            <button disabled={!conversationStarted || (conversationStarted && conversationHappening)} type="button" className="btn btn-success" onClick={e => {
                setNewMessage(`I would like to talk about ${topic}, ask me a question about ${topic}!`)
                chatData.push({"role" : "p" + turn, "content" : `I would like to talk about ${topic}, can you ask me a question about ${topic}?`})
                turn === 1 ? setTurn(2) : setTurn(1)
                alert("New conversation topic set! " + topic)
            }}>Change topic</button>
        </div>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
            <button disabled = {!conversationStarted} onClick={(e) => {
                setConversationHappening(!conversationHappening)
            }}>{conversationHappening ? "⏸" : "▶️"}</button>
        </div>
            

        <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
            <div className='chat-wrapper'>
                <div  id = "chat-header" className='border-bottom chat-header d-flex flex-row justify-content-between'>
                    <div>{persona1 ? 
                        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
                            <ProfileAvatar image = {persona1.imageurl}></ProfileAvatar>
                            <div className='m-3'>
                                <span>{persona1.name}</span> 
                            </div>
                        </div>
                        : null}
                    </div>
                    <div>{persona2 ? 
                        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
                            <div className='m-3'>
                                <span>{persona2.name}</span> 
                            </div>
                            <ProfileAvatar image = {persona2.imageurl}></ProfileAvatar>
                        </div> 
                        : null}
                    </div>
                </div>
                <div id = "chat-body" className='chat-body overflow-auto d-flex flex-column'>
                {chatData.map( (d) => {
                    console.log(d)
                    let r = d.role.toString()
                    let c = d.content.toString()
                    return r === "p1" ? 
                        (<div className='d-flex flex-row' key = {generateUniqueId()}>
                        <div className='bg-success text-light mt-1 chat-message p1-chat-message'>{c}</div>
                        </div>
                        )
                        :
                        (<div className="d-flex flex-row-reverse" key = {generateUniqueId()}>
                        <div className='bg-info text-light mt-1 chat-message p2-chat-message'>{c}</div>
                        </div>
                        );
                    }   
                )}
                </div>
            </div>
        </div> 
    </>
  );
}
export default Conversation;