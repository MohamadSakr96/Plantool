import React from 'react';
import './billability_stats.css';
import default_profile_pic from "../../assets/default_profile_icon.png";

export const Billability_Stats = () => {
  return (
    <div className='container-billability'>
        <div className='container-billability_title'>
            <h1>Overall XX%</h1>
        </div>
        <div className='container-billability_content'>
            <div className='billability_content-item border_bottom'>
                <div className='billability_content-item_user'>
                    <div className='billability_content-item_user_picture'>
                        <img src={default_profile_pic} alt="profile pic"/>
                    </div>
                    <div>Mohamad Sakr</div>
                </div>
                <div className='billability_content-item_data'>XX%</div>
            </div>
            <div className='billability_content-item border_bottom'>
                <div className='billability_content-item_user'>
                    <div className='billability_content-item_user_picture'>
                        <img src={default_profile_pic} alt="profile pic"/>
                    </div>
                    <div>Mohamad Sakr</div>
                </div>
                <div className='billability_content-item_data'>XX%</div>
            </div>
            <div className='billability_content-item'>
                <div className='billability_content-item_user'>
                    <div className='billability_content-item_user_picture'>
                        <img src={default_profile_pic} alt="profile pic"/>
                    </div>
                    <div>Mohamad Sakr</div>
                </div>
                <div className='billability_content-item_data'>XX%</div>
            </div>
        </div>
    </div>
  )
}
