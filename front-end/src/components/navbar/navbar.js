import React, {useState} from 'react';
import './navbar.css';
import { Link, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { forget } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Notification } from '../notification/notification';



export const Navbar = () => {
  const logoutURL = "http://localhost:8080/api/auth/logout";
  let menu, notification;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const [anchorEl, setAnchorEl] = useState(null);
  const open_profile_menu = Boolean(anchorEl);
  const [redirect, setRedirect] = useState(false);
  const [open_notification, setOpen_notification] = useState(false);
  const [status, setStatus] = useState({
    planning : true,
    team : false,
    projects : false,
    stats : false,
  });
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen_notification = () => {
    setOpen_notification(true);
  };
  const handleClose_notification = () => {
    setOpen_notification(false);
  };

  const handleLinkClick = (event) => {
    const name = event.currentTarget.id;
    if (name === "planning"){
      setStatus({
        'planning': true,
        'team': false,
        'projects': false,
        'stats': false,
      });
    }
    if (name === "team"){
      setStatus({
        'planning': false,
        'team': true,
        'projects': false,
        'stats': false,
      });
    }
    if (name === "projects"){
      setStatus({
        'planning': false,
        'team': false,
        'projects': true,
        'stats': false,
      });
    }
    if (name === "stats"){
      setStatus({
        'planning': false,
        'team': false,
        'projects': false,
        'stats': true,
      });
    }
    if (name === "plantool_logo"){
      setStatus({
        'planning': true,
        'team': false,
        'projects': false,
        'stats': false,
      });
    }
    if (name === "profile"){
      setStatus({
        'planning': false,
        'team': false,
        'projects': false,
        'stats': false,
      });
    }
  }; 

  async function logout() {
    try {
      await axios.post(logoutURL, {
        id: user.id
      });
      localStorage.clear();
      dispatch(forget());
      setRedirect(true);
    }catch (err) {
      console.log(err);
    }
  }

  if(redirect) {
    return <Navigate to={'/login'} replace/>;
  }
  
  if (user && user.role !== "pending") {
    if (user.role === "admin") {
      menu = (
        <div className='container-navbar_menu'>
            <Link id="planning" onClick={handleLinkClick} style ={status.planning ? {opacity: 1} : {opacity: 0.7}} to='/'>Planning</Link>
            <Link id="team" onClick={handleLinkClick} style ={status.team ? {opacity: 1} : {opacity: 0.7}} to='team'>Team</Link>
            <Link id="projects" onClick={handleLinkClick} style ={status.projects ? {opacity: 1} : {opacity: 0.7}} to='projects'>Projects</Link>
            <Link id="stats" onClick={handleLinkClick} style ={status.stats ? {opacity: 1} : {opacity: 0.7}} to='stats'>Stats</Link>
        </div>
      );
      notification = (
        <div className='container-navbar_profile-notifications'>
          <NotificationsIcon onClick={handleOpen_notification} style={{color: 'white'}} fontSize='small' sx={{ mr: 2, mt: 0.5}}/>
          <Dialog
            open={open_notification}
            onClose={handleClose_notification}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Add New Employee"}
            </DialogTitle>
            <DialogContent>
              <Notification />
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  }else {
    return <Navigate to={'/login'} replace/>;
  }

  return (
    <div className='container-navbar'>
        <div className='container-navbar_logo'>
            <Link id='plantool_logo' onClick={handleLinkClick} to='/'><h3>Plantool</h3></Link>
        </div>
        {menu}
        <div className='container-navbar_profile'>
          {notification}
          <Button 
          style={{color: 'white', textTransform: 'none'}}
          id="basic-button"
          aria-controls={open_profile_menu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open_profile_menu ? 'true' : undefined}
          onClick={handleClick}
          >
            <div className='container-navbar_profile-name'>{user.first_name + " " + user.last_name}</div>
            <div className='container-navbar_profile-picture'>
              <img src={user.image_path} alt="profile pic"/>
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open_profile_menu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem 
            onClick={handleClose}
            style={{minWidth:130}} 
            >
              <Link id='profile' onClick={handleLinkClick} to='profile' style={{color:"black"}}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem 
            onClick={()=>{handleClose(); logout();}}
            style={{color:"red", minWidth:130}} 
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
    </div>
  )
}
