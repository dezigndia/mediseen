import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './collected.styles.scss';

//importing custom components
import CustomerDetails from '../customerDetails/customerDetails.component';
import OrderDetails from '../orderDetails/orderDetails.component';
import TotalCostDetails from '../totalCostDetails/totalCostDetails.component';
import DeclineTab from '../declineTab/declineTab.component';

//importing reusable components
import Icon from '../../../../reusableComponent/icon/icon.component';

//importing icon
import { ImAttachment } from 'react-icons/im';

//importing services
import { UPLOAD_FILE } from '../../../../../services/services';

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const Collected = ({ setActiveTabNull, orderNo, orderDate, orderTime, paymentMethod, status, totalItems, cost, name, mobileNo, address, updateActiveItem }) => {
    const [showDeclineTab, setShowDeclineTab] = useState(false);
    const [bill, setBill] = useState(null);
    const billInputRef = useRef(null);

    const auth_token = useSelector(state => state.token);

    const setBillImagePreview = e => {
        let fileReader = new FileReader();
        fileReader.onload = event => setBill(event.target.result);
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const collectButtonHandler = () => {
        if (typeof billInputRef.current.files[0] !== 'undefined') {
            let formData = new FormData();
            formData.append('file', billInputRef.current.files[0]);
            axios
                .post(UPLOAD_FILE, formData, {
                    headers: {
                        'Authorization': `Bearer ${auth_token.accessToken}`
                    }
                })
                .then(res => {
                    updateActiveItem({ bill: res.data.payload.location, status: 'delivered' });
                    setActiveTabNull();
                })
                .catch(err => {
                    console.log('unable to attach bill');
                    alert(err);
                });
        }
        else {
            updateActiveItem({ status: 'collected' });
            setActiveTabNull();
        }
    }

    return (
        <div className="collectedOrders" style={{ '--height': `${height}px` }}>
            <OrderDetails {...{ orderNo, orderDate, orderTime, paymentMethod, status }} />
            <hr />
            <div className='vendorPopupPictures'>
                <div className="vendorPannelAcceptedAttachBill" onClick={e => billInputRef.current.click()}>
                    <div>
                        <p>Attach</p>
                    </div>
                    <div>
                        <Icon iconColor="rgb(133,133,133)" size='20px'>
                            <ImAttachment />
                        </Icon>
                    </div>
                    <input type='file' ref={billInputRef} onChange={setBillImagePreview} style={{ display: 'none' }} />
                </div>
                {bill && <img src={bill} alt='bill' style={{ maxHeight: '85%', maxWidth: '100%' }} />}
            </div>
            <hr />
            <TotalCostDetails {...{ totalItems, cost }} />
            <hr />
            <CustomerDetails {...{ name, mobileNo, address }} />
            <div className="vendorPopupButtons">
                <button className='whiteButton' onClick={(e) => setShowDeclineTab(true)}>Refund</button>
                <button className='greenButton' onClick={collectButtonHandler} >
                    Collect
                </button>
            </div>
            {
                showDeclineTab
                    ? <DeclineTab {...{ setActiveTabNull, setShowDeclineTab, updateActiveItem, orderNo, cost }} />
                    : null
            }
        </div>
    );
}

export default Collected;