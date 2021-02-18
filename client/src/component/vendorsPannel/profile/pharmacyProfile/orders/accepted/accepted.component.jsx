import React from 'react';
import './accepted.styles.scss';

//importing custom components
import CustomerDetails from '../customerDetails/customerDetails.component';
import OrderDetails from '../orderDetails/orderDetails.component';
import TotalCostDetails from '../totalCostDetails/totalCostDetails.component';

const height = window.screen.height - (window.screen.height / 100) * 20;

const Accepted = ({ setActiveTabNull }) => {
    return (
        <div className="acceptedOrders" onClick={setActiveTabNull} style={{ height: `${height}px` }}>
            <OrderDetails />
            <TotalCostDetails />
            <CustomerDetails />
        </div>
    );
}

export default Accepted;