import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './pending.styles.scss';

//importing custom components
import CustomerDetails from '../customerDetails/customerDetails.component';
import OrderDetails from '../orderDetails/orderDetails.component';
import TotalCostDetails from '../totalCostDetails/totalCostDetails.component';
import AcceptTabDelivery from './acceptTabDelivery/acceptTabDelivery.component';
import AcceptTabCollection from './acceptTabCollection/acceptTabCollection.component';
import DeclineTab from '../declineTab/declineTab.component';

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const Pending = ({ setActiveTabNull, orderNo, orderDate, orderTime, paymentMethod, status, totalItems, cost, name, mobileNo, address, updateActiveItem, products, image }) => {
    const [showAcceptTab, setShowAcceptTab] = useState(false);
    const [showDeclineTab, setShowDeclineTab] = useState(false);
    const businessType = useSelector(state => state.currentVendor.businessType);

    return (
        <div className="pendingOrders" style={{ '--height': `${height}px` }}>
            <OrderDetails {...{ orderNo, orderDate, orderTime, paymentMethod, status }} />
            <hr />
            <div className='vendorPopupInvoice'>
                {image
                    ? <img src={image} alt='bill/invoice' />
                    : <p style={{ color: '#ccc' }}>No prescription image provided</p>
                }
            </div>
            <hr />
            <TotalCostDetails {...{ totalItems, cost }} />
            <hr />
            <CustomerDetails {...{ name, mobileNo, address }} />
            <div className="vendorPopupButtons">
                <button className='whiteButton' onClick={(e) => setShowDeclineTab(true)}>Decline</button>
                <button className='greenButton' onClick={(e) => setShowAcceptTab(true)}>Accept</button>
            </div>
            {
                showAcceptTab && businessType === 'pharmacy'
                    ? <AcceptTabDelivery {...{ setShowAcceptTab, setActiveTabNull, updateActiveItem, products }} />
                    : null
            }
            {
                showAcceptTab && businessType === 'pathology'
                    ? <AcceptTabCollection {...{ setShowAcceptTab, setActiveTabNull, updateActiveItem, products }} />
                    : null
            }
            {
                showDeclineTab
                    ? <DeclineTab {...{ setShowDeclineTab, setActiveTabNull, orderNo, cost, updateActiveItem, name, mobileNo, address }} />
                    : null
            }
        </div>
    );
}

export default Pending;