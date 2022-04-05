import React, {useState, useEffect} from 'react';
import './pushNotification.css';

export const PushNotification = () => {

    const [status, setStatus] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setStatus(false);
        },4000 // ms
        );
    }, []);

    return (
        status? <div className='container-pushNotification popup-animate'>
            <h4>New Employee Request!</h4>
        </div>: <></>
    )
}
