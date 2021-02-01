import React, { useState, useEffect } from 'react';
import './welcomeOtpScreen.styles.scss';

//importing custom components
import OtpInput from './otpInput/otpInput.component';
import PhoneNoInput from './phoneNoInput/phoneNoInput.component';

//importing routes
import { ADD_BUSINESS_INFO } from '../routes';

const WelcomeOtpScreen = ({ history, match }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [phoneNo, setPhoneNo] = useState(['', '', '', '', '', '', '', '', '', '']);
    const [countryCode, setCountryCode] = useState({ code: '+91', country: 'IND' });

    useEffect(() => {
        //action when otp is input
        let check = () => {
            for (let i = 0; i < otp.length; i++) {
                if (otp[i] === '') {
                    return false;
                }
            }
            return true;
        }
        if (check()) {
            history.push(`${match.url}/${ADD_BUSINESS_INFO}`);
        }
    }, [otp]);

    return (
        <div className="welcomeOtpScreen">
            <div className="logo">
                <img
                    src='https://image.shutterstock.com/image-vector/medicine-logo-260nw-715548160.jpg'
                    alt='mediseen logo'
                />
            </div>
            <div className="welcomeScreenHeader">
                <h2>
                    Welcome To Mediseen Store
                </h2>
            </div>
            <div className="welcomeScreenInstructions">
                <p>
                    Enter Whatsaap number through which you want to communicate with your Patients.
                </p>
            </div>
            <div className="welcomeScreenPhoneNoInput">
                <PhoneNoInput {...{ phoneNo, setPhoneNo, countryCode, setCountryCode }} />
            </div>
            <div className="submissionButton">
                <button className='greenButton'>Send</button>
            </div>
            <div className="welcomeScreenOtpInput">
                <OtpInput {...{ otp, setOtp }} />
            </div>
        </div>
    );
}

export default WelcomeOtpScreen;