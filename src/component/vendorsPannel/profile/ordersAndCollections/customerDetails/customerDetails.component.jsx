import React, { useMemo } from 'react';
import './customerDetails.styles.scss';

//importing jss
import { green } from '../../../../../assets/globalJSS';

//importing icons
import { IoLogoWhatsapp } from 'react-icons/io';

//importing reusable components
import Icon from '../../../../reusableComponent/icon/icon.component';

const Customerdetails = ({ name, mobileNo, address, small }) => {
    const hidden = useMemo(() => ({ display: small ? 'none' : 'flex' }), [small]);
    return (
        <div className="orderCustomerDetails">
            <div className="vendorPopUpCustomerDetails" style={hidden}>
                <div>
                    <p>Customer Detail</p>
                </div>
                <div>
                    <p>Est Delivery Timing: 23min</p>
                </div>
            </div>
            <div className={`vendorPopupNamePhoneChat ${small ? 'justifyFlexStart' : null}`}>
                <div className="vendorPopupCustomerName">
                    <p>{name}</p>
                </div>
                <div className="vendorPopupCustomerPhone">
                    <p>{mobileNo}</p>
                </div>
                <div className="vendorPopupCustomerChat" style={hidden}>
                    <Icon iconColor={green} size='25px'>
                        <IoLogoWhatsapp />
                    </Icon>
                </div>
            </div>
            <div className="vendorPopupCustomerAddress">
                <div className="vendorPopupCustomerHomeAddress">
                    <p>{address && address.area}, {address && address.city}, {address && address.state}, {address && address.country}</p>
                </div>
                <div className="vendorPopupCustomerPincode">
                    <p>Pincode: {address && address.pincode}</p>
                </div>
            </div>
        </div>
    );
}

export default Customerdetails;