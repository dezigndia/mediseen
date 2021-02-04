import React from 'react';
import { connect } from 'react-redux';
import './pathologyRegistrationHome.styles.scss';

//importing icons
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { BiWallet } from 'react-icons/bi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';
import { MdCheckCircle } from 'react-icons/md';

//importing reusable components
import RegistrationFormButton from '../../../../reusableComponent/registrationFormButton/registrationFormButton.component';

//importing routes
import { ADD_TIMINGS, COLLECTION_SETTING, ADD_TESTS } from '../../routes';

const PathologyRegistrationHome = ({ history, match, currentVendor }) => {
    return (
        <div className="pathologyRegistrationHome">
            <div>
                <h4>information about your business</h4>
                <RegistrationFormButton
                    icon1={<AiOutlineClockCircle />}
                    label={[<p>Add Timing And Staff</p>]}
                    icon2={
                        currentVendor.staffs && currentVendor.workingHours
                            ? <MdCheckCircle />
                            : < GoPlus />
                    }
                    translucent={
                        currentVendor.staffs && currentVendor.workingHours
                            ? false
                            : true
                    }
                    onClick={(e) => history.push(`${match.url}/${ADD_TIMINGS}/`)}
                />
                <RegistrationFormButton
                    icon1={<BsFillPeopleFill />}
                    label={[<p>Collection & Payment Setting</p>]}
                    icon2={
                        currentVendor.collections && currentVendor.payment
                            ? <MdCheckCircle />
                            : < GoPlus />
                    }
                    translucent={
                        currentVendor.collections && currentVendor.payment
                            ? false
                            : true
                    }
                    onClick={(e) => history.push(`${match.url}/${COLLECTION_SETTING}/`)}
                />
                <RegistrationFormButton
                    icon1={<BiWallet />}
                    label={[<p>Add Or Import Test</p>]}
                    icon2={
                        currentVendor.tests
                            ? <MdCheckCircle />
                            : <GoPlus />
                    }
                    translucen={
                        currentVendor.tests
                            ? false
                            : true
                    }
                    onClick={(e) => history.push(`${match.url}/${ADD_TESTS}/`)}
                />
            </div>
            <div>
                <RegistrationFormButton
                    icon1={<IoLogoWhatsapp />}
                    label={[<p>If You Are facing Problems Chat With Us</p>]}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentVendor: state.currentVendor
});

export default connect(mapStateToProps)(PathologyRegistrationHome);