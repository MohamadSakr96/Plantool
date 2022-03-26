import React, {useState, useEffect} from 'react';
import './navbar.css';
import { Link, Navigate } from "react-router-dom";
import default_profile_pic from "../../assets/default_profile_icon.png";
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const Navbar = () => {
  let menu, notification;
  const user = useSelector((state) => state.auth.value);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  if (user && user.role !== "pending") {
    if (user.role === "admin") {
      menu = (
        <div className='container-navbar_menu'>
            <Link to='/'>Planning</Link>
            <Link to='team'>Team</Link>
            <Link to='projects'>Projects</Link>
            <Link to='stats'>Stats</Link>
        </div>
      );
      notification = (
        <div className='container-navbar_profile-notifications'>
          <NotificationsIcon style={{color: 'white'}} fontSize='small' sx={{ mr: 2, mt: 0.7}}/>
        </div>
      );
    }
  }else {
    return <Navigate to={'/login'}/>;
  }

  return (
    <div className='container-navbar'>
        <div className='container-navbar_logo'>
            <Link to='/'>Plantool</Link>
        </div>
        {menu}
        <div className='container-navbar_profile'>
          {notification}
          <Button 
          style={{color: 'white', textTransform: 'none'}}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            <div className='container-navbar_profile-name'>{user.first_name + " " + user.last_name}</div>
            <div className='container-navbar_profile-picture'>
              <img src={default_profile_pic} alt="profile pic"/>
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem 
            onClick={handleClose}
            style={{minWidth:130}} 
            >
              <Link to='profile' style={{color:"black"}}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem 
            onClick={handleClose}
            style={{color:"red", minWidth:130}} 
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
    </div>
  )
}
