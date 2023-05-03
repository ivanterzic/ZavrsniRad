import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../backendAPI";
import Select from 'react-select'
import { sanetizeString } from "../Utils/Utils";

const CreateUser = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPpassword, setRepeatPassword] = useState("")
    const [roles, setRoles] = useState();
    const [role, setRole] = useState();
    const [message, setMessage] = useState("");

    let handleSubmit = async () => {
      if (username.trim().length === 0) {
        setMessage("Username can't be empty")
        return
      }
      if (username.trim().length > 25) {
        setMessage("Username must not be longer than 25 characters!")
        return
      }
      if (password.trim().length === 0) {
        setMessage("Password can't be empty")
        return
      }
      if (password.trim().length < 8 || password.trim().length > 25) {
        setMessage("Password must be between 8 and 25 characters long!")
        return
      }
      if (password !== repeatPpassword) {
        setMessage("Password and repeated password do not match!")
        return
      }
      if (role === undefined){
        setMessage("Role must be selected!")
        return
      }
      let response
      try {
        response = await backend.post("/createuser", {
        "username" : sanetizeString(username),
        "password" : sanetizeString(password),
        "roleid" : role.value
        })
      }
      catch (e) {
        setMessage("An error has occured.")
        return
      }
      setMessage("New user successfuly added!")
      handleReset()
    }
    let handleReset = () => {
      setUsername("")
      setPassword("")
      setRepeatPassword("")
      setRole()
    }
    
    async function fetchRoles(){
      let response
      try {
        response = await backend.get("/roles") 
        setRoles(response.data.map(r => ({value : r.roleid, name : r.rolename})))
        setMessage("")
      }
      catch (e) {
        setMessage("Unable to reach roles from server.")
        return
      }
    }

    const handleRoleChange = (val) => {
      setRole(val);
    };

    useEffect(()=>{
      if (sessionStorage.getItem("user") === undefined) {
        navigate('/login')
      }
      else if (JSON.parse(sessionStorage.getItem("privlevel")) !== 1){
        navigate('/noaccess')
      }
      fetchRoles()
    }, [])

    return (
      <div className='container-fluid d-flex flex-column align-items-center justify-content-center p-4'> 
      <h3>Create a new user</h3>
      <h6>{message}</h6>
      <div className="mb-3 w-25">
        <label>Username</label>
        <input
          type="text"
          value = {username}
          className="form-control"
          placeholder="Enter username"
          onChange={(e) => {setUsername(e.target.value)}}
        />
      </div>
      <div className="mb-3 w-25">
        <label>Password</label>
          <input
            type="password"
            value = {password}
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
      <div className="mb-3 w-25">
        <label>Repeat Password</label>
        <input
          type="password"
          id = "repeatpassword"
          value = {repeatPpassword}
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => {setRepeatPassword(e.target.value)}}
        />
        <input type="checkbox" onClick={e => {
            var x = document.getElementById("repeatpassword");
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
          }}></input> Show repeated password
      </div>
      <div className='mb-3 w-25'>
          <label htmlFor='category'>Category:</label>
          <div className="w-100">
            <Select id = "imageid" name="imageid" onChange={handleRoleChange} isSearchable = {false} value={role}  
           options={roles} formatOptionLabel={
            r => (<div>{r.name}</div> )
           }/> 
          </div>
          
        </div>
      <div className="container-fluid d-flex flex-row align-items-center justify-content-center">
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-light" onClick={handleReset}>
          Reset
        </button>
      </div>
    
  </div>
        
    );
};  
export default CreateUser;