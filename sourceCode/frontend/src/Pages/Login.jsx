import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import backend from '../backendAPI';


function Login(props) {

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
    if (response.status === 200) {
      sessionStorage.setItem("username", username)
      sessionStorage.setItem("privlevel", response.data.level)
      await props.setLoggedIn(true)
      if(response.data.level === 3)
        navigate("/")
      else if(response.data.level === 2)
        navigate("/create")
      else if(response.data.level === 1)
        navigate("/createuser")
      else navigate("/")
    }
    else if (response.status === 201) {
      setMessage(response.data)
    }
    else {
      setMessage("An error has occured.")
    }


  }

  useEffect((()=>{
    if(sessionStorage.getItem("user") !== undefined){
      if(sessionStorage.getItem("privlevel") === 3)
        navigate("/")
      else if(sessionStorage.getItem("privlevel") === 2)
        navigate("/create")
      else if(sessionStorage.getItem("privlevel") === 1)
        navigate("/createuser")
    }
  }),[])

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
            id = "password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <input type="checkbox" onClick={e => {
            var x = document.getElementById("password");
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
          }}></input> Show password
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
