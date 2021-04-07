import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './notification.styles.scss';

//importing icon 
import { IoMdNotificationsOutline } from 'react-icons/io';

//customComponents
import Icon from '../../../reusableComponent/icon/icon.component';
import AcceptTypeNotification from './acceptTypeNotification/acceptTypeNotification.component';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotifications] = useState(false);

    const currentVendor = useSelector(state => state.currentVendor);

    useEffect(() => {
        if (currentVendor.businessType === 'doctor') {
            let clinic = currentVendor.clinic;
            clinic && setNotifications(
                clinic
                    .filter(item => item.status === "pending")
                    .map(item => <AcceptTypeNotification key={item.clinicId} id={item.clinicId} />)
            );
        }
        else if (currentVendor.businessType === 'hospital') {
            let doctors = currentVendor.doctors;
            doctors && setNotifications(
                doctors
                    .filter(item => item.status === "pending")
                    .map(item => <AcceptTypeNotification key={item.doctorId} id={item.doctorId} />)
            );
        }
        console.log(notifications);
        console.log(currentVendor);
    }, [currentVendor,currentVendor.clinic,currentVendor.doctors]);

    return (
        <div className="vendorsNotification">
            <Icon
                size='30px'
                iconColor='white'
                onClick={(e) => setShowNotifications(prevState => !prevState)}
            >
                <IoMdNotificationsOutline />
            </Icon>
            {
                showNotification
                &&
                <div className='notifications'>
                    {
                        notifications.length>0? notifications:<p>No Notifications</p>
                    }
                </div>
            }
        </div>
    );
}

export default Notification;