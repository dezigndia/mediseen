import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './accepted.styles.scss';

//importing services
import { GET_BULK_PRODUCTS, GET_BULK_TESTS } from '../../../../../services/services';

//importing custom components
import CustomerDetails from '../customerDetails/customerDetails.component';
import OrderDetails from '../orderDetails/orderDetails.component';
import TotalCostDetails from '../totalCostDetails/totalCostDetails.component';
import DeclineTab from '../declineTab/declineTab.component';
import Delivery from './delivery/delivery.component';
import Collection from './collection/collection.component';

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const data = [
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 },
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 },
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 },
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 },
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 }
]

const Accepted = ({ setActiveTabNull, orderNo, orderDate, orderTime, paymentMethod, status, totalItems, cost, name, mobileNo, address, updateActiveItem, products }) => {
    const [showDeliverCollectionTab, setShowDeliverCollectionTab] = useState(false);
    const [showDeclineTab, setShowDeclineTab] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const businessType = useSelector(state => state.currentVendor.businessType);
    const auth_token = useSelector(state => state.token);

    useEffect(() => {
        let productsId = products.map(item => item.productId);
        const link = businessType === 'pharmacy' ? GET_BULK_PRODUCTS : GET_BULK_TESTS;
        axios
            .post(link, { ids: productsId }, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                console.log(res.data);
                setProductsList(res.data.payload);
            })
            .catch(err => {
                console.log(err);
                // alert('unable to fetch product lists');
            })
    }, [products]);

    return (
        <div className="acceptedOrders" style={{ '--height': `${height}px` }}>
            <OrderDetails {...{ orderNo, orderDate, orderTime, paymentMethod, status }} />
            <hr />
            <div className="vendorPopupItemList">
                <div className="vendorPopupItemListHeaders">
                    <div>Name</div>
                    <div>qty</div>
                    <div>price</div>
                    <div>Total</div>
                </div>
                {
                    productsList.map((item, index) => (
                        <div className="vendorPopupItemListItem" key={index}>
                            <div>{item.name}</div>
                            <div>{products[index].qty}</div>
                            <div>
                                <strike style={{ color: '#ccc', marginRight: '5px' }}>{item.mrp}</strike>
                                {item.sellingPrice}
                            </div>
                            <div>{item.sellingPrice * products[index].qty}</div>
                        </div>
                    ))
                }
            </div>
            <hr />
            <TotalCostDetails {...{ totalItems, cost }} />
            <hr />
            <CustomerDetails {...{ name, mobileNo, address }} />
            <div className="vendorPopupAcceptedActions">
                <button className='whiteButton' onClick={(e) => setShowDeclineTab(true)}>Decline</button>
                <button className='greenButton' onClick={(e) => setShowDeliverCollectionTab(true)}>
                    {businessType === 'pharmacy' ? 'Deliver Now' : null}
                    {businessType === 'pathology' ? 'Collect Now' : null}
                </button>
            </div>
            {
                showDeclineTab
                    ? <DeclineTab {...{ setShowDeclineTab, setActiveTabNull, orderNo, cost, updateActiveItem, name, mobileNo, address }} />
                    : null
            }
            {
                showDeliverCollectionTab && businessType === 'pharmacy'
                    ? <Delivery {...{ setShowDeliverCollectionTab, setActiveTabNull, updateActiveItem, cost }} />
                    : null
            }
            {
                showDeliverCollectionTab && businessType === 'pathology'
                    ? <Collection {...{ setShowDeliverCollectionTab, setActiveTabNull, updateActiveItem, cost }} />
                    : null
            }
        </div>
    );
}

export default Accepted;