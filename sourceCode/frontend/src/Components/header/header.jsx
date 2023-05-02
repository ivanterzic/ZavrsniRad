import React, { useContext } from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

function Header() {

    const {user, setUser} = useContext(UserContext)

    let navigate = useNavigate()
    let handleLogout = () => {
      setUser(undefined)
      navigate("/login")
    }

    return (
      <nav className="nav custom-header d-flex flex-row allign-items-center justify-content-between">
        {user && user["privlevel"] === 3 ? <a href="/"><h3>
          Placeholder text
        </h3></a> : <h3>
          Placeholder text
        </h3>}
        
        
        <div className="d-flex flex-row allign-items-center justify-content-around w-25">
          {
            user === undefined ? 
              (<div><a href='login'>Login</a></div>) 
            : 
            user["privlevel"] === 1 ? 
              (<>
                <div><a href='createuser'>Create user</a></div>
                <div><a onClick={handleLogout}>Logout</a></div>
              </>) 
            : 
            user["privlevel"] === 2 ? 
              (<>
                <div><a href='create'>Create</a></div>
                <div><a href='modify'>Modify</a></div>
                <div><a onClick={handleLogout}>Logout</a></div>
              </>) 
            : 
            user["privlevel"] === 3 ? 
            (<>
              <div><a onClick={handleLogout}>Logout</a></div>
            </>
            ) : null
          }
          
          
        </div>
      </nav>
    );
}

export default Header;