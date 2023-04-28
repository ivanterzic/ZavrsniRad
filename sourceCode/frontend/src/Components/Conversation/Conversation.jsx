import React, { useEffect, useContext } from 'react'; 
import { useState } from 'react';
import './Conversation.css';
import { scrollDown, generateUniqueId, loader } from '../../Utils/Utils';
import { sendTwoPersonaPrompt } from '../../Utils/GPTUtils';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

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
    
    const [awaitingMessage, setAwaitingMessage] = useState(false)

    let pendingText = "";

    async function continueConversation(){ 
        if(conversationHappening === true){
            await setTimeout(() => {}, 500)
            setAwaitingMessage(true)
            if (turn === 2){
                let div = document.createElement("div")
                document.getElementById("p2-typing").appendChild(div)
                loader(div)
                pendingText = await sendTwoPersonaPrompt(persona2Data, newMessage, setPersona2Data)
                if(pendingText.includes(persona2.name + ":")){
                    let s = pendingText.split(persona2.name + ":")
                    pendingText = s[0] + s[1]
                }
                chatData.push({"role" : "p2", "content" : pendingText})
                setTurn(1)
                setNewMessage(pendingText)  
                div.remove()
            }
            else if (turn === 1) {
                let div = document.createElement("div")
                document.getElementById("p1-typing").appendChild(div)
                loader(div)
                pendingText = await sendTwoPersonaPrompt(persona1Data, newMessage, setPersona1Data)
                if(pendingText.includes(persona1.name + ":")){
                    let s = pendingText.split(persona1.name + ":")
                    pendingText = s[0] + s[1]
                }
                chatData.push({"role" : "p1", "content" : pendingText})
                setTurn(2)
                setNewMessage(pendingText)
                div.remove()
            }
            setAwaitingMessage(false)
        }
    }

    async function startConversation(e){
        
        if (persona1 === undefined || !persona2){
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
                setAwaitingMessage(true)
                let div = document.createElement("div")
                document.getElementById("p1-typing").appendChild(div)
                loader(div)
                pendingText = await sendTwoPersonaPrompt(persona1Data, persona1.initialPrompt + ` The user is in this case ${persona2.name}. The topic of the conversation is ${topic}, initiate a conversation with a short message! Do not generate messages from the user!`, setPersona1Data)
                setChatData([{"role" : "p1", "content" : pendingText}])
                div.remove()
                setNewMessage(pendingText)
                setConversationHappening(true)
                setConversationStarted(true)
                setAwaitingMessage(false)
            }
            else {
                console.log("Action was cancelled. No persona change has occured.")
            }
        }
    }

    async function changeTopic(e){
            setNewMessage(`I would like to talk about ${topic}, ask me a question about ${topic}!`)
            chatData.push({"role" : "p" + turn, "content" : `I would like to talk about ${topic} now.`})
            turn === 1 ? setTurn(2) : setTurn(1)
            alert("New conversation topic set! " + topic)
    }

  useEffect(()=>{
    if (conversationHappening && newMessage !== "") continueConversation()
  }, [conversationHappening, newMessage])

  useEffect(() => { 
    scrollDown(document.getElementById("chat-body"))
  }, [chatData]);


  return (
    <>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
            <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
                <select id = "persona1-select" name = "persona" className="selectpicker p-2" disabled = {conversationHappening} onChange={(e)=>{
                    setPersona1(JSON.parse(e.target.value))}}>
                    <option selected hidden value={undefined}>Select a persona...</option>
                    {props.categories.map((c) => {
                        return(
                            <optgroup label={c.name}>
                                {props.data.map((p) => {
                                    if (p.category === c.id)
                                        return (<option key = {p.name} value = {JSON.stringify(p)}>{p.name}</option>)
                                })
                                }
                            </optgroup>)
                    })}   
                </select>  
            </div>
            <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
                <select id = "persona2-select" name = "persona" className="selectpicker p-2" disabled = {conversationHappening} onChange={(e)=>{
                    setPersona2(JSON.parse(e.target.value))}}>
                    <option selected hidden value={undefined}>Select a persona...</option>
                    {props.categories.map((c) => {
                        return(
                            <optgroup label={c.name}>
                                {props.data.map((p) => {
                                    if (p.category === c.id)
                                        return (<option key = {p.name} value = {JSON.stringify(p)}>{p.name}</option>)
                                })
                                }
                            </optgroup>)
                    })}  
                </select>  
            </div>
            <input value={topic} class="form-control form-control-sm w-25" type="text" placeholder="Pick a topic" disabled = {conversationHappening} onChange = {(e) => {
                setTopic(e.target.value)
            }}></input>
            <button type="button" className="btn btn-success" disabled = {conversationHappening || awaitingMessage} onClick={e => startConversation()}>Submit</button>
            <button disabled={!conversationStarted || (conversationStarted && conversationHappening) || awaitingMessage} type="button" className="btn btn-success" onClick={e => changeTopic()}>Change topic</button>
        </div>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
            <button disabled = {!conversationStarted || !conversationHappening && awaitingMessage} onClick={(e) => {
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
                            <div id='p1-typing'></div>
                        </div>
                        : null}
                    </div>
                    <div>{persona2 ? 
                        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
                            <div id='p2-typing'></div>
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