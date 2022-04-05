import React, {useEffect, useState} from 'react';
import './navbar.css';
import { Link, Navigate, useLocation } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { forget } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Notification } from '../notification/notification';



export const Navbar = () => {
  const logoutURL = "http://localhost:8080/api/auth/logout";
  let menu, notification;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const notification_data = useSelector((state) => state.notification.value);
  const updateData = useSelector((state) => state.updateData.value);
  const [anchorEl, setAnchorEl] = useState(null);
  const open_profile_menu = Boolean(anchorEl);
  const [redirect, setRedirect] = useState(false);
  const [open_notification, setOpen_notification] = useState(false);
  const location = useLocation();
  
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
          <svg xmlns="http://www.w3.org/2000/svg" width="929" height="103" viewBox="0 0 929 103" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M43.5964 0H40.7805V0.0373552L0.120117 4.5067e-05L57.8469 65.391L58.0066 65.2115C74.5573 88.1042 101.486 103 131.894 103H134.71H794.411H797.227C827.634 103 854.563 88.1042 871.114 65.2116L871.273 65.391L929 4.5067e-05L888.34 0.0373549V0H885.524H43.5964Z" fill="#3C5B9A"/>
          </svg>
          <Link className={location.pathname === '/'? 'active': ''} to='/'>Planning</Link>
          <Link className={location.pathname === '/team'? 'active': ''} to='team'>Team</Link>
          <Link className={location.pathname === '/projects'? 'active': ''} to='projects'>Projects</Link>
          <Link className={location.pathname === '/stats'? 'active': ''} to='stats'>Stats</Link>
        </div>
      );
      notification = (
        <div className='container-navbar_profile-notifications'>
          <div className='notification_icon'>
            <NotificationsIcon onClick={handleOpen_notification} style={{color: 'white'}} fontSize='small' sx={{ mr: 2, mt: 0.5}}/>
            {notification_data.length !== 0? <div className='red-dot'></div> : <></>}
          </div>
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
              {notification_data.length !== 0? <Notification />: <> Sorry, you have no pending requests <br/> at the moment! </>}
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
            <Link id='plantool_logo' to='/'><h3>Plantool</h3></Link>
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
              <Link id='profile' to='profile' style={{color:"black"}}>
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
