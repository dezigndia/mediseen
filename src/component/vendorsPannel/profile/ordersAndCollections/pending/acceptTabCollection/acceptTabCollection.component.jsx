import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './acceptTabCollection.styles.scss';
import { Switch, FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

//importing reusable components
import InputWithIcon from '../../../../../reusableComponent/InputwithIcon/inputWithIcon.component';

//importing services
import { GET_BULK_TESTS } from '../../../../../../services/services';

const height = window.innerHeight - (window.innerHeight / 100) * 20;

const data = [
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 },
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 },
    { name: 'multi vitamin', pack: 10, mrp: 30, total: 300 }
]

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AcceptTab = ({ setShowAcceptTab, setActiveTabNull, updateActiveItem, products }) => {
    const staff = useSelector(state => state.currentVendor.staffs);
    const auth_token = useSelector(state => state.token);
    const [collectionBoy, setCollectionBoy] = useState(staff[0].name);
    const [testsList, setTestLists] = useState([]);

    useEffect(() => {
        const productId = products.map(item => item.productId);
        axios
            .post(GET_BULK_TESTS, { ids: productId }, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                setTestLists(res.data.payload)
            })
            .catch(err => {
                console.log(err);
                // alert('unable to fetch products list');
            });
    }, [products])

    const handleChange = (event) => {
        setCollectionBoy(event.target.value);
    };

    const classes = useStyles();

    return (
        <div className="vendorPopupPendingAcceptTabCollectionContainer" style={{ '--height': `${height}px` }}>
            <div className="vendorPopupPendingAcceptTabCollection">
                <div>
                    <InputWithIcon />
                </div>
                <div className="vendorPopupPendingAcceptTabItemList">
                    <div className="vendorPopupPendingAcceptTabItemListHeaders">
                        <div>Name</div>
                        <div>Qty</div>
                        <div>Price</div>
                        <div>Total</div>
                    </div>
                    {
                        testsList.map((item, index) => (
                            <div className="vendorPopupPendingAcceptTabItemListItem" key={index}>
                                <div>{item.name}</div>
                                <div>{products[index].qty}</div>
                                <div>
                                    {
                                        item.hasDiscount
                                            ? <>
                                                <strike style={{ color: '#ccc', marginRight: '5px' }}>{item.mrp}</strike>{item.sellingPrice}
                                            </>
                                            : <>item.sellingPrice</>
                                    }
                                </div>
                                <div>{products[index].qty * item.sellingPrice}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='vendorPopupPendingAcceptTabMessage'>
                    <p>All test are possible with you and</p>
                    <p>you are ok with payment</p>
                </div>
                <div className='vendorPopupPendingAcceptTabMessage'>
                    <p>Accept to send Agent for Collection on timing.</p>
                </div>
                <div className='vendorPopupPendingAcceptTabAssignCollectionBoy'>
                    <div>
                        <p>Assign collection agent</p>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Collecion Boy</InputLabel>
                            <Select
                                labelId="assign-collection-boy"
                                id="assign-collect-boy"
                                value={collectionBoy}
                                onChange={handleChange}
                            >
                                {
                                    staff && staff.length && staff.map((item, index) => <MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='vendorPopupPendingAcceptTabCollectionActions'>
                    <button
                        className='whiteButton'
                        onClick={(e) => {
                            setShowAcceptTab(false);
                        }}
                    >
                        No
                        </button>
                    <button
                        className='greenButton'
                        onClick={(e) => {
                            updateActiveItem({ status: 'accepted', assignedCollectionPerson: collectionBoy });
                            setShowAcceptTab(false);
                            setActiveTabNull();//go back to orders page
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AcceptTab;