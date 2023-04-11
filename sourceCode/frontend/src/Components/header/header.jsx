import React from 'react';
import './header.css'

function Header() {
    return (
      <nav className="nav custom-header d-flex flex-row allign-items-center justify-content-between">
        <a href="/"><h3>
          Placeholder
          text
        </h3></a>
        
        <div className="d-flex flex-row allign-items-center justify-content-around w-25">
          <div><a href='login'>Login</a></div>
          <div><a href='modify'>Modify</a></div>
          <div><a href='create'>Create</a></div>
        </div>
        
      </nav>
    );
}

export default Header;