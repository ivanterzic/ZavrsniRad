import React from 'react';

function Login() {
  return (
    <div className='container-fluid d-flex flex-row align-items-center justify-content-center p-4'>
        <form className=''>
        <h3>Login</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Login
          </button>
        </div>
      </form>
    </div>
    
  );
}

export default Login;
