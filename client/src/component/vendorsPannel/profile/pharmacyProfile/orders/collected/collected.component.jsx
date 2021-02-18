import React from 'react';
import './collected.styles.scss';

//importing custom components
import CustomerDetails from '../customerDetails/customerDetails.component';
import OrderDetails from '../orderDetails/orderDetails.component';
import TotalCostDetails from '../totalCostDetails/totalCostDetails.component';

const height = window.screen.height - (window.screen.height / 100) * 20;

const Collected = ({ setActiveTabNull }) => {
    return (
        <div className="collectedOrders" onClick={setActiveTabNull} style={{ height: `${height}px` }}>
            <OrderDetails />
            <TotalCostDetails />
            <CustomerDetails />
        </div>
    );
}

export default Collected;