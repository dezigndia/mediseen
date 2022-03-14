import React ,{useEffect}from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './hospitalRegistrationHome.styles.scss';

//importing reusable components
import RegistrationFormButton from '../../../../reusableComponent/registrationFormButton/registrationFormButton.component';

//importing icons
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BiWallet } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { MdCheckCircle } from 'react-icons/md';
import logo from './logo.svg';

//importing routes
import { PAYMENT_SETTING, ADD_DOCTORS, ADD_STAFF } from '../../routes';

const HospitalRegistrationHome = ({ history, match, currentVendor }) => {

    useEffect(() => {
        if ((currentVendor.doctors && currentVendor.doctors.length) && (currentVendor.payment && currentVendor.payment.type)) {
            // form /vendor/registration/registerADoctor
            //to /vendor/profile
            let link = match.url.split('/');
            link.pop();
            link.pop();
            link.push('profile');
            link = link.join('/');
            console.log(link);
            history.push(link);
        }
    }, [match.url, currentVendor.doctors, currentVendor.payment, history]);

    return (
        <div className="hospitalRegistrationHome">
            <div className="businessInformation">
                <h4>Information about your business</h4>
                <RegistrationFormButton
                    icon1={<AiOutlineClockCircle />}
                    label={[<p>Add Pannel & Timing</p>]}
                    icon2={
                        currentVendor && currentVendor.doctors && currentVendor.doctors.length ?
                            <MdCheckCircle /> :
                            <GoPlus />
                    }
                    onClick={(e) => { history.push(`${match.url}/${ADD_DOCTORS}`) }}
                    translucent={
                        currentVendor && currentVendor.doctors && currentVendor.doctors.length
                            ? false
                            : true
                    }
                />
                <RegistrationFormButton
                    icon1={<BiWallet />}
                    label={[<p>Payment Setting</p>]}
                    icon2={
                        currentVendor.payment
                            ? <MdCheckCircle />
                            : <GoPlus />
                    }
                    onClick={(e) => { history.push(`${match.url}/${PAYMENT_SETTING}`) }}
                    translucent={
                        currentVendor && currentVendor.payment ? false : true
                    }
                />
                <RegistrationFormButton
                    icon1={<BsFillPeopleFill />}
                    label={[<p>Add Support Staff</p>]}
                    icon2={
                        currentVendor && currentVendor.staffs  ? <MdCheckCircle /> : <GoPlus />
                    }
                    onClick={(e) => { history.push(`${match.url}/${ADD_STAFF}`) }}
                    translucent={
                        currentVendor && currentVendor.staffs
                            ? false
                            : true
                    }
                />
            </div>
            <RegistrationFormButton
                img={logo}
                alt='doctDesk'
                label={[
                    <p>Or Verify Your <strong>DoctDesk</strong> User ID</p>,
                    <p>And We Will Fetch All Details</p>
                ]}
            />
            <RegistrationFormButton
                icon1={<IoLogoWhatsapp />}
                label={[<p>If You Are Facing Problem Chat With Us</p>]}
                iconSize='2.5em'
            />
            {
                (currentVendor.doctors && currentVendor.doctors.length) && (currentVendor.payment) && (currentVendor.staffs.length)
                    ? <Redirect to={`/vendor/profile`} />
                    : null
            }
        </div>
    );
}

const mapStateToProps = state => ({
    currentVendor: state.currentVendor
});

export default connect(mapStateToProps)(HospitalRegistrationHome);