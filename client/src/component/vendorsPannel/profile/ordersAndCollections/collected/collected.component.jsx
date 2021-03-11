import React, { useState } from 'react';
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

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const Collected = ({ setActiveTabNull, orderNo, orderDate, orderTime, paymentMethod, status, totalItems, cost, name, mobileNo, address, updateActiveItem }) => {
    const [showDeclineTab, setShowDeclineTab] = useState(false);
    return (
        <div className="collectedOrders" style={{ '--height': `${height}px` }}>
            <OrderDetails {...{ orderNo, orderDate, orderTime, paymentMethod, status }} />
            <hr />
            <div className='vendorPopupPictures'>
                <div className="vendorPannelAcceptedAttachBill">
                    <div>
                        <p>Attach</p>
                    </div>
                    <div>
                        <Icon iconColor="rgb(133,133,133)" size='20px'>
                            <ImAttachment />
                        </Icon>
                    </div>
                </div>
            </div>
            <hr />
            <TotalCostDetails {...{ totalItems, cost }} />
            <hr />
            <CustomerDetails {...{ name, mobileNo, address }} />
            <div className="vendorPopupButtons">
                <button className='whiteButton' onClick={(e) => setShowDeclineTab(true)}>Refund</button>
                <button className='greenButton' onClick={(e) => {
                    updateActiveItem({ status: 'collected' })
                    setActiveTabNull()
                }}>
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