import React from 'react';
import { useContext, useState } from 'react';
import './PersonaSelector.css'
import PersonaContext from '../../Context/PersonaContext';
import ChatDataContext from '../../Context/ChatDataContext';

function PersonaSelector(props) {
    const {persona, setPersona} = useContext(PersonaContext)
    const {chatData, setChatData} = useContext(ChatDataContext)
    const [value, setValue] = useState();
    const data = props.data

    return (
        <div className='d-flex flex-row flex-wrap align-items-center justify-content-around'>
            <select id = "persona-select" name = "persona" className="selectpicker p-2" onChange={(e)=>{
                setValue(e.target.value)
                console.log("Persona value changed!")
            }}/*size={3}*/>
                <optgroup label="?">
                    { 
                        props.data.map( ( p) => {
                            return (<option key = {p.name} value = {JSON.stringify(p)}>{p.name}</option>)
                        })
                    }
                </optgroup>
            </select>
            <button type="button" className="btn btn-success" onClick={(e) => {
                let val = document.getElementById("persona-select").value
                console.log(JSON.parse(val))
                
                if (!persona || JSON.parse(val).name !== JSON.parse(persona).name) {
                    let resp = window.confirm("Are you sure you want to select this persona: " + JSON.parse(val).name + "? Current chat data will be deleted! ")
                    if (resp){
                        setPersona(val)
                        console.log("Persona selected : " + val)
                        setChatData([])
                    }
                    else {
                        console.log("Action was cancelled. No persona change has occured.")
                    }
                }
            }}>Submit</button>
        </div>
        
    );
}

export default PersonaSelector;