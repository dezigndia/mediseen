import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './pharmacyRegistrationHome.styles.scss';

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
import { ADD_TIMINGS, DELIVERY_SETTING, ADD_PRODUCTS } from '../../routes';

//importing SERVICES
import { GET_USER_DEETAIL_BY_TOKEN } from '../../../../../services/services';

const PharmacyRegistrationHome = ({ history, match, currentVendor, auth_token, setCurrentVendor }) => {
    const [deliverySetting, setDeliverySetting] = useState(null);
    const [products, setProcucts] = useState(null);

    useEffect(() => {
        axios
            .get(GET_USER_DEETAIL_BY_TOKEN, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
                alert('something went wrong');
            })
    }, [setProcucts, setDeliverySetting]);

    return (
        <div className="pharmacyRegistrationHome">
            <div>
                <h4>information about your business</h4>
                <RegistrationFormButton
                    icon1={<AiOutlineClockCircle />}
                    label={[<p>Add Timing And Staff</p>]}
                    icon2={
                        currentVendor.staffs.length && currentVendor.workingHours
                            ? <MdCheckCircle />
                            : < GoPlus />
                    }
                    translucent={
                        currentVendor.staffs.length && currentVendor.workingHours
                            ? false
                            : true
                    }
                    onClick={(e) => history.push(`${match.url}/${ADD_TIMINGS}/`)}
                />
                <RegistrationFormButton
                    icon1={<BsFillPeopleFill />}
                    label={[<p>Dilevery & Payment Setting</p>]}
                    icon2={
                        currentVendor.payment && currentVendor.deliveryDetails
                            ? <MdCheckCircle />
                            : < GoPlus />
                    }
                    translucent={
                        currentVendor.payment && currentVendor.deliveryDetails
                            ? false
                            : true
                    }
                    onClick={(e) => history.push(`${match.url}/${DELIVERY_SETTING}/`)}
                />
                <RegistrationFormButton
                    icon1={<BiWallet />}
                    label={[<p>Add Or Import Products</p>]}
                    icon2={<GoPlus />}
                    translucent
                    onClick={(e) => history.push(`${match.url}/${ADD_PRODUCTS}/`)}
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
    currentVendor: state.currentVendor,
    auth_token: state.token
});

export default connect(mapStateToProps)(PharmacyRegistrationHome);
