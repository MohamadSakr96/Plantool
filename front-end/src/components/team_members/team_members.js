import React from 'react';
import './team_members.css';
import AddIcon from '@mui/icons-material/Add';
import default_picture from '../../assets/default_profile_icon.png';

export const Team_Members = () => {
  return (
    <div className='container-team_members'>
       <div className='team_members-item border_bottom'>
           <div className='team_members-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='team_members-item_action'>
                <AddIcon style={{color: '#3d3c3b'}}/>
           </div>
       </div>
       <div className='team_members-item border_bottom'>
           <div className='team_members-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='team_members-item_action'>
                <AddIcon style={{color: '#3d3c3b'}}/>
           </div>
       </div>
       <div className='team_members-item border_bottom'>
           <div className='team_members-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='team_members-item_action'>
                <AddIcon style={{color: '#3d3c3b'}}/>
           </div>
       </div>
       <div className='team_members-item border_bottom'>
           <div className='team_members-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='team_members-item_action'>
                <AddIcon style={{color: '#3d3c3b'}}/>
           </div>
       </div>
       <div className='team_members-item'>
           <div className='team_members-item_user'>
                <div className='container-navbar_profile-picture'>
                    <img src={default_picture} alt="profile pic"/>
                </div>
                <div className='container-navbar_profile-name'>Mohamad Sakr</div>
           </div>
           <div className='team_members-item_action'>
                <AddIcon style={{color: '#3d3c3b'}}/>
           </div>
       </div>
    </div>
  )
}
