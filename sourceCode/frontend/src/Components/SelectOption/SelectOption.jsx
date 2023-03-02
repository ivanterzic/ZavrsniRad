import React from 'react';
import { useContext, useEffect, useState } from 'react';
import './SelectOption.css'
import RadioButton from '../RadioButton/RadioButton'
import RadioContext from '../../Context/RadioContext';

function SelectOption() {

    return (
        <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
            <div class="element">
                <h4>Select a persona:</h4>
            </div>
            <div class="element">
                <RadioButton name = "Text" image = "favicon.ico"></RadioButton>
                <RadioButton name = "Visual" image = "favicon.ico"></RadioButton>
            </div>
        </div>
    );
}

export default SelectOption;