import React, {useEffect} from 'react';
import './pushNotification.css';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../features/notification/pushNotificationSlice';

export const PushNotification = () => {
    const status = useSelector(state => state.pushNotification.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if(status) {
            setTimeout(() => {
                dispatch(close());
            },4000 // ms
            );
        }
    }, [status]);

    return (
        status? <div className='container-pushNotification popup-animate'>
            <h4>New Employee Request!</h4>
        </div>: <></>
    )
}
