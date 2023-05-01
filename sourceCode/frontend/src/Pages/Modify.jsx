import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("username") === undefined) {
      navigate('/login')
    }
    if (sessionStorage.getItem("level") !== "2"){
      navigate('/noaccess')
    }

  
 
  
  }, []);

  return (


      <div className="container-fluid d-flex flex-column align-items-center justify-content-center w-50 p-4">
        <h2>Persona profile creation</h2>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='persona'>Name:</label>
          <input className='form-control w-50' type="text" />
        </div>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='persona'>Persona:</label>
          <select name = "persona" className="form-select w-50">
            <option selected value={false}>Albert Einstein</option>
            <option value={true}>Charles Darwin</option>
          </select>
        </div>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='mention'>Mention if AI:</label>
          <select name = "mention" className="form-select w-50">
            <option selected value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div className='container-fluid d-flex flex-row align-items-center justify-content-around p-1'>
          <label htmlFor='mention'>School Level</label>
          <select name = "mention" className="form-select w-50">
            <option selected value={false} 
            style={{backgroundImage:`url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tripadvisor.com%2FHotel_Review-g4283430-d19882363-Reviews-Omahe_Qoema_3_Syariah_Guest_House-Sewon_Yogyakarta_Region_Java.html&psig=AOvVaw3KzE5YXW54L6xYKGHmwruZ&ust=1681242702127000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLiEqaKLoP4CFQAAAAAdAAAAABAE)`}}>Elementary</option>
            <option value={true}>Middle school</option>
            <option value={true}>College</option>
          </select>
        </div>
        
        <button className='btn btn-success'>Create a new Persona profile</button>
      </div>
  );
}

export default App;
