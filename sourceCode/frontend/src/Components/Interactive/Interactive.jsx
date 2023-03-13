import React, { useState, useContext, useEffect} from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import PersonaContext from '../../Context/PersonaContext';
import './Interactive.css';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import SpeechToText from '../SpeechToText/SpeechToText';
const { Configuration, OpenAIApi } = require("openai");
function Interactive() {
    const model = "gpt-3.5-turbo"
    const openAIKey = "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"
    const configuration = new Configuration({ apiKey: openAIKey, });
    const openai = new OpenAIApi(configuration);
    
    const {persona} = useContext(PersonaContext)
    const [userTextInput, setUserTextInput] = useState("")
    const [chatData, setChatData] = useState([])
    const [personaObj, setPersonaObj] = useState();
    const [status, setStatus] = useState("No")

    const [speakData, setSpeakData] = useState()
   
    const [blocked, setBlocked] = useState(false);

    let loadInterval

    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis( );
    
    
    async function sendCompletionRequest() {
        const response = await openai.createChatCompletion({
          model: model,
          messages: chatData,
          temperature : 0.8, 
          presence_penalty : 1.3,
        })
        return response
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
        setChatData([])
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
          
          let response = await sendCompletionRequest()
  
          //ako je kod 429 preopterecenje dodaj
  
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
  
    function loader(e) {
        e.textContent = 'Typing'
        loadInterval = setInterval(() => {
          e.textContent += '.';
            if (e.textContent === 'Typing....') {
              e.textContent = 'Typing';
            }
        }, 300);
      }

    async function sendPrompt(){
  
      await chatData.push({"role" : "user", "content" : userTextInput})
      await setChatData(chatData)
      setUserTextInput("")
      console.log(chatData)
      
      /*const div = document.createElement("div")
      document.getElementById("chat-header").appendChild(div)
      loader(div)*/
      
      let response = await sendCompletionRequest()
      /*const response = await openai.createChatCompletion({model: "gpt-3.5-turbo", messages: chatData});*/
  
  
      console.log(response.data.choices[0].message);
      await setChatData([...chatData, {"role" : "assistant", "content" : response.data.choices[0].message.content}])
      //div.remove()
  
      setSpeakData(response.data.choices[0].message.content)
      console.log(chatData)
      
    }

    return ( 
        <>
            <div id='chat-header'></div>
            <div className='container-fluid d-flex flex-row align-items-center justify-content-between'>
                <div className='wrap'><TextToSpeech className data = {speakData}></TextToSpeech></div>
                <div className='container-fluid d-flex flex-column align-items-center justify-content-center flex-wrap input-wrap'>
                    <div className='container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap input-wrap'>
                        <input className='form-control form-control-md input-form' type="text" onChange = {(e) => setUserTextInput(e.target.value)} value = {userTextInput} placeholder = {status === "Pending" ? "Establishing a connection..." : !personaObj ? ("No persona selected!") : "Ask " + personaObj.name + " something..."} disabled = {!personaObj || status === "Pending" ? true : false}/>
                        <button className='btn btn-success' onClick = { (e) => {
                        !personaObj ? alert("Message cannot be sent without a selected persona!") : 
                            status !== "Active" ? alert("Connection not yet established!")
                            : sendPrompt()} } disabled = {!personaObj || status === "Pending" ? true : false}>Send message</button>
                    </div>
                    <SpeechToText></SpeechToText>
                </div> 
            </div>
        </>
        
        
        
    );
}

export default Interactive;
