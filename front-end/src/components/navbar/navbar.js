import React, {useState, useEffect} from 'react';
import './navbar.css';
import { Link, Navigate } from "react-router-dom";
import default_profile_pic from "../../assets/default_profile_icon.png";
import { useSelector } from 'react-redux';

export const Navbar = () => {
  let menu;
  const user = useSelector((state) => state.auth.value);
  
  if (user && user.role !== "pending") {
    if (user.role === "admin") {
      menu = (
        <div className='container-navbar_menu'>
            <Link to='planning'>Planning</Link>
            <Link to='team'>Team</Link>
            <Link to='projects'>Projects</Link>
            <Link to='stats'>Stats</Link>
        </div>
      );
    }
  }else {
    return <Navigate to={'/login'}/>;
  }

  return (
    <div className='container-navbar'>
        <div className='container-navbar_logo'>
            <Link to='planning'>Plantool</Link>
        </div>
        {menu}
        <Link to='profile'>
          <div className='container-navbar_profile'>
            <div className='container-navbar_profile-name'>{user.first_name + " " + user.last_name}</div>
            <div className='container-navbar_profile-picture'>
              <img src={default_profile_pic} alt="profile pic"/>
            </div>
          </div>
        </Link>
    </div>
  )
}
