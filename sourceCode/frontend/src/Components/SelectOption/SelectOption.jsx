import React from 'react';
import './SelectOption.css'
import RadioButton from '../RadioButton/RadioButton'
import PersonaSelector from '../PersonaSelector/PersonaSelector'
//{justify-content-around}
function SelectOption(props) {
    
    return (
        <div className='container-fluid d-flex flex-row align-items-center justify-content-around '>
            <div className="container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap">
                <h4>Select a persona:</h4>
                <div className="p-3">
                        <PersonaSelector data = {props.data}></PersonaSelector>
                </div>
            </div>
            <div className='container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap'> 
                <h4>Select a chat option:</h4>
                <div className="p-3 d-flex flex-row flex-nowrap">
                    <RadioButton name = "Text" image = "favicon.ico"></RadioButton>
                    <RadioButton name = "Interactive" image = "favicon.ico"></RadioButton>
                </div>
            </div>
        </div>
    );
}

export default SelectOption;