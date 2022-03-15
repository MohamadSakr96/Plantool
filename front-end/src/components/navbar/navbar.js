import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className='container-navbar'>
        <div className='container-logo'>
            <Link to='planning'>Plantool</Link>
        </div>
        <div className='container-menu'>
            <Link to='planning'>Planning</Link>
            <Link to='team'>Team</Link>
            <Link to='projects'>Projects</Link>
            <Link to='stats'>Stats</Link>
        </div>
        <div className='container-profile'>
            <Link to='profile'>Mohamad Sakr</Link>
        </div>
    </div>
  )
}
