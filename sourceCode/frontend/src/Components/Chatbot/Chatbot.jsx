import React, { useEffect, useContext } from 'react'; 
import { useState } from 'react';
import './chatbot.css';
import PersonaContext from '../../Context/PersonaContext';
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");


function Chatbot() {
  const {persona, setPersona} = useContext(PersonaContext)
  const [userTextInput, setUserTextInput] = useState("")
  const openAIKey = "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"
  let idx = 0;
  const configuration = new Configuration({
    apiKey: openAIKey,
  });
  const openai = new OpenAIApi(configuration);
  
  const [data, setData] = useState([{
    "role": "user",
    "content": /*"The following is a conversation with a highly knowledgeable and intelligent AI persona named Charles Darwin. In the following interactions, the AI persona pretends to be Charles Darwin. Everyone will converse in natural language, and Charles will do his best to answer questions from the others. Charles likes discussing nature. Charles never repeats what anyone said earlier. Charles was built to be respectful, polite and inclusive. Charles Darwin is eager to have a discussion with User, a human who says or types in response to what the others say. The conversation follows. Charles Darwin: Hi, I’m Charles Darwin. What would you like to know about me? User: What are some books you have written? Charles Darwin: I'm probably most famous for the Origin of Species but I also wrote the Descent of Man. My last book was the The Formation of Vegetable Mould through the Action of Worms. Charles Darwin: It’s a pleasure to meet you, User. I’m excited to share my knowledge of the natural world with you. "*/
    "Provide scientifically accurate answers to questions from the perspective of Albert Einstein. Use scientific language and expressions. The questions will be provided by the user in the following messages."
  }])

  useEffect(() => {
    console.log("Initial message sent")
    async function sendInitial() {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: data,
      });
      console.log(response.data.choices[0].message);
      setData([...data, {
        "role" : "assistant", 
        "content" : response.data.choices[0].message.content
      }])
    }
    sendInitial();
  }, []);
 
  async function sendPrompt(){

    data.push({"role" : "user", "content" : userTextInput})
    setUserTextInput("")
    console.log(data)

    const response = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: data});
    console.log(response.data.choices[0].message);

    await setData([...data, {"role" : "assistant", "content" : response.data.choices[0].message.content}])
    
    console.log(data)
    
  }

  return (
    //ili staviti kao gore ime i sliku kao pravi chat ili iznad poruke kao u WhatsApp grupama
    <>
        <div className='chat-wrapper overflow-auto'>
          {data.slice(2).map( (d) => {
              let r = d.role.toString()
              let c = d.content.toString()
              console.log(data)
              return r === "assistant" ? 
                (<div className='d-flex flex-row'>
                  <div className='bg-dark text-light mt-1 chat-message ai-chat-message'>{c}</div>
                </div>)
                :
                (<div className="d-flex flex-row-reverse ">
                  <div className='bg-secondary text-light mt-1 chat-message user-chat-message'>{c}</div>
                </div>);
            }
            
          )}
        
        </div>
        <div className='d-flex flex-row align-items-center justify-content-center'>
          <input type="text" size = "100" onChange = {(e) => setUserTextInput(e.target.value)} value = {userTextInput} placeholder = {"Ask " + persona + " something..."}/>
          <button className='btn-success' onClick = { (e) => {sendPrompt()} }>Send</button>
        </div>
        
    </>
  );
}

export default Chatbot;