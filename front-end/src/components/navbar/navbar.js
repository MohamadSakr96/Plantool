import React from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
import default_profile_pic from "../../assets/default_profile_icon.png";

export const Navbar = () => {
  return (
    <div className='container-navbar'>
        <div className='container-navbar_logo'>
            <Link to='planning'>Plantool</Link>
        </div>
        <div className='container-navbar_menu'>
            <Link to='planning'>Planning</Link>
            <Link to='team'>Team</Link>
            <Link to='projects'>Projects</Link>
            <Link to='stats'>Stats</Link>
        </div>
        <Link to='profile'>
          <div className='container-navbar_profile'>
            <div className='container-navbar_profile-name'>Mohamad Sakr</div>
            <div className='container-navbar_profile-picture'>
              <img src={default_profile_pic} alt="profile pic"/>
            </div>
          </div>
        </Link>
    </div>
  )
}
