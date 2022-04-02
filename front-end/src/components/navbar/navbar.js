import React, {useEffect, useState} from 'react';
import './navbar.css';
import { Link, Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { forget } from '../../features/auth/authSlice';
import { set } from '../../features/admin/notificationSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Notification } from '../notification/notification';
import { GET_PENDING_REQUESTS_URL } from '../../constants';



export const Navbar = () => {
  const logoutURL = "http://localhost:8080/api/auth/logout";
  let menu, notification;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);
  const notification_data = useSelector((state) => state.notification.value);
  const [anchorEl, setAnchorEl] = useState(null);
  const open_profile_menu = Boolean(anchorEl);
  const [redirect, setRedirect] = useState(false);
  const [open_notification, setOpen_notification] = useState(false);
  const location = useLocation()
  
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

  useEffect(async () => {
    try {
      const res = await axios.get(GET_PENDING_REQUESTS_URL, {
        headers: {
          "x-access-token": user.accessToken
        }
      });
      dispatch(set(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, []);

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
            <div className='red-dot'></div>
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
