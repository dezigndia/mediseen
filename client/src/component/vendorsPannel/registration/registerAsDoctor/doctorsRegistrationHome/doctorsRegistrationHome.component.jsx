import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './doctorsRegistrationHome.styles.scss';

//routes names
import { ADD_HOSPITALS, PAYMENT_SETTING } from '../../routes';

//importing icons
import Doctin from '../../../../../assets/images/doctInApiLogo.webp';
import { FaCapsules } from 'react-icons/fa';
import { BiWallet } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { MdCheckCircle } from 'react-icons/md';

//reusable component
import RegistrationFormButton from '../../../../reusableComponent/registrationFormButton/registrationFormButton.component';


const DoctorsRegistrationHome = ({ history, match, currentVendor }) => {

    const isClinicAdded = currentVendor.clinic && currentVendor.clinic.length;
    const isPaymentSettingDone = currentVendor.payment && currentVendor.payment.type;

    useEffect(() => {
        if (isClinicAdded && isPaymentSettingDone) {
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
    }, [match.url]);

    return (
        <>
            <div className="doctorsRegistrationHome">
                <div className="businessInformation">
                    <h4>Information about your business</h4>
                    <RegistrationFormButton
                        icon1={<FaCapsules />}
                        label={[<p>Add Hospital & Timing</p>]}
                        icon2={
                            currentVendor.clinic && currentVendor.clinic.length
                                ? <MdCheckCircle />
                                : <GoPlus />
                        }
                        onClick={(e) => history.push(`${match.url}/${ADD_HOSPITALS}`)}
                        translucent={
                            currentVendor.clinic && currentVendor.clinic.length
                                ? false
                                : true
                        }
                    />
                    <RegistrationFormButton
                        icon1={<BiWallet />}
                        label={[<p>Payment Setting</p>]}
                        icon2={
                            currentVendor.payment && currentVendor.payment.type
                                ? <MdCheckCircle />
                                : <GoPlus />
                        }
                        onClick={(e) => history.push(`${match.url}/${PAYMENT_SETTING}`)}
                        translucent={
                            currentVendor.payment && currentVendor.payment.type
                                ? false
                                : true
                        }
                    />
                </div>
                <RegistrationFormButton
                    img={Doctin}
                    label={[
                        <p>Or verify Your <strong>Doctin</strong> user ID</p>,
                        <p>And we will fetch all details</p>
                    ]}
                />
                <RegistrationFormButton
                    icon1={<IoLogoWhatsapp />}
                    label={[<p>if you are facing problem chat with us</p>]}
                    iconSize='2.5em'
                />
            </div>
            {
                isClinicAdded && isPaymentSettingDone
                    ? <Redirect to={`${match.url}/profile`} />
                    : null
            }
        </>
    );
}

const mapStateToProps = state => ({
    currentVendor: state.currentVendor
});

export default connect(mapStateToProps)(DoctorsRegistrationHome);