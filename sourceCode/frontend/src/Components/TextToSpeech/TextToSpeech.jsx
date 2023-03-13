import React, { useEffect, useState, useContext } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import PersonaContext from '../../Context/PersonaContext';

 
function TextToSpeech(props) {
    
    const {persona} = useContext(PersonaContext)
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
    const [personaObj, setPersonaObj] = useState();

    useEffect(()=>{
        if (persona)
        setPersonaObj(JSON.parse(persona))
    }, [persona])

    useEffect( ()=> {
        
        let text = props.data
        
        /*let rate= persona.rate
        let pitch = persona.pitch*/
        console.log("Speak")
        speak({text : text})
        
    }  
    , [props.data])

    console.log(props.data)

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