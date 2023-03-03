import React from 'react';
import { useContext, useEffect, useState } from 'react';
import './PersonaSelector.css'
import PersonaContext from '../../Context/PersonaContext';

function PersonaSelector(props) {
    const {persona, setPersona} = useContext(PersonaContext)
    const [value, setValue] = useState();
    return (
        <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
            <select name = "persona" className="selectpicker p-2" onChange={(e)=>{
                console.log("Persona Selected!!");
                setValue(e.target.value)
            }}/*size={3}*/>
                <optgroup label="?">
                    {
                    !persona ? "Loading persona..." :
                    props.persona.map( (p) => {
                        return (<option value = {p.name}>{p.name}</option>)
                    })}
                </optgroup>
                <optgroup label="?">
                </optgroup>
            </select>
            <button type="button" class="btn btn-success" onClick={(e) => {
                console.log(console.log(value))
                let resp = window.confirm("Are you sure you want to select this persona? " + value)
                if (resp){
                    setPersona(value)
                    console.log(persona)
                }
                else {
                    console.log("Action was cancelled")
                }
            }}>Submit</button>
        </div>
        
    );
}

export default PersonaSelector;