import React, {useState} from 'react';
import './team_members.css';
import AddIcon from '@mui/icons-material/Add';
import default_picture from '../../assets/default_profile_icon.png';
import { AddEvent } from '../addEvent/addEvent';
import { UpdateTeam } from '../updateTeam/updateTeam';
import { useLocation } from "react-router-dom";

export const Team_Members = (props) => {
    
    const location = useLocation();

    const [open, setOpen] = useState(null);

    const handleAddEvent = (user_id) => {
        setOpen(user_id);
    };

    if (open === null) {
        return (
        <div className='container'>
            <div className='team_members_title'>
                <h3>Team Members</h3>
            </div>
            <div className='container-team_members'>
            <div className='team_members-item border_bottom'>
                <div className='team_members-item_user'>
                    <div className='container-navbar_profile-picture'>
                        <img src={default_picture} alt="profile pic"/>
                    </div>
                    <div className='container-navbar_profile-name'>Mohamad Sakr</div>
                </div>
                <div className='team_members-item_action'>
                    <AddIcon onClick={()=>handleAddEvent("m1")} style={{color: '#3d3c3b'}}/>
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
        </div>
        )
    } else{
        return location.pathname !== '/team'?  <AddEvent id={open} /> : <UpdateTeam id={open} />;
    }
    
}
