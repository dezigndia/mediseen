import React from 'react';
import { Switch, Route, Redirect, withRouter ,Router,useHistory} from 'react-router-dom';
import './doctorProfile.styles.scss';

//importing custom components
import Home from './home/home.component';
import Appointment from './appointment/appointment.component';
import Setting from './setting/setting.component';
import Promotions from './promotions/promotions.component';

const DoctorProfile = ({ match }) => {
	const history = useHistory();
   const path= localStorage.getItem("path");
    return (
        <div className="doctorProfile">
        	<Router history={history}>
            <Switch>
                <Route exact path={`${match.url}/`} render={({ match }) =>   path ? <Redirect to={`${match.url}/${path}`} />: <Redirect to={`${match.url}/home`} />} />
                <Route path={`${match.url}/home`} component={Home} />
                <Route path={`${match.url}/appointments`} component={Appointment} />
                <Route path={`${match.url}/setting`} component={Setting} />
                <Route path={`${match.url}/promotions`} component={Promotions} />
                {/* <Redirect to={`${match.url}/home`} /> */}
                <Redirect to={`${match.url}/${path}`} />
            </Switch>
            </Router>
        </div>
    );
}

export default withRouter(DoctorProfile);