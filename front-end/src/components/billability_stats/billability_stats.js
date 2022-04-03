import React, { useState, useEffect } from 'react';
import './billability_stats.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUsersInfo } from '../../features/admin/getAllUsersInfoSlice';

export const Billability_Stats = (props) => {
    const users_data = useSelector((state) => state.getAllUsersInfo.value);   
    const [billability, setBillability] = useState(0);
    const start_date = new Date(props.date[0]);
    const end_date = new Date(props.date[1]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props) {
            let newData = users_data.map((item) => 
                Object.assign({}, item, {selected:false})
            );
            setBillability(0);
            let sum = 0;
            newData.map((user_data)=>{
                let bill = getBillability(user_data["events"]);
                user_data["billability"] = bill;
                sum += bill;
            });
            dispatch(getUsersInfo(newData));
            setBillability(prev => prev+sum);
        }
    }, [props]);

    
    const numberOfDays = (endDate, startDate) => {    
        [startDate, endDate] = checkDate(startDate, endDate);
        return (endDate - startDate) / (1000 * 60 * 60 * 24);
    };

    const numberOfWorkDays = (startDate, endDate) => {
        let count = 0;
        const curDate = new Date(startDate);
        endDate = new Date(endDate);
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    };
    const work_days = numberOfWorkDays(start_date, end_date);


    const checkDate = (start, end) => {
        start = new Date(start);
        end = new Date(end);
        // Extreme cases 
        if (end<=start_date || start >= end_date) {
            return [0, 0];
        }
        if (start<start_date && end > end_date) {
            return [start_date,end_date];
        }
        // inbound cases
        if (start< start_date && end < end_date) {
            return [start_date, end];
        }
        if (start > start_date && end > end_date) {
            return [start, end_date];
        }
        return [start,end];
    };

    const getBillability = (data_array) => {
        let days_staffed = 0;
        let vac_days = 0;
        data_array.map((event) => {
            days_staffed += numberOfDays(event["end_date"], event["start_date"]);
            if (event["name"] === "vacation") {
                vac_days += numberOfDays(event["end_date"], event["start_date"]);  
            }
        });
        let billability_of_user = Math.ceil((days_staffed/(work_days - vac_days))*100);

        return billability_of_user;
    };

    return (
        <div className='container-billability'>
            <div className='container-billability_title'>
                <h1>Overall {billability} %</h1>
            </div>
            <div className='container-billability_content'>
                {users_data.map((data, index) => {
                return <div key={index} className='billability_content-item border_bottom'>
                        <div className='billability_content-item_user'>
                            <div className='billability_content-item_user_picture'>
                                <img src={data["image_path"]} alt="profile pic"/>
                            </div>
                            <div>{data["first_name"]+" "+data["last_name"]}</div>
                        </div>
                        <div className='billability_content-item_data'>{data["billability"]} %</div>
                    </div>;
                })}                 
            </div>
        </div>
    )
}
