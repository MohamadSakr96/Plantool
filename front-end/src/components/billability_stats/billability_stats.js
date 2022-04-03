import React from 'react';
import './billability_stats.css';
import default_profile_pic from "../../assets/default_profile_icon.png";

export const Billability_Stats = (props) => {
    
    const start_date = new Date(props.date[0]);
    const end_date = new Date(props.date[1]);
    
    const numberOfDays = (startDate, endDate) => Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));

    const numberOfWorkDays = (startDate, endDate) => {
        let count = 0;
        const curDate = new Date(startDate.getTime());
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    };

    console.log(typeof(start_date),end_date);

    const checkDate = () => {
        if (end_date - start_date > 0) {
            
        }
    };
    checkDate();

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
