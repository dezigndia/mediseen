import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './setting.styles.scss';

//importing custom components
import SettingHome from './settingHome/settingHome.component';
import addDoctor from './addDoctor/addDoctor.component';
import ListDoctor from './ListDoctor/ListDoctors.component';
import EditDoctor from './EditDoctor/doctorAndHospitalRegistrationForm.component'
//importing custom component from registration
import DoctorAndHospitalRegistrationForm from '../../../registration/doctorAndHospitalRegistrationForm/doctorAndHospitalRegistrationForm.component';
import AddStaff from '../../../registration/addStaff/addStaff.component';
import PaymentSetting from '../../../registration/paymentSetting/paymentSetting.component';

const Setting = ({ match }) => {
    return (
        <div className="vendorProfileSetting">
            <Switch>
            <Route exact path={`${match.url}/`} component={SettingHome} />
                <Route exact path={`${match.url}/addDoctor`} component={addDoctor} />
                <Route exact path={`${match.url}/listDoctor`} component={ListDoctor} />
                <Route exact path={`${match.url}/EditDoctor`} component={EditDoctor} />
                {/* <Route path={`${match.url}/addPannel`} component={DoctorAndHospitalRegistrationForm} /> */}
                <Route path={`${match.url}/addStaff`} component={AddStaff} />
                <Route path={`${match.url}/paymentSetting`} component={PaymentSetting} />
                <Redirect to='/404' />
            </Switch>
        </div>
    );
}

export default Setting;