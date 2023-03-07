import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
 
function Interactive() {
    
    const [value, setValue] = useState('');
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis( );
    
    console.log(voices)

    return (
        <div>
        <textarea
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={() => speak({ text: value })}>Speak</button>
        </div>
    );
}

export default Interactive;