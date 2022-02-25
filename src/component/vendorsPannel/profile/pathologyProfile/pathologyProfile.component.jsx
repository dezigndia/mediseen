import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import './pathologyProfile.styles.scss';

//importing custom components
import Home from './home/home.component';
//import Collection from './collection/collection.component';
import OrderAndCollections from '../ordersAndCollections/ordersAndCollections.component';
import Setting from './setting/setting.component';
import Promotions from './promotions/promotions.component';

const PathologyProfile = ({ match }) => {
    const collectionBoy =JSON.parse(localStorage.getItem("collectionBoy"));
    let path = localStorage.getItem("path")

    if(collectionBoy.role==="Collection Boy"){
        path="collection";
    }

    return (
        <div className="pathologyProfile">
            <Switch>
                <Route exact path={`${match.url}/`} render={({ match }) => <Redirect to={`${match.url}/${path?path:"home"}`} />} />
                <Route path={`${match.url}/home`} component={Home} />
                <Route path={`${match.url}/collection`} component={OrderAndCollections} />
                <Route path={`${match.url}/setting`} component={Setting} />
                <Route path={`${match.url}/promotions`} component={Promotions} />
                <Redirect to={`${match.url}/${path?path:"home"}`} />
            </Switch>
        </div>
    );
}

export default withRouter(PathologyProfile);