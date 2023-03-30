import React from 'react';
import { useContext } from 'react';
import './SelectOption.css'
import RadioButton from '../RadioButton/RadioButton'
import PersonaSelector from '../PersonaSelector/PersonaSelector'
import RadioContext from '../../Context/RadioContext';
function SelectOption(props) {
    
    const { radio, setRadio } = useContext(RadioContext);

    return (
        <div className='container-fluid d-flex flex-row align-items-center justify-content-around '>
            {radio !== "Conversation" ? 
            <div className="container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap">
                <h4>Select a persona:</h4>
                <div className="p-3">
                        <PersonaSelector data = {props.data} categories = {props.categories}></PersonaSelector>
                </div>
            </div> : null }
            <div className='container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap'> 
                <h4>Select a chat option:</h4>
                <div className="p-3 d-flex flex-row flex-nowrap">
                    <RadioButton name = "Text" image = "favicon.ico"></RadioButton>
                    <RadioButton name = "Interactive" image = "favicon.ico"></RadioButton>
                    <RadioButton name = "Conversation" image = "favicon.ico"></RadioButton>
                </div>
            </div>
        </div>
    );
}

export default SelectOption;