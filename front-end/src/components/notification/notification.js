import React from 'react';
import './notification.css';
import default_picture from '../../assets/default_profile_icon.png';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export const Notification = () => {
  return (
    <div className='container-notification'>
       <div className='notification-item border_bottom'>
           <div className='notification-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='notification-item_action'>
                <CheckIcon style={{color: 'green'}}/>
                <CloseIcon style={{color: 'red'}}/>
           </div>
       </div>
       <div className='notification-item border_bottom'>
           <div className='notification-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='notification-item_action'>
                <CheckIcon style={{color: 'green'}}/>
                <CloseIcon style={{color: 'red'}}/>
           </div>
       </div>
       <div className='notification-item'>
           <div className='notification-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='notification-item_action'>
                <CheckIcon style={{color: 'green'}}/>
                <CloseIcon style={{color: 'red'}}/>
           </div>
       </div>
    </div>
  )
}
