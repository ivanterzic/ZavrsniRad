import React from 'react';
import { useContext, useEffect, useState } from 'react';
import './SelectOption.css'
import RadioButton from '../RadioButton/RadioButton'
import PersonaSelector from '../PersonaSelector/PersonaSelector'
import RadioContext from '../../Context/RadioContext';

function SelectOption(props) {

    return (
        <div>
            <div className="d-flex flex-rowalign-items-center justify-content-center ">
                <h4>Select a persona:</h4>
            </div>
            <div>
                <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
                    <div className="p-3">
                        <PersonaSelector persona = {props.persona}></PersonaSelector>
                    </div>
                    <div className="p-3">
                        <RadioButton name = "Text" image = "favicon.ico"></RadioButton>
                        <RadioButton name = "Visual" image = "favicon.ico"></RadioButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectOption;