import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './notification.styles.scss';

//importing icon 
import { IoMdNotificationsOutline } from 'react-icons/io';

//customComponents
import Icon from '../../../reusableComponent/icon/icon.component';
import AcceptTypeNotification from './acceptTypeNotification/acceptTypeNotification.component';
import axios from 'axios';
//importing services
import { GET_VENDOR_DETAILS_BY_ID,GET_ALL_PADDING_REQUEST, ACCEPT_BEING_ADDED_AS_HOSPITAL, ACCCEPT_BEING_ADDED_AS_DOCTOR } from '../../../../services/services';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotifications] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const currentVendor = useSelector(state => state.currentVendor);
    const auth_token = useSelector(state => state.token);
    var aValue = localStorage.getItem("token");

function getData() {

    axios.get(GET_ALL_PADDING_REQUEST, {
            headers: {
                'Authorization': `Bearer ${auth_token.accessToken?auth_token.accessToken:aValue}`
            }
        })
        .then(res => {
            // console.log("res.data.payload _: -=-=-= ", res.data.payload);
           
            setUserInfo(res.data.payload);
        })
        .catch(err => {
            console.log(err);
            alert('cant fetch user info');
        });
}

    useEffect(() => {
        getData();
    }, [auth_token])


    useEffect(() => {

        if (currentVendor.businessType === 'doctor') {
            // const data = clinic.filter(item => item.status === "pending").map(item => item.clinicId );
            // console.log("Data :=-=-; ", data);

            userInfo && setNotifications(
                userInfo.map(item => <AcceptTypeNotification key={item._id} id={item._id}  getData={getData}/>)
            );
        }
        else if (currentVendor.businessType === 'hospital') {
            userInfo && setNotifications(
                userInfo.map(item => <AcceptTypeNotification key={item._id} id={item._id} getData={getData}/>)
            );
        }

        // console.log("Notifications available : - " , notifications);
        // console.log(currentVendor);
    }, [currentVendor]);

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
                        notifications.length > 0? notifications:<p>No Notifications</p>
                    }
                </div>
            }
        </div>
    );
}

export default Notification;