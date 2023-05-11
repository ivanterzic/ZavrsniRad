import React from 'react';
import { useEffect, useState, useContext } from 'react';
import RadioContext from '../../Context/RadioContext';
import './RadioButton.css'


function RadioButton(props) {

    const {radio, setRadio} = useContext(RadioContext)
    
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
        <input type="radio" className="btn btn-check" name="options" id={props.name} onClick={(e)=>{
            setRadio(props.name)
        }}></input>
        <label className={"btn btn-light mx-3 radio-button"} htmlFor={props.name}>
            <div className='container-fluid d-flex flex-column align-items-center justify-content-center flex-wrap'>
                <h6>{props.name}</h6>
                <div><img className='radio-img' src={props.image} alt={props.name}></img></div>
            </div>          
        </label>
          
        </div>
    );
}

export default RadioButton;