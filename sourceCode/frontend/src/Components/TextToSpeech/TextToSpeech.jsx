import React, { useEffect, useState, useContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import PersonaContext from '../../Context/PersonaContext';
import backend from '../../backendAPI';

function TextToSpeech(props) {
    
    const {persona} = useContext(PersonaContext)
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const [personaObj, setPersonaObj] = useState();

    async function getAudio(){
        let text = props.data
        if (text.trim() != ""){
            const request = {
                "voice": personaObj.voice,
                "content": [text],
                /*"title": string, // Optional
                "speed": string, // Optional
                "preset": string // Optional*/
            };
            let response = await backend.post("/getvoice", request)
            var a = new Audio(response.data)
            a.play()
        }    
    }

    useEffect(()=>{
        if (persona) 
        setPersonaObj(JSON.parse(persona))
    }, [persona])

    useEffect( () => {
        getAudio()
        
    }, [props.data])
    
    return (
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
            {personaObj ? 
                <img src={personaObj.image} alt={personaObj.name} />
            :
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg" alt="Waiting"/>
            }
        </div>
    );
}

export default TextToSpeech;