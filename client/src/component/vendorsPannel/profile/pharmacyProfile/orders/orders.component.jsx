import React, { useState, useCallback } from 'react';
import './orders.styles.scss';
import { Switch, FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

//importing jss
import { green } from '../../../../../assets/globalJSS';

//importing reusable components
import Icon from '../../../../reusableComponent/icon/icon.component';

//importing icons
import { FaChartBar } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { MdChevronRight } from 'react-icons/md';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const data = [
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'pending' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'delivered' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'accepted' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'Shipped' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'delivered' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'ONLINE', status: 'cancelled' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'pending' },
    { orderNo: 2047, orderDate: '02/07/21', orderTime: '02:47 AM', totalItems: 10, cost: 200, paymentMethod: 'COD', status: 'pending' }
]

const Orders = () => {
    const classes = useStyles();
    const [status, setStatus] = useState('All');
    const [switchStatus, setSwitchStatus] = useState(true);
    const [showOrderStats, setShowOrderStats] = useState(false);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const toggleSwitch = (e) => {
        setSwitchStatus(prevState => !prevState);
    }

    const toggleOrderStats = useCallback((e) => {
        e.stopPropagation();
        setShowOrderStats(prevState => !prevState);
    }, [setShowOrderStats])

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
                        <p>Todsy's Sale</p>
                        <p>300</p>
                    </div>
                    <div className="totalSale">
                        <p>Total Sale</p>
                        <p>300</p>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'left', position: 'relative', left: '-10px' }}>
                <Switch
                    checked={switchStatus}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox', 'title': 'tun off booking for one day' }}
                    onChange={toggleSwitch}
                />
            </div>
            <div className='vendorsOrderHeader' >
                <div>
                    <Icon iconColor='rgb(133, 133, 133)' onClick={toggleOrderStats}>
                        <FaChartBar />
                    </Icon>
                </div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        onChange={handleChange}
                    >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Pending'}>Pending</MenuItem>
                        <MenuItem value={'Accepted'}>Accepted</MenuItem>
                        <MenuItem value={'Shipped'}>Shipped</MenuItem>
                        <MenuItem value={'Delivered'}>Delivered</MenuItem>
                        <MenuItem value={'Cancelled'}>Cancled</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="vendorsOrdersListContainer">
                {
                    data.map((item, index) => (
                        <div className="orderListItem">
                            <div className="orderNo">
                                Order No.  {item.orderNo}
                            </div>
                            <div className="orderDateTime">
                                <div className="orderDate">
                                    {item.orderDate}
                                </div>
                                <div className="orderTime">
                                    {item.orderTime}
                                </div>
                            </div>
                            <div className="orderTotalItems">
                                <p>Total Items: {item.totalItems}</p>
                            </div>
                            <div className="orderCost">
                                <Icon noRippleEffect size='20px'>
                                    <BiRupee />
                                </Icon>
                                <p>{item.cost}</p>
                            </div>
                            <div className="orderPaymentMethod">
                                {item.paymentMethod}
                            </div>
                            <div className={`orderStatus ${item.status}`}>
                                {item.status}
                            </div>
                            <div className="orderDetails">
                                <p>Details</p>
                                <div>
                                    <Icon>
                                        <MdChevronRight noRippleEffect size='20px' />
                                    </Icon>
                                </div>
                            </div>
                            <div className='horizontalRule' />
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default Orders;