import React from 'react';
import './header.css'
import backend from '../../backendAPI';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogIdContext from '../../Context/LogIdContext';
import ChatDataContext from '../../Context/ChatDataContext';
import PersonaContext from '../../Context/PersonaContext';

function Header(props) {

    const {chatData, setChatData} = useContext(ChatDataContext)
    const {log, setLog} = useContext(LogIdContext)
    const {persona, setPersona} = useContext(PersonaContext)

    let navigate = useNavigate()
    let handleLogout = async () => {
      try {
        let res2 = await backend.post('/log', {
          type : "logout",
          data : JSON.stringify("User has logged out using the logout button."),
          username : JSON.parse(sessionStorage.getItem("username"))
        })
      }
      catch (e) {
        console.log("Action couldn't be logged.")
      }
      sessionStorage.clear()
      setPersona()
      setChatData([])
      setLog(null)
      navigate("/login")
      props.setLoggedIn(false)
    }

    return (
      <div className="nav custom-header d-flex flex-row allign-items-center justify-content-between">
          {JSON.parse(sessionStorage.getItem("username")) !== null && JSON.parse(sessionStorage.getItem("privlevel")) === 3  ? 
            (<a href="/"><h1>Persona App</h1></a>)
            : 
            (<h1>Persona App</h1>)
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
                  <button className='btn btn-outline-dark m-2'><a href='modify'>Modify</a></button>
                  <button className='btn btn-outline-dark m-2'><a href='edit'>Edit</a></button>
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
            props.loggedIn || JSON.parse(sessionStorage.getItem("username")) !== null ?
                (<>
                  <div>
                    Welcome {JSON.parse(sessionStorage.getItem("username"))}!
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