import React from 'react';
import './ProfileAvatar.css'

function ProfileAvatar(props) {   
    return (
       <img src={props.image} alt={props.image} className = "avatar"/>
    );
}
export default ProfileAvatar;