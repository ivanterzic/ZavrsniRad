import React from 'react';

function App() {
  
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
            <option selected value={false}>Elementary school</option>
            <option value={true}>Middle school</option>
            <option value={true}>College</option>
          </select>
        </div>
        
        <button className='btn btn-success'>Create a new Persona profile</button>
      </div>
  );
}

export default App;
