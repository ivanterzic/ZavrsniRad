import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
 
function SpeechToText(props) {
  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
 
  return (
    <>
        <div className='container-fluid d-flex flex-row align-items-center justify-content-center'>
        <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
        <button className = "btn btn-success" onMouseDown={listen} onMouseUp={stop}>🎤</button>
        <button className = "btn btn-success" >Send message</button>
        </div>
        {listening && <div className='loader-div'>Listening</div>}
    </>
  );
}

export default SpeechToText;