import React from 'react';
import { useContext } from 'react';
import './SelectOption.css'
import RadioButton from '../RadioButton/RadioButton'
import PersonaSelector from '../PersonaSelector/PersonaSelector'
import RadioContext from '../../Context/RadioContext';
import ChatDataContext from '../../Context/ChatDataContext';
import PersonaContext from '../../Context/PersonaContext';
import { sendInitial } from '../../Utils/GPTUtils';
import text from './text.png'
import interactive from './interactive.png'
import conversation from './conversation.png'

function SelectOption(props) {
    
    const { radio, setRadio } = useContext(RadioContext);
    const {chatData, setChatData} = useContext(ChatDataContext)
    const {persona, setPersona} = useContext(PersonaContext)


    return (
        <div className='container-fluid d-flex flex-column align-items-center justify-content-center flex-wrap'>

            <div className='container-fluid d-flex flex-column align-items-center justify-content-center flex-wrap'> 
                <h4 className='mt-2'>Select a chat option:</h4>
                <div className="p-3 d-flex flex-row flex-nowrap">
                    <RadioButton name = "Text" image = {text}></RadioButton>
                    <RadioButton name = "Interactive" image = {interactive}></RadioButton>
                    <RadioButton name = "Conversation" image = {conversation}></RadioButton>
                </div>
            </div>
            <div className='container-fluid d-flex flex-row align-items-center justify-content-around '>
            

                {radio !== "Conversation" ? 
                <>
                    <div className="container-fluid d-flex flex-row align-items-center justify-content-center flex-wrap">
                    <h4>Select a persona:</h4>
                    <div className="p-3">
                        <PersonaSelector data = {props.data} categories = {props.categories}></PersonaSelector>
                    </div>
                    </div>
                    <button className='btn btn-success' disabled= {!persona ? true : false} onClick={e => {
                        let resp = window.gconfirm("Are you sure you want to reset the chat? Current chat data will be deleted! ")
                        if (resp){
                            chatData.length = 0
                            setChatData([])
                            sendInitial(chatData, setChatData, JSON.parse(persona).initialPrompt + " The questions will be provided by the user in the following messages.", () => {}, () => {})
                        }
                        
                    }}>Reset</button>
                </> : null         
                }
            </div>

        </div>
        
    );
}

export default SelectOption;