import React, { useEffect, useState, useContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import PersonaContext from '../../Context/PersonaContext';
import backend from '../../backendAPI';

function TextToSpeech(props) {
    
    const {persona} = useContext(PersonaContext)
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const [personaObj, setPersonaObj] = useState();
    const [emoji, setEmoji] = useState("😐");
    
    let isSpeaking = false
    let speakIdx = 0

    let interval

    const emojiMap = {
        "😮": ["o", "e", "1"],
        "😐": ["b", "p", "m", "2", "7"],
        "🙂": ["c", "g", "j", "k", "n", "r", "s", "t", "v", "x", "z", "3", "4", "9"],
        "😲": ["d", "l", "0"],
        "😯": ["q", "u", "w", "y", "6", "8"],
        "😀": ["a", "i", "5"]
      };
      
      const defaultEmoji = "😐";
      
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
                    <img src={personaObj.image} alt={personaObj.name} />
                    <div>{emoji}</div>
                </>
            :
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg" alt="Waiting"/>
            }
        </div>
    );
}

export default TextToSpeech;