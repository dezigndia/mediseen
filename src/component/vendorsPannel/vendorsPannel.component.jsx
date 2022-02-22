import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory,Router } from 'react-router-dom';
import './vendorsPannel.styles.scss';

//importing routes
import {
    ADD_BUSINESS_INFO,
    REGISTER_AS_DOCTOR,
    REGISTER_AS_HOSPITAL,
    REGISTER_AS_PHARMACY,
    REGISTER_AS_PATHOLOGY
} from './registration/routes';

//importing background imge 
import background from '../../assets/images/background.webp';

//custom component
import VendorsPannelHome from './vendorsPannelHome/vendorsPannelHome.component';
import Registration from './registration/registration.component';
import Vendorsprofile from './profile/vendorsProfile.component';
import Header from './header/header.component';
import Footer from './footer/footer.component';

//importing actions
import { setCurrentVendor, updateAccessToken } from '../../actions/action';

//importing services
import { GET_USER_DEETAIL_BY_TOKEN } from '../../services/services';

const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center'
}

const VendorsPannel = ({ match }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        //checks if user is already logged in
        let currentVendor = localStorage.getItem('currentVendor');
        currentVendor = JSON.parse(currentVendor);
        let token = localStorage.getItem('token');
        if (currentVendor) {
            dispatch(setCurrentVendor(currentVendor));
            axios
                .get(GET_USER_DEETAIL_BY_TOKEN, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    dispatch(setCurrentVendor({ ...res.data.payload, businessType: currentVendor.businessType }));
                    localStorage.setItem('currentVendor', JSON.stringify({ ...res.data.payload, businessType: currentVendor.businessType }));
                    dispatch(updateAccessToken(token));
                })
                .catch(err => {
                    console.log(err);
                    // alert("unable to fetch user info");
                });

            //deciding page to go on if user is verified
            let page = null;
            // console.log(currentVendor.businessType);
            if (currentVendor.businessType === 'doctor') {
                page = REGISTER_AS_DOCTOR;
            }
            else if (currentVendor.businessType === 'hospital') {
                page = REGISTER_AS_HOSPITAL;
            }
            else if (currentVendor.businessType === 'pharmacy') {
                page = REGISTER_AS_PHARMACY;
            }
            else if (currentVendor.businessType === 'pathology') {
                page = REGISTER_AS_PATHOLOGY;
            }

            page && history.push(`vendor/registration/${page}`);
        }
    }, []);

    return (
        <div className="vendorsPannel" style={style}>
            <Header />
            <Router history={history}>
            <Switch>
                <Route exact path={`${match.url}/`} component={VendorsPannelHome} />
                <Route path={`${match.url}/registration`} component={Registration} />
                <Route path={`${match.url}/profile`} component={Vendorsprofile} />
            </Switch>
            </Router>
            <Footer />
        </div>
    );
}

export default VendorsPannel;