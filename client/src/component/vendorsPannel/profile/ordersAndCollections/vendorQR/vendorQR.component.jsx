import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './vendorQR.styles.scss';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const VendorQR = ({ showVendorQRTab, goBackToOrdersPage, cost, updateActiveItem }) => {
    const businessName = useSelector(state => state.currentVendor.businessName);
    const deliveryDetails = useSelector(state => state.currentVendor.deliveryDetails);
    const [value, setValue] = useState(`Rs. ${cost + (deliveryDetails && deliveryDetails.deliveryCharges)} UPI received`);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="vendorPopupAcceptedDeliveryContainer" style={{ '--height': `${height}px` }}>
            <div className="vendorPopupAcceptedDelivery">
                <div className="vendorPopupAcceptedDeliveryHeader">
                    <p>Payment Received</p>
                </div>
                <div className="vendorPopupAcceptedDeliveryMain">
                    <div>
                        <p>We have already sent customer payment link</p>
                        <p>Still</p>
                        <p>You can receive Payment from QR code scan</p>
                    </div>
                    <div>
                        <figure>
                            <img src='https://pngimg.com/uploads/qr_code/qr_code_PNG24.png' alt='qr code' />
                            <figcaption>QR for {businessName} </figcaption>
                        </figure>
                    </div>
                </div>
                <div className="vendorPopupAcceptedDeliveryPaymentMethod">
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                            <FormControlLabel
                                value={`Rs. ${cost + (deliveryDetails && deliveryDetails.deliveryCharges)} UPI received`}
                                control={<Radio />}
                                label={`Rs. ${cost + (deliveryDetails && deliveryDetails.deliveryCharges)} UPI received`}
                            />
                            <FormControlLabel
                                value={`Rs. ${cost + (deliveryDetails && deliveryDetails.deliveryCharges)} Cash received`}
                                control={<Radio />}
                                label={`Rs. ${cost + (deliveryDetails && deliveryDetails.deliveryCharges)} Cash received`}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="vendorPopupAcceptedDeliveryActions">
                    <button
                        className='whiteButton'
                        onClick={(e) => {
                            showVendorQRTab(false);
                        }}
                    >
                        No
                        </button>
                    <button
                        className='greenButton'
                        onClick={(e) => {
                            updateActiveItem({ status: 'delivered' });
                            showVendorQRTab(false);
                            goBackToOrdersPage();//getting back to order page
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VendorQR;