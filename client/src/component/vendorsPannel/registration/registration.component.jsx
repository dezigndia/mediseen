import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './registration.styles.scss';

//custom Component
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import WelcomeOtpScreen from './welcomeOtpScreen/welcomeOtpScreen.component';
import BusinessInfoForm from './businessInfoForm/businessInfoForm.component';
import RegisterAs from './registerAs/registerAs.component';
import RegisterAsDoctor from './registerAsDoctor/registerAsDoctor.component';
import RegisterAsHospital from './registerAsHospital/registerAsHospital.component';
import RegisterAsPharmacy from './registerAsPharmacy/registerAsPharmacy.component';
import RegisterAsPathology from './registerAsPathology/rtegisterAsPathology.component';

//importing Routes
import {
    REGISTER_AS,
    GET_OTP,
    ADD_BUSINESS_INFO,
    REGISTER_AS_DOCTOR,
    REGISTER_AS_HOSPITAL,
    REGISTER_AS_PATHOLOGY,
    REGISTER_AS_PHARMACY
} from './routes';

const Registration = ({ match }) => {
    const [isRegistered, setIsRegistered] = useState(false);
    return (
        <div className="registrationContainer">
            {
                isRegistered
                    ? <>
                        <Header />
                        <Switch>
                            <Route path={`${match.url}/${REGISTER_AS}`} component={RegisterAs} />
                            <Route path={`${match.url}/${REGISTER_AS_DOCTOR}`} component={RegisterAsDoctor} />
                            <Route path={`${match.url}/${REGISTER_AS_HOSPITAL}`} component={RegisterAsHospital} />
                            <Route path={`${match.url}/${REGISTER_AS_PHARMACY}`} component={RegisterAsPharmacy} />
                            <Route path={`${match.url}/${REGISTER_AS_PATHOLOGY}`} component={RegisterAsPathology} />
                        </Switch>
                        <Footer />
                    </>
                    : <Switch>
                        <Route exact path={`${match.url}/`} component={WelcomeOtpScreen} />
                        <Route path={`${match.url}/${ADD_BUSINESS_INFO}`} component={BusinessInfoForm} />
                    </Switch>
            }
        </div>
    );
}

export default Registration;