import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
 
function TextToSpeech(props) {
    
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis( );
    
    useEffect( ()=> {
        if (props.data && props.data != "")
        speak({ text: props.data })
    }  
    , [props.data])

    return (
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d8/Person_icon_BLACK-01.svg" alt="OP" />
        </div>
    );
}

export default TextToSpeech;