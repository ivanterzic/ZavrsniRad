import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
    let navigate = useNavigate()
    let handleLogout = () => {
      sessionStorage.clear()
     
      navigate("/login")
    }

    return (
      <nav className="nav custom-header d-flex flex-row allign-items-center justify-content-between">
        {sessionStorage.getItem("level") === "3" ? <a href="/"><h3>
          Placeholder text
        </h3></a> : <h3>
          Placeholder text
        </h3>}
        
        
        <div className="d-flex flex-row allign-items-center justify-content-around w-25">
          {sessionStorage.getItem("level")=== undefined ? (<div><a href='login'>Login</a></div>) : null}
          {sessionStorage.getItem("level") === "1" ? (
          <>
            <div><a href='createuser'>Create user</a></div>
            <div><a onClick={handleLogout}>Logout</a></div>
          </>) : null}
          {sessionStorage.getItem("level") === "2" ? (
          <>
            <div><a href='create'>Create</a></div>
            <div><a href='modify'>Modify</a></div>
            <div><a onClick={handleLogout}>Logout</a></div>
          </>) : null}
          {sessionStorage.getItem("level") === "3" ? (
          <>
            <div><a onClick={handleLogout}>Logout</a></div>
          </>
            ) : null}
          
          
        </div>
      </nav>
    );
}

export default Header;