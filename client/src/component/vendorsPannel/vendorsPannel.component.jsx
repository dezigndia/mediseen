import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Route, Switch, Redirect,useHistory } from 'react-router-dom';
import './vendorsPannel.styles.scss';

//importing background imge 
import background from '../../assets/images/background.webp';

//custom component
import VendorsPannelHome from './vendorsPannelHome/vendorsPannelHome.component';
import Registration from './registration/registration.component';
import Vendorsprofile from './profile/vendorsProfile.component';
import Header from './header/header.component';
import Footer from './footer/footer.component';

//importing actions
import {setCurrentVendor,updateAccessToken} from '../../actions/action';

const style = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center'
}

const VendorsPannel = ({ match }) => {

    const dispatch=useDispatch();
    const history=useHistory();

    useEffect(()=>{
        //checks if user is already logged in
        let currentVendor=localStorage.getItem('currentVendor');
        let token=localStorage.getItem('token');
        if(currentVendor){
            dispatch(setCurrentVendor(JSON.parse(currentVendor)));
            dispatch(updateAccessToken(token));
            history.push('vendor/profile/home');
        }
    },[]);

    return (
        <div className="vendorsPannel" style={style}>
            <Header />
            <Switch>
                <Route exact path={`${match.url}/`} component={VendorsPannelHome} />
                <Route path={`${match.url}/registration`} component={Registration} />
                <Route path={`${match.url}/profile`} component={Vendorsprofile} />
                <Redirect to='/404' />
            </Switch>
            <Footer />
        </div>
    );
}

export default VendorsPannel;