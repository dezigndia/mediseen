import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './acceptTypeNotification.styles.scss';

//importing services
import { GET_VENDOR_DETAILS_BY_ID, ACCEPT_BEING_ADDED_AS_HOSPITAL, ACCCEPT_BEING_ADDED_AS_DOCTOR } from '../../../../../services/services';

//importing reusable components
import InfoCard from '../../../../reusableComponent/infoCard/infoCard.component.';

//importing action
import { setCurrentVendor } from '../../../../../actions/action';

const AcceptTypeNotification = ({ id ,getData}) => {

    const [userInfo, setUserInfo] = useState({});

    const currentVendor = useSelector(state => state.currentVendor);
    const auth_token = useSelector(state => state.token);

    const acceptHandler = () => {
        let link = currentVendor.businessType === 'doctor' ? ACCCEPT_BEING_ADDED_AS_DOCTOR : ACCEPT_BEING_ADDED_AS_HOSPITAL;
        axios
            .put(link(userInfo.phone, currentVendor._id), { status: 'accepted' }, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                // alert('accepted invitation');
                if (currentVendor.businessType === 'doctor') {
                    for (let i of currentVendor.clinic) {
                        if (i.clinicId === id) {
                            i.status = 'accepted';
                            break;
                        }
                    }
                }
                else {
                    currentVendor && currentVendor.doctors && currentVendor.doctors.length > 0 && currentVendor.doctors.map(doc => {
                        if(doc.doctorId === id){
                            doc.status = "accepted";
                        }
                    })
                }
                // console.log(currentVendor);
                getData();
                setCurrentVendor(JSON.parse(JSON.stringify(currentVendor)));
                // localStorage.setItem('currentVendor',JSON.stringify({currentVendor}));
            })
            .catch(err => {
                console.log(err);
                alert("unable to accept invitation");
            });
    }

    const rejectHandler = () => {
        let link = currentVendor.businessType === 'doctor' ? ACCCEPT_BEING_ADDED_AS_DOCTOR : ACCEPT_BEING_ADDED_AS_HOSPITAL;
        axios
            .put(link(userInfo.phone, currentVendor._id), { status: 'rejected' }, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                // alert('reject invitation');
                if (currentVendor.businessType === 'doctor') {
                    for (let i of currentVendor.clinic) {
                        if (i.clinicId === id) {
                            i.status = 'rejected';
                            break;
                        }
                    }
                }
                else {
                    for (let i of currentVendor.doctors) {
                        if (i.doctorId === id) {
                            i.status = 'rejected';
                            break;
                        }
                    }
                }
                setCurrentVendor(JSON.parse(JSON.stringify(currentVendor)));
                // localStorage.setItem('currentVendor',JSON.stringify({currentVendor}));
            })
            .catch(err => {
                console.log(err);
                alert("unable to accept invitation");
            });
    }

    useEffect(() => {
        let searchBusinessType = currentVendor.businessType === 'doctor' ? 'hospital' : 'doctor';
        axios
            .get(GET_VENDOR_DETAILS_BY_ID(searchBusinessType, id))
            .then(res => {
                // console.log("res.data.payload _: -=-=-= ", res.data.payload);
                setUserInfo(res.data.payload);
            })
            .catch(err => {
                console.log(err);
                alert('cant fetch user info');
            });
    }, [])

    return (
        <div className="vendorHeaderNotification">
            <div style={{ backgroundColor: 'white' }}>
                <InfoCard data={userInfo} small />
            </div>
            <div className="vencorNotificationButtons">
                <button className="vendorNotificationAcceptButton" onClick={acceptHandler}>
                    Accept
                </button>
                <button className="vendorNotificationDeclineButton" onClick={rejectHandler}>
                    Decline
                </button>
            </div>
        </div>
    );
}

export default AcceptTypeNotification;