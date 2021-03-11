import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './ordersAndCollections.styles.scss';
import { Switch, FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

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
import { GET_ORDERS_BY_BUSINESS, UPDATE_ORDER_BY_ID } from '../../../../services/services';

//importing icons
import { FaChartBar } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { MdChevronRight } from 'react-icons/md';

/*const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));*/

const data = [
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'shipped' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'delivered' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'accepted' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'shipped' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'delivered' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'cancelled' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'pending' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'collected' }
]

const Orders = () => {
    //const classes = useStyles();
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState('All');
    const [switchStatus, setSwitchStatus] = useState(false); //toggle switch
    const [showOrderStats, setShowOrderStats] = useState(false);// todays and total sale popup
    const [activeTab, setActiveTab] = useState(null);  //shipped accepted pending collected
    const [activeItem, setActiveItem] = useState(null); // details of the oreders card which is clicked
    const businessType = useSelector(state => state.currentVendor.businessType);
    const auth_token = useSelector(state => state.token);

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
        setSwitchStatus(prevState => !prevState);
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
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                setOrderList(res.data.payload);
            })
            .catch(err => {
                console.log(err);
                alert(`unable to fetch orders`);
            });
    }, []);

    return (
        <div className="vendorsOrders">
            <div className={`orderStatsContainer ${showOrderStats ? null : 'hidden'}`} onClick={toggleOrderStats}>
                <div className="orderStats">
                    <div className="saleIcon">
                        <Icon iconColor={green}>
                            <FaChartBar />
                        </Icon>
                    </div>
                    <div className="todaySale">
                        <p>Today's Sale</p>
                        <p>300</p>
                    </div>
                    <div className="totalSale">
                        <p>Total Sale</p>
                        <p>300</p>
                    </div>
                </div>
            </div>
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
                    </div>
                </div>
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
                </select>
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
                        orderDate={`${(new Date(activeItem.createdAt).getDate())}/${(new Date(activeItem.createdAt).getMonth())}/${(new Date(activeItem.createdAt).getFull() % 100)}`}
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
        </div >
    );
}

export default Orders;