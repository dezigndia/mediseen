import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './delivery.styles.scss';
import { FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

//importing reusable components
import Icon from '../../../../../reusableComponent/icon/icon.component';

//importing icon
import { ImAttachment } from 'react-icons/im';

//importing services
import { UPLOAD_FILE } from '../../../../../../services/services';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const Delivery = ({ setShowDeliverCollectionTab, setActiveTabNull, updateActiveItem, cost }) => {
    const staff = useSelector(state => state.currentVendor.staffs);
    const [deliveryBoy, setDeliveryBoy] = useState(staff && staff.length && staff[0].name);
    const businessType = useSelector(state => state.currentVendor.businessType);
    const deliveryDetails = useSelector(state => state.currentVendor.deliveryDetails);
    const auth_token = useSelector(state => state.token);
    const [bill, setBill] = useState(null);
    const attachBillInputRef = useRef();

    const handleChange = (event) => {
        setDeliveryBoy(event.target.value);
    };

    const setBillImage = (e) => {
        let reader = new FileReader();
        reader.onload = event => setBill(event.target.result);
        reader.readAsDataURL(e.target.files[0]);
    }

    const yesButtonHandler = (e) => {
        let formData = new FormData();
        formData.append('file', attachBillInputRef.current.files[0]);

        if (typeof attachBillInputRef.current.files[0] !== 'undefined') {
            axios
                .post(UPLOAD_FILE, formData, {
                    headers: {
                        'Authorization': `Bearer ${auth_token.accessToken}`
                    }
                })
                .then(res => {
                    updateActiveItem({ status: 'shipped', bill: res.data.payload.location, assignedDeliveryPerson: deliveryBoy });
                    setShowDeliverCollectionTab(false);
                    setActiveTabNull();//go back to orders page
                })
                .catch(err => {
                    console.log(err);
                    alert("can't upload bill");
                });
        }
        else {
            updateActiveItem({ status: 'shipped', assignedDeliveryPerson: deliveryBoy });
            setShowDeliverCollectionTab(false);
            setActiveTabNull();//go back to orders page
        }
    }

    const classes = useStyles();

    return (
        <div className="vendorPopupAcceptedDeliveryContainer" style={{ '--height': `${height}px` }}>
            <div className="vendorPopupAcceptedDelivery">
                <div className="vendorPopupAcceptedDeliveryHeader">
                    <p>You are done with packing and are ready to deliver</p>
                </div>
                <div className='vendorPopupAcceptedDeliveryBoyAssignment'>
                    <div>
                        <p>
                            Assign
                            {
                                businessType === 'pathology'
                                    ? <> collecion </>
                                    : <> delivery </>
                            }
                            agent
                        </p>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-Deliver-label">
                                {
                                    businessType === 'pathology'
                                        ? <>Collecion Boy</>
                                        : <>Delivery Boy</>
                                }
                            </InputLabel>
                            <Select
                                labelId="assign-delivery-boy"
                                id="assign-delivery-boy"
                                value={deliveryBoy}
                                onChange={handleChange}
                            >
                                {
                                    staff && staff.length && staff.map((item, index) => <MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="vendorPannelAcceptedAttachBill" onClick={e => attachBillInputRef.current.click()}>
                    <div>
                        <p>Attach Bill</p>
                    </div>
                    <div>
                        <Icon iconColor="rgb(133,133,133)" size='20px'>
                            <ImAttachment />
                        </Icon>
                    </div>
                    <input type='file' style={{ display: 'none' }} ref={attachBillInputRef} onChange={setBillImage} />
                </div>
                <div className="vendorPannelAcceptedAttachBillImage">
                    {bill && <img src={bill} alt='bill' />}
                </div>
                <div className="vendorPannelAcceptedTotalCost">
                    <div>
                        <p>Grand total:</p>
                    </div>
                    <div>
                        {cost + (deliveryDetails && deliveryDetails.deliveryCharges)}
                    </div>
                </div>
                <div className="vendorPopupAcceptedDeliveryActions">
                    <button
                        className='whiteButton'
                        onClick={(e) => {
                            setShowDeliverCollectionTab(false);
                        }}
                    >
                        No
                    </button>
                    <button
                        className='greenButton'
                        onClick={yesButtonHandler}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Delivery;

