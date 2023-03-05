import React from 'react';
import { useEffect, useState, useContext } from 'react';
import RadioContext from '../../Context/RadioContext';
import './RadioButton.css'

function RadioButton(props) {

    const {radio, setRadio} = useContext(RadioContext)
   /* console.log(radio)
    console.log(props.name)*/
    return (
        <>
            {radio === props.name ?
            <>
                <input type="radio" className="btn-check" name="options" id={props.name} onClick={(e)=>{
                    setRadio(props.name)
                    //console.log("changed")
                }} selected></input>
                <label className="btn btn-outline-dark active" for={props.name}>
                    {props.name}
                    <img src={props.image} alt={props.name}></img>
                </label>
            </> 
                :
            <>
                <input type="radio" className="btn-check" name="options" id={props.name} onClick={(e)=>{
                setRadio(props.name)
                //console.log("changed")
                }}></input>
                <label className="btn btn-outline-dark" for={props.name}>
                    {props.name}
                    <img src={props.image} alt={props.name}></img>
                </label>
            </>
            }
        </>
    );
}

export default RadioButton;