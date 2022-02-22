import React from 'react';
import { Route, Switch, Redirect, useHistory,Router} from 'react-router-dom';
import './setting.styles.scss';

//importing custom components
import SettingHome from './settingHome/settingHome.component';
import AddHospital from './addHospital/addHospital.component';
import ListHospital from './ListHospital/ListHospitals.component';
import PaymentSetting from './paymentSetting/paymentSetting.component';
import  EditHospital from './EditHospital/doctorAndHospitalRegistrationForm.component'

const Setting = ({ match }) => {
    const history = useHistory();
    const path= localStorage.getItem("path");

    return (
        <div className="VendorProfilesetting">
       	<Router history={history}>
            <Switch>
                <Route exact path={`${match.url}/`} component={SettingHome} />
                <Route exact path={`${match.url}/addHospital`} component={AddHospital} />
                <Route exact path={`${match.url}/listHospital`} component={ListHospital} />
                <Route exact path={`${match.url}/editHospital`} component={EditHospital} />
                <Route path={`${match.url}/paymentSetting`} component={PaymentSetting} />
                <Redirect to={`${match.url}/${path}`}/>
            </Switch>
            </Router>
        </div>
    );
}

export default Setting;