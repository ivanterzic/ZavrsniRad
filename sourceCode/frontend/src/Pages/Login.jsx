import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import backend from '../backendAPI';

function Login() {

  const navigate = useNavigate(); 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState("");

  let handleSubmit = async () => {
    let response
    try {
      response = await backend.post("/login", {
      "username" : username,
      "password" : password
      })
    }
    catch (e) {
      setMessage("An error has occured.")
      return
    }
    if (response.status == 200) {
      sessionStorage.setItem("username", username)
      sessionStorage.setItem("level", response.data.level)
      if(sessionStorage.getItem("level") === "3")
        navigate("/")
      else if(sessionStorage.getItem("level") === "2")
        navigate("/create")
      else if(sessionStorage.getItem("level") === "1")
        navigate("/createuser")
      else navigate("/")
    }
    else if (response.status == 201) {
      setMessage(response.data)
    }
    else {
      setMessage("An error has occured.")
    }

  }

  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center p-4'>
        
        <h3>Login</h3>
        <h6>{message}</h6>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => {setUsername(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {setPassword(e.target.value)}}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-success" onClick={handleSubmit}>
            Login
          </button>
        </div>
      
    </div>
  );
}

export default Login;
