import React from 'react';
import './App.css';
//import (link) from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
        <button className="Navbar_btn" href="<Users/>">Link1</button>
        <button className="Navbar_btn">Link2</button>
        <button className="Navbar_btn">Link3</button>
    </div>
  );
}

export default Navbar;