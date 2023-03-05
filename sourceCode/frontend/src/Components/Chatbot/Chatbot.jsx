import React, { useEffect, useContext } from 'react'; 
import { useState } from 'react';
import './chatbot.css';
import PersonaContext from '../../Context/PersonaContext';
const { Configuration, OpenAIApi } = require("openai");

function Chatbot() {

  const openAIKey = "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"
  const configuration = new Configuration({ apiKey: openAIKey, });
  const openai = new OpenAIApi(configuration);

  const {persona} = useContext(PersonaContext)
  const [userTextInput, setUserTextInput] = useState("")
  const [chatData, setChatData] = useState([])
  const [personaObj, setPersonaObj] = useState();
  const [status, setStatus] = useState("No")
  let loadInterval

  
  function scrollDown(e) {
    e.scrollTop = e.scrollHeight;
  }

  function loader(e) {
    e.textContent = 'Typing'
    loadInterval = setInterval(() => {
      e.textContent += '.';
        if (e.textContent === 'Typing....') {
          e.textContent = 'Typing';
        }
    }, 300);
  }

  function generateUniqueId() {
      const timestamp = Date.now();
      const randomNumber = Math.random();
      const hexadecimalString = randomNumber.toString(16);
      return `id-${timestamp}-${hexadecimalString}`;
  }

  useEffect(() => {
    if (persona){
      setPersonaObj(JSON.parse(persona))
      console.log("Promijenjena persona i zadan persona object")
    }
  }, [persona])

  useEffect(() => { 
    async function sendInitial() {
      if (personaObj){
        setStatus("Pending")

        const div = document.createElement("div")
        document.getElementById("chat-header").appendChild(div)
        div.innerHTML += "Connecting..."

        let prompt = personaObj.initialPrompt
        setChatData([])
        chatData.push({"role" : "user", "content" : prompt})
        console.log(chatData)
        
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: chatData,
        });

        console.log("Initial message sent")
        console.log(response.data.choices[0].message);

        setChatData([...chatData, {
          "role" : "assistant", 
          "content" : response.data.choices[0].message.content
        }])

        setStatus("Active")
        div.remove()
      }
    }
    sendInitial();
  }, [personaObj]);

  useEffect(() => { 
    scrollDown(document.getElementById("chat-body"))
  }, [chatData]);
 
  async function sendPrompt(){

    
    await chatData.push({"role" : "user", "content" : userTextInput})
    await setChatData(chatData)
    setUserTextInput("")
    console.log(chatData)
    
    const div = document.createElement("div")
    document.getElementById("chat-header").appendChild(div)
    loader(div)
    
    scrollDown(document.getElementById("chat-body"))
    const response = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chatData});


    console.log(response.data.choices[0].message);
    await setChatData([...chatData, {"role" : "assistant", "content" : response.data.choices[0].message.content}])
    div.remove()

    console.log(chatData)
    
  }

  return (
    //ili staviti kao gore ime i sliku kao pravi chat ili iznad poruke kao u WhatsApp grupama
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
      <div className='chat-wrapper'>
        <div  id = "chat-header" className='border-bottom chat-header d-flex flex-row justify-content-between'>
            <div>{!personaObj ? "No persona selected!" : personaObj.name}</div>
        </div>
        <div id = "chat-body" className='chat-body overflow-auto d-flex flex-column'>
          {chatData.slice(2).map( (d) => {
            console.log(d)
              let r = d.role.toString()
              let c = d.content.toString()
              console.log(chatData)
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
        
          <input className='form-control form-control-md input-form' type="text" onChange = {(e) => setUserTextInput(e.target.value)} value = {userTextInput} placeholder = 
          {
            status === "Pending" ? "Establishing a connection..." : !personaObj ? "No persona selected!" : "Ask " + personaObj.name + " something..."}
            />
        
        
        <button className='btn btn-success' onClick = { (e) => {
          !personaObj ? alert("Message cannot be sent without a selected persona!") : 
            status !== "Active" ? alert("Connection not yet established!")
            : sendPrompt()} }>Send message</button>
      </div> 
      {document.getElementById("chat-body") ? scrollDown(document.getElementById("chat-body")) : null}
    </div>
    
  );
}

export default Chatbot;