import React from 'react';

//importing custom components
import VendorQR from '../../vendorQR/vendorQR.component';

const Delivered = ({ setShowDeliverTab, setActiveTabNull, updateActiveItem, cost }) => <VendorQR showVendorQRTab={setShowDeliverTab} goBackToOrdersPage={setActiveTabNull} cost={cost} updateActiveItem={updateActiveItem} />

export default Delivered;