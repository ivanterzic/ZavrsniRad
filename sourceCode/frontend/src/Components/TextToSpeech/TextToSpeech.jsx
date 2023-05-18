import React, { useEffect, useState, useContext } from 'react';
import PersonaContext from '../../Context/PersonaContext';
import backend from '../../backendAPI';
import './TextToSpeech.css';
import { mouthMap, handleAnimation, convertString, toMouth } from '../../Utils/Text2SpeechUtils';


function TextToSpeech(props) {
    
    const {persona} = useContext(PersonaContext)
    const [value, setValue] = useState('');
    //const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const [personaObj, setPersonaObj] = useState();
    const [mouth, setMouth] = useState("2");
    
    let animationString = ""

    let isSpeaking = false
    let speakIdx = 0

    let interval

    let defaultMouth = "2";
    
    function handleAnimation(){
        if (isSpeaking){
            let res = toMouth(animationString.charAt(speakIdx))
            setMouth(res ? res : defaultMouth)
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

        let response 
        try{
            response = await backend.post("/getvoice", request)
        }
        catch(e){
           
        alert("An error has occured while fetching voices!")

            console.log(e)
            return
        }
        
        isSpeaking = true
        let a = new Audio(response.data)  
        a.onended = function(e){
            clearInterval(interval);
            isSpeaking = false
            speakIdx = 0
            setMouth(defaultMouth)
        }
        
        await a.play()   
        interval = setInterval(() => {
            handleAnimation();
        }, 60);
    }

    useEffect(()=>{
        if (persona) {
            setPersonaObj(JSON.parse(persona))
            console.log(JSON.parse(persona).gender) 
            JSON.parse(persona).gender == "female" ? defaultMouth = "10" : defaultMouth = "2"
            setMouth(defaultMouth)
        }
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
                        <img className='persona-img' src={personaObj.imageurl} alt={personaObj.name} />
                        <img className={personaObj.gender == "male" ? "mouth-img" : "fem-mouth-img"} src = {require("./images/" + mouth + "-removebg-preview.png")} />
                    </div>
                </>
            :
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg" alt="Waiting"/>
            }
        </div>
    );
}

export default TextToSpeech;