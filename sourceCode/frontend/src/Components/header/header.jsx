import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';


function Header(props) {

    let navigate = useNavigate()
    let handleLogout = () => {
      sessionStorage.clear()
      navigate("/login")
      props.setLoggedIn(false)
    }

    return (
      <div className="nav custom-header d-flex flex-row allign-items-center justify-content-between">
       
          {sessionStorage.getItem("user") !== undefined &&  JSON.parse(sessionStorage.getItem("privlevel")) === 3  ? 
            (<a href="/"><h1>Placeholder text</h1></a>)
            : 
            (<h1>Placeholder text</h1>)
          }
        

        <div>
            {
              JSON.parse(sessionStorage.getItem("privlevel")) === 1 ? 
                (<>
                  <button className='btn btn-outline-dark'><a href='/createuser'>Create user</a></button>
                </>) 
              : 
              JSON.parse(sessionStorage.getItem("privlevel")) === 2 ? 
                (<>
                  <button className='btn btn-outline-dark m-2'><a href='create'>Create</a></button>
                  <button className='btn btn-outline-dark'><a href='modify'>Modify</a></button>
                </>) 
              : 
              JSON.parse(sessionStorage.getItem("privlevel")) === 3 ? 
              (<>
               
              </>
              ) : null
            }
        </div>
        
           
      
          <div className="d-flex flex-column align-items-center justify-content-center">
            {
            props.loggedIn || sessionStorage.getItem("username") !== null ?
                (<>
                  <div>
                    Welcome {sessionStorage.getItem("username")}!
                    You are logged in as {JSON.parse(sessionStorage.getItem("privlevel")) === 1 ? 
                          "an administrator"
                          : 
                          JSON.parse(sessionStorage.getItem("privlevel")) === 2 ? 
                          "a teacher" 
                          : 
                          JSON.parse(sessionStorage.getItem("privlevel")) === 3 ? 
                          "a student" : null}.
                    
                  </div>
                  <button className='btn m-1 btn-outline-dark'><a onClick={handleLogout}>Logout</a></button>
                </>) : null
            }
          </div>
       
        
      </div>
    );
}

export default Header;