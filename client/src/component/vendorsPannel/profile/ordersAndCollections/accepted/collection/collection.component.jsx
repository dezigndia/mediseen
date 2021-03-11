import React from 'react';


import VendorQR from '../../vendorQR/vendorQR.component';

const Collection = ({ setShowDeliverCollectionTab, setActiveTabNull, updateActiveItem, cost }) => <VendorQR showVendorQRTab={setShowDeliverCollectionTab} goBackToOrdersPage={setActiveTabNull} cost={cost} updateActiveItem={updateActiveItem} />

export default Collection;

