import React, { useEffect, useState, useContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import PersonaContext from '../../Context/PersonaContext';
import backend from '../../backendAPI';
import './TextToSpeech.css'

function TextToSpeech(props) {
    
    const {persona} = useContext(PersonaContext)
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const [personaObj, setPersonaObj] = useState();
    const [emoji, setEmoji] = useState("2");
    
    let isSpeaking = false
    let speakIdx = 0

    let interval

    const emojiMap = {
        "1": ["a", "e", "1", "8"],
        "2": ["b", "p", "m", "2", "7"],
        "3": ["q", "u", "w", "2", "6", " "],
        "4": ["c", "g", "d", "k", "n", "r", "s", "t", "y", "x", "z", "6", "4", "9"],
        "5": ["t", "h", "i", "0", "3"],
        "6": ["l", "6"],
        "7": ["r", "7"],
        "8": ["o", "0"],
        "9": ["f", "b", "5", "4"]
      };
      
      const defaultEmoji = "2";
      
      function toEmoji(char){
        return (
          Object.keys(emojiMap).find(emoji =>
            emojiMap[emoji].includes(char.toLowerCase())
        ) || defaultEmoji)}

    function handleAnimation(){
        if (isSpeaking){
            setEmoji(toEmoji(props.data.charAt(speakIdx)))
            if (speakIdx < props.data.length - 1) {
                speakIdx++
            }
        }
    }

    async function getAudio(){
        const request = {
            "voice": personaObj.voice,
            "content": [props.data],
            /*"title": string, // Optional
            "speed": string, // Optional
            "preset": string // Optional*/
        };
        let response = await backend.post("/getvoice", request)
        isSpeaking = true
        let a = new Audio(response.data)  
        a.onended = function(e){
            clearInterval(interval);
            isSpeaking = false
            speakIdx = 0
            setEmoji(defaultEmoji)
        }
        
        await a.play()   
        interval = setInterval(() => {
            handleAnimation();
        }, 60);
    }

    useEffect(()=>{
        if (persona) 
        setPersonaObj(JSON.parse(persona))
    }, [persona])

    useEffect(  () => {
        if (props.data.trim() != ""){
            getAudio()
        }
    }, [props.data])
    
    return (
        <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
            {personaObj ? 
                <>
                    <div className = "persona-picture-wrap">
                        <img className='persona-img' src={personaObj.image} alt={personaObj.name} />
                        <img className='mouth-img' src = {require("./images/" + emoji + "-removebg-preview.png")} alt="mouth" />
                    </div>
                    
                    <div>{emoji}</div>
                </>
            :
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg" alt="Waiting"/>
            }
        </div>
    );
}

export default TextToSpeech;