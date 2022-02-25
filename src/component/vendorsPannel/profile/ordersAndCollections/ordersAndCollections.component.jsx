import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import './ordersAndCollections.styles.scss';
import { Switch } from '@material-ui/core';

//importing custom components
import Accepted from './accepted/accepted.component';
import Pending from './pending/pending.component';
import Shipped from './shipped/shipped.component';
import Collected from './collected/collected.component';

//importing jss
import { green } from '../../../../assets/globalJSS';

//importing reusable components
import Icon from '../../../reusableComponent/icon/icon.component';

//importing services
import { GET_ORDERS_BY_BUSINESS, UPDATE_ORDER_BY_ID, UPDATE_REGISTERED_USER, GET_SALES_DETAILS } from '../../../../services/services';

//importing actions
import { setCurrentVendor } from '../../../../actions/action';

//importing icons
import { FaChartBar } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { MdChevronRight } from 'react-icons/md';


const Orders = () => {
    //const classes = useStyles();
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState('All');
    const [showOrderStats, setShowOrderStats] = useState(false);// todays and total sale popup
    const [activeTab, setActiveTab] = useState(null);  //shipped accepted pending collected
    const [activeItem, setActiveItem] = useState(null); // details of the oreders card which is clicked
    const businessType = useSelector(state => state.currentVendor.businessType);
    const currentVendor = useSelector(state => state.currentVendor);
    const [switchStatus, setSwitchStatus] = useState(currentVendor.isActive); //toggle switch
    const [salesDetails, setSalesDetails] = useState({ todays: 0, total: 0 });
    const auth_token = useSelector(state => state.token);
    const collectionBoy=JSON.parse(localStorage.getItem("collectionBoy"));
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const updateActiveItem = (updateObject) => {
        axios
            .put(UPDATE_ORDER_BY_ID(activeItem._id), updateObject, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                setOrderList(prevState => {
                    let arr = [...prevState];
                    Object.keys(updateObject).forEach(item => {
                        arr[activeItem.index][item] = updateObject[item];
                    });
                    //arr[activeItem.index].status = updateObject.status;
                    return [...arr];
                })
            })
            .catch(err => {
                console.log(err);
                alert("unable to accept order");
            });

    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const toggleSwitch = (e) => {
        axios
            .put(UPDATE_REGISTERED_USER, { isActive: !switchStatus }, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                console.log(res.data);
                dispatch(setCurrentVendor({ isActive: !currentVendor.isActive }));
                setSwitchStatus(prevState => !prevState);
            })
            .catch(err => {
                console.log(err);
                alert('cant set status');
            })
    }

    const toggleOrderStats = useCallback((e) => {
        e.stopPropagation();
        setShowOrderStats(prevState => !prevState);
    }, [setShowOrderStats]);

    const setActiveTabNull = useCallback((e) => {
        setActiveTab(null);
    }, [setActiveTab]);

    useEffect(() => {
        axios
            .get(GET_ORDERS_BY_BUSINESS, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken ? auth_token.accessToken: token}`
                }
            })
            .then(res => {
              if(collectionBoy.role==="Collection Boy" || collectionBoy.role==="Delivery Boy"){
                  console.log(res.data.payload)
                  setOrderList(res.data.payload.filter((item)=>(item.assignedCollectionPerson===(collectionBoy.collectonBoyName && item.status==="accepted")|| (collectionBoy.collectonBoyName && item.status==="shipped"))))
              }else{
                setOrderList(res.data.payload);
              }
            })
            .catch(err => {
                console.log(err);
                alert(`unable to fetch orders`);
            });
        let phoneNumber = currentVendor.phoneNumber !== '' ? currentVendor.phoneNumber : currentVendor.phone;

        axios
            .get(GET_SALES_DETAILS(`%2B${phoneNumber.substring(1)}`), {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken ? auth_token.accessToken: token}`
                }
            })
            .then(res => {
                setSalesDetails({ todays: res.data.payload.todaysSales, total: res.data.payload.totalSales });
            })
            .catch(err => {
                console.log(err);
                alert('cant fetch salse details');
            })

    }, [auth_token]);

    return (
        <div className="vendorsOrders">
            {(collectionBoy.role!="Collection Boy") || (collectionBoy.role!="Delivery Boy") ?
            <div className={`orderStatsContainer ${showOrderStats ? null : 'hidden'}`} onClick={toggleOrderStats}>
                <div className="orderStats">
                    <div className="saleIcon">
                        <Icon iconColor={green}>
                            <FaChartBar />
                        </Icon>
                    </div>
                    <div className="todaySale">
                        <p>Today's Sale</p>
                        <p>{salesDetails.todays}</p>
                    </div>
                    <div className="totalSale">
                        <p>Total Sale</p>
                        <p>{salesDetails.total}</p>
                    </div>
                </div>
            </div>:null}
            {/*<div style={{ textAlign: 'left', position: 'relative', left: '-10px' }}>
                <Switch
                    checked={switchStatus}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox', 'title': 'tun off booking for one day' }}
                    onChange={toggleSwitch}
                    color='black'
                />
                </div>*/}
            <div className='vendorsOrderHeader' >
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '5px' }}>
                {collectionBoy.role==="Collection Boy" || collectionBoy.role==="Delivery Boy" ?
                null:<>
                    <Switch
                        checked={switchStatus}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox', 'title': 'tun off booking for one day' }}
                        onChange={toggleSwitch}
                    />
                    <div>
                        <Icon iconColor='rgb(133, 133, 133)' onClick={toggleOrderStats}>
                            <FaChartBar />
                        </Icon>
                    </div></>}
                </div>
                {collectionBoy.role==="Collection Boy" || collectionBoy.role==="Delivery Boy" ?
                null:
                <select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    onChange={handleChange}
                >
                    <option value={'All'}>All</option>
                    <option value={'Pending'}>Pending</option>
                    <option value={'Accepted'}>Accepted</option>
                    <option value={'Shipped'}>Shipped</option>
                    {
                        businessType === 'pharmacy'
                            ? <option value={'Delivered'}>Delivered</option>
                            : null
                    }
                    {
                        businessType === 'pathology'
                            ? <option value={'Collected'}>Collected</option>
                            : null
                    }
                    <option value={'Cancelled'}>Cancled</option>
                </select>}
            </div>
            <div className="vendorsOrdersListContainer">
                {
                    orderList.length > 0
                        ? orderList
                            .filter(item => (status.toLowerCase() === 'all' || item.status.toLowerCase() === status.toLowerCase()) ? true : false)
                            .map((item, index) => {
                                let date = new Date(item.createdAt);
                                return (
                                    <div className="orderListItem" key={index} onClick={(e) => { setActiveItem({ ...item, index }); setActiveTab(item.status); }}>
                                        <div className="orderNo">
                                            Order No.  {item.orderId}
                                        </div>
                                        <div className="orderDateTime">
                                            <div className="orderDate">
                                                {date.getDate()}/
                                        {date.getMonth()}/
                                        {date.getFullYear() % 100}
                                            </div>
                                            <div className="orderTime">
                                                {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                            </div>
                                        </div>
                                        <div className="orderTotalItems">
                                            <p>Total Items: {item.products && item.products.reduce((a, b) => a + b.qty, 0)}</p>
                                        </div>
                                        <div className="orderCost">
                                            <Icon noRippleEffect size='20px'>
                                                <BiRupee />
                                            </Icon>
                                            <p>{item.grandTotal}</p>
                                        </div>
                                        <div className="orderPaymentMethod">
                                            {item.address && item.address.payment}
                                        </div>
                                        <div className={`orderStatus ${item.status}`}>
                                            {item.status}
                                        </div>
                                        <div className="orderDetails">
                                            <p>Details</p>
                                            <div>
                                                <Icon noRippleEffect>
                                                    <MdChevronRight size='20px' />
                                                </Icon>
                                            </div>
                                        </div>
                                        <div className='horizontalRule' />
                                    </div>
                                )
                            })
                        : <p
                            style={{
                                border: '1px solid #ccc',
                                padding: '20px',
                                width: '300px',
                                'font-weight': 'bold',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                'font-size': '2em',
                                color: 'rgba(0,0,0,.6)'
                            }}>
                            No Orders
                        </p>
                }
            </div>
            {
                (activeTab === 'shipped' || activeTab === 'Shipped') && businessType === 'pharmacy'
                    ? <Shipped
                        setActiveTabNull={setActiveTabNull}
                        {...activeItem}
                        orderNo={activeItem.orderId}
                        orderDate={`${(new Date(activeItem.createdAt).getDate())}/${(new Date(activeItem.createdAt).getMonth())}/${(new Date(activeItem.createdAt).getFullYear() % 100)}`}
                        orderTime={(new Date(activeItem.createdAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        paymentMethod={activeItem.address && activeItem.address.payment}
                        status={activeItem.status}
                        totalItems={activeItem.products && activeItem.products.reduce((a, b) => a + b.qty, 0)}
                        cost={activeItem.grandTotal}
                        mobileNo={activeItem.userPhoneNumber}
                        name={activeItem.patientName}
                        address={activeItem.address}
                        updateActiveItem={updateActiveItem}
                        products={activeItem.products}
                        image={activeItem.image_url}
                        bill={activeItem.bill}
                    />
                    : null
            }
            {
                activeTab === 'accepted' || activeTab === 'Accepted'
                    ? <Accepted
                        setActiveTabNull={setActiveTabNull}
                        {...activeItem}
                        orderNo={activeItem.orderId}
                        orderDate={`${(new Date(activeItem.createdAt).getDate())}/${(new Date(activeItem.createdAt).getMonth())}/${(new Date(activeItem.createdAt).getFullYear() % 100)}`}
                        orderTime={(new Date(activeItem.createdAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        paymentMethod={activeItem.address && activeItem.address.payment}
                        status={activeItem.status}
                        totalItems={activeItem.products && activeItem.products.reduce((a, b) => a + b.qty, 0)}
                        cost={activeItem.grandTotal}
                        mobileNo={activeItem.userPhoneNumber}
                        name={activeItem.patientName}
                        address={activeItem.address}
                        updateActiveItem={updateActiveItem}
                        products={activeItem.products}
                        image={activeItem.image_url}
                        bill={activeItem.bill}
                    />
                    : null
            }
            {
                activeTab === 'pending' || activeTab === 'Pending'
                    ? <Pending
                        setActiveTabNull={setActiveTabNull}
                        {...activeItem}
                        orderNo={activeItem.orderId}
                        orderDate={`${(new Date(activeItem.createdAt).getDate())}/${(new Date(activeItem.createdAt).getMonth())}/${(new Date(activeItem.createdAt).getFullYear() % 100)}`}
                        orderTime={(new Date(activeItem.createdAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        paymentMethod={activeItem.address && activeItem.address.payment}
                        status={activeItem.status}
                        totalItems={activeItem.products && activeItem.products.reduce((a, b) => a + b.qty, 0)}
                        cost={activeItem.grandTotal}
                        mobileNo={activeItem.userPhoneNumber}
                        name={activeItem.patientName}
                        address={activeItem.address}
                        updateActiveItem={updateActiveItem}
                        products={activeItem.products}
                        image={activeItem.image_url}
                        bill={activeItem.bill}
                    />
                    : null
            }
            {
                (activeTab === 'collected' || activeTab === 'Collected') && businessType === 'pathology'
                    ? <Collected
                        setActiveTabNull={setActiveTabNull}
                        {...activeItem}
                        orderNo={activeItem.orderId}
                        orderDate={`${(new Date(activeItem.createdAt).getDate())}/${(new Date(activeItem.createdAt).getMonth())}/${(new Date(activeItem.createdAt).getFullYear() % 100)}`}
                        orderTime={(new Date(activeItem.createdAt)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        paymentMethod={activeItem.address && activeItem.address.payment}
                        status={activeItem.status}
                        totalItems={activeItem.products && activeItem.products.reduce((a, b) => a + b.qty, 0)}
                        cost={activeItem.grandTotal}
                        mobileNo={activeItem.userPhoneNumber}
                        name={activeItem.patientName}
                        address={activeItem.address}
                        updateActiveItem={updateActiveItem}
                        products={activeItem.products}
                        image={activeItem.image_url}
                        bill={activeItem.bill}
                    />
                    : null
            }
        </div>
    );
}

export default Orders;