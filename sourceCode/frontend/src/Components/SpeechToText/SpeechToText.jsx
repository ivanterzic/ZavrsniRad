import React, { useState, useContext, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import DisabledContext from '../../Context/DisabledContext';
import ChatDataContext from '../../Context/ChatDataContext';
import { sendPrompt } from '../../Utils/GPTUtils';
import UserTextInputContext from '../../Context/UserInputContext';
import './SpeechToText.css'

function SpeechToText(props) {

  const [speechInput, setSpeechInput] = useState("");

  const {chatData, setChatData} = useContext(ChatDataContext)
  const {disabled, setDisabled} = useContext(DisabledContext)
  const {userTextInput, setUserTextInput} = useContext(UserTextInputContext)
  
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setSpeechInput(result);
    },
  });

  return (
    <div className='w-75'>
        <div className='speech-wrap d-flex flex-row align-items-center justify-content-center flex-xl-wrap'>
        <textarea id = "converted-speech" className='form-outline w-100'
            value={speechInput}
            onChange={(event) => {
              setSpeechInput(event.target.value)             
            }}
            readOnly
        />
        <button className = "btn btn-success" onMouseDown={e => listen({lang : "en-US"})} onMouseUp={stop} disabled = {disabled}>🎤</button>
        <button className = "btn btn-success" disabled = {disabled} onClick = {
          async (e) => {
            if (speechInput.trim() !== ""){
              await setUserTextInput(speechInput)
              setUserTextInput(speechInput)
              let r = await sendPrompt(chatData, setChatData, speechInput, setUserTextInput)
              console.log(r)
              props.setSpeakData(r)
              setSpeechInput("")
            }  
        }}>Send message</button>
        </div>
        {listening && <div className='loader-div'>Listening</div>}
    </div>
  );
}

export default SpeechToText;