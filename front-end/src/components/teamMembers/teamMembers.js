import React, {useState} from 'react';
import './teamMembers.css';
import AddIcon from '@mui/icons-material/Add';
import { AddEvent } from '../addEvent/addEvent';
import { UpdateTeam } from '../updateTeam/updateTeam';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export const TeamMembers = () => {
    const user = useSelector((state) => state.auth.value);
    const users_data = useSelector((state) => state.getAllUsersInfo.value);
    const location = useLocation();
    const [open, setOpen] = useState(null);

    if(!user) {
        return;
    }


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
                {users_data.map((data, index) => {
                    return <div key={index} className={users_data.length !== index+1?'team_members-item border_bottom':'team_members-item'}>
                                <div className='team_members-item_user'>
                                    <div className='container-navbar_profile-picture'>
                                        <img src={data["image_path"]} alt="profile pic"/>
                                    </div>
                                    <div className='container-navbar_profile-name'>{data["first_name"]+" "+data["last_name"] }</div>
                                </div>
                                <div className='team_members-item_action'>
                                    <AddIcon onClick={()=>handleAddEvent(data["_id"])} style={{color: '#3d3c3b'}}/>
                                </div>
                            </div>;
                })}
            </div>
        </div>
        )
    } else{
        return location.pathname !== '/team'?  <AddEvent id={open} /> : <UpdateTeam id={open} />;
    }
    
}
