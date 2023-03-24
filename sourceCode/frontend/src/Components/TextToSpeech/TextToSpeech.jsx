import React, { useEffect, useState, useContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import PersonaContext from '../../Context/PersonaContext';
import backend from '../../backendAPI';
import './TextToSpeech.css';
var num2words = require("num2words")

function TextToSpeech(props) {
    
    const {persona} = useContext(PersonaContext)
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const [personaObj, setPersonaObj] = useState();
    const [emoji, setEmoji] = useState("2");
    
    let animationString = ""

    let isSpeaking = false
    let speakIdx = 0

    let interval

    const emojiMap = {
        "1": ["a", "e"],
        "2": ["b", "p", "m"],
        "3": ["q", "u", "w", " "],
        "4": ["c", "g", "d", "k", "n", "r", "s", "t", "y", "x", "z"],
        "5": ["t", "h", "i"],
        "6": ["l"],
        "7": ["r"],
        "8": ["o"],
        "9": ["f", "b"]
      };
      
      const defaultEmoji = "2";
      
      function convertString(string){
        let output = ""
        for (let word of string.split(" ")){
            word = word.replace(".", "")
            word = word.replace(",", "")
            console.log(word)
            if (/^\d+$/.test(word)){
                output += num2words(word)
            }
            else {
                output += word + " "
            }
        }
        return output
      }

      function toEmoji(char){
        return (
          Object.keys(emojiMap).find(emoji =>
            emojiMap[emoji].includes(char.toLowerCase())
        ) || defaultEmoji)}

    function handleAnimation(){
        if (isSpeaking){
            setEmoji(toEmoji(animationString.charAt(speakIdx)))
            if (speakIdx < animationString.length - 1) {
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
            animationString = convertString(props.data)
            console.log(animationString)
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