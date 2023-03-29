import React from 'react';
import { useEffect, useState, useContext } from 'react';
import RadioContext from '../../Context/RadioContext';
import './ProfileAvatar.css'

function ProfileAvatar(props) {

    
    return (
       <img src={props.image} alt={props.image} className = "avatar"/>
    );
}

export default ProfileAvatar;