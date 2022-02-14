import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './setting.styles.scss';

//importing custom components
import SettingHome from './settingHome/settingHome.component';
import AddHospital from './addHospital/addHospital.component';
import ListHospital from './ListHospital/ListHospitals.component';
import PaymentSetting from './paymentSetting/paymentSetting.component';

const Setting = ({ match }) => {
    return (
        <div className="VendorProfilesetting">
            <Switch>
                <Route exact path={`${match.url}/`} component={SettingHome} />
                <Route exact path={`${match.url}/addHospital`} component={AddHospital} />
                <Route exact path={`${match.url}/listHospital`} component={ListHospital} />
                <Route path={`${match.url}/paymentSetting`} component={PaymentSetting} />
                <Redirect to='/404' />
            </Switch>
        </div>
    );
}

export default Setting;