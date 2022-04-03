import React, { useState, useEffect } from 'react';
import './notification.css';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {ACCEPT_REQUEST_URL, REJECT_REQUEST_URL, GET_PENDING_REQUESTS_URL} from '../../constants';
import { set } from '../../features/admin/notificationSlice';
import { useSelector, useDispatch } from 'react-redux';


export const Notification = () => {
    const user = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();
    const notification_data = useSelector((state) => state.notification.value);
    const [update_data, setUpdateData] = useState(false);
    
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
      }, [update_data]);

    const handleAccept = async (event) => {
        try {
            await axios.post( ACCEPT_REQUEST_URL, {
                _id: event.target.id
            },{
                headers: {
                    "x-access-token": user.accessToken
                }
            });
            setUpdateData(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleReject = async (event) => {
        try {
            await axios.post( REJECT_REQUEST_URL, {
                _id: event.target.id
            },{
                headers: {
                    "x-access-token": user.accessToken
                }
            });
            setUpdateData(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
    <div className='container-notification'>
        {notification_data.map((user_info, index)=>{
            return <div key={index} className={notification_data.length !== index+1? 'notification-item border_bottom': 'notification-item'}>
                        <div className='notification-item_user'>
                            <div className='container-navbar_profile-picture'>
                                <img src={user_info["image_path"]} alt="profile pic"/>
                            </div>
                            <div className='container-navbar_profile-name'>{user_info["first_name"] + " " + user_info["last_name"]}</div>
                        </div>
                        <div className='notification-item_action'>
                            <CheckIcon id={user_info["_id"]} onClick={handleAccept} style={{color: 'green'}}/>
                            <CloseIcon id={user_info["_id"]} onClick={handleReject} style={{color: 'red'}}/>
                        </div>
                    </div>;
        })}
    </div>
    )
}
