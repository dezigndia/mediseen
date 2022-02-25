import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory , withRouter} from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Badge, Tooltip} from "@material-ui/core";
import './header.styles.scss';

//importing icon
import { AiOutlineCamera } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';

//reusable Components
import Icon from '../../reusableComponent/icon/icon.component';

//importing custom components
import Notification from './notification/notification.component';

//importing services
import { UPLOAD_FILE, UPDATE_REGISTERED_USER,GET_ALL_PADDING_REQUEST } from '../../../services/services';

//importing actions
import { setCurrentVendor } from '../../../actions/action';

const Header = ({ location, props }) => {
    const [isHidden, setIsHidden] = useState(true);
    const currentVendor = useSelector(state => state.currentVendor);
    const photo = useSelector(state => state.currentVendor.photo);
    const auth_token = useSelector(state => state.token);
    const collectionBoy=JSON.parse(localStorage.getItem("collectionBoy"));
    var aValue = localStorage.getItem("token");
    const addSignBoardref = useRef(null);
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (location.pathname.includes('/profile') || (location.pathname.includes('registerAs') && location.pathname !== '/vendor/registerAs')) {
            setIsHidden(false);
        }
        else if (isHidden) {
            setIsHidden(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        let searchBusinessType = currentVendor.businessType === 'doctor' ? 'hospital' : 'doctor';
        axios
            // .get(GET_ALL_PADDING_REQUEST({
            // headers: {
            //     'Authorization': `Bearer ${auth_token.accessToken}`
            // })
            .get(GET_ALL_PADDING_REQUEST, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken?auth_token.accessToken:aValue}`
                }
            })
            .then(res => {
                setUserInfo(res.data.payload);
            })
            .catch(err => {
                console.log(err);
                // alert('cant fetch user info');
            });
    }, [auth_token])

    const addSignBoardHandler = (e) => {
        let formData = new FormData();
        formData.append('file', e.target.files[0]);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        axios
            .post(UPLOAD_FILE, formData, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`,
                    'Content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                axios
                    .put(UPDATE_REGISTERED_USER, { photo: response.data.payload.location }, {
                        headers: {
                            'Authorization': `Bearer ${auth_token.accessToken}`,
                        }
                    })
                    .then(res => {
                        console.log(res.data);
                        dispatch(setCurrentVendor({ ...currentVendor, photo: response.data.payload.location }));
                    })
                    .catch(err => {
                        console.log(err);
                        alert('image uploaded but unable to update user')
                    })
            })
            .catch(err => {
                console.log(err);
                alert('unable to upload image');
            });
    }

    const logout = () => {
            localStorage.removeItem('currentVendor');
            localStorage.removeItem('token');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('path');
            localStorage.removeItem('collectionBoy');
            history.push('/');
    }
      
    
    return (
        <div className={`vendorsPannelHeader ${isHidden ? 'hidden' : null}`}>
            <Tooltip title="Profile">
                <div className="addSignBoard" onClick={(e) => addSignBoardref.current.click()}>
                    <div className="addSignBoardIcon">
                        {
                            photo
                                ? <img src={photo} />
                                : <Icon size='30px' iconColor='white'><AiOutlineCamera /></Icon>
                        }
                    </div>
                    {!photo && <p>Add sign board</p>}
                    <input
                        type='file'
                        accept='image/x-png,image/gif,image/jpeg'
                        style={{ display: 'none' }}
                        ref={addSignBoardref}
                        onChange={addSignBoardHandler}
                    />
                </div>
            </Tooltip>

            <div className="vendorsName">
                {currentVendor.businessName}
            </div>

            {collectionBoy!=null ?
             <>
{collectionBoy!=null && (collectionBoy.role ==="Collection Boy") || (collectionBoy.role ==="Delivery Boy") ?
            null:<Tooltip title="Notifications">
                    <Notification color="action" />
            </Tooltip>}
            </>:null}
            <Tooltip title="Logout">
                <div onClick={() => logout()} style={{marginRight:"10px", marginLeft:"35px", display: "flex", cursor: "pointer"}}>
                    <LogoutOutlinedIcon />
                </div>
            </Tooltip>
        </div>
    );
}

export default withRouter(Header);
