import React, { useState,useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//importing custom component
import LandingPage from './landingPage/landingPage.component';
import CameraAndGallery from './cameraAndGallery/cameraAndGallery.component';
import Camera from './cameraAndGallery/cameraAndGallery.component';
import PrescriptionConfirm from './PrescriptionConfirm.component'
import PlaceOrder from '../uploadPrescription/PlaceOrder'
import Success from '../uploadPrescription/Success'
import { useDispatch } from "react-redux"

import EditAndAddNotes from './editAndAddNotes/editAndAddNotes.component';

const UploadPrescription = ({ match }) => {
    const [image, selectImage] = useState(null);
    const [notes, setNotes] = useState(null);
    const [tags, settags] = useState(null);
   // dxfd
   const dispatch = useDispatch()
   useEffect(() => {
    dispatch({ type: "SET_PRES_IMAGE", payload: image })
}, [image])

    if (image === null) {
        return (
            <Switch>
                <Route exact path={`${match.url}/`} component={LandingPage} />
                <Route exact path={`${match.url}/confirm`} component={PrescriptionConfirm} />
                <Route exact path={`${match.url}/order-place/:type/:id`} component={PlaceOrder} />
                <Route exact path={`${match.url}/success/:orderId`} component={Success} />
                <Route path={`${match.url}/camera`} render={() => <Camera selectImage={selectImage} />} />
                <Route path={`${match.url}/gallery`} render={() => <CameraAndGallery selectImage={selectImage} />} />
                {/* <Redirect to='/404' /> */}
            </Switch>
        );
    }
    else {
        return (
            <Switch>
                <Route exact path={`${match.url}/`} render={() => <EditAndAddNotes {...{ image, selectImage }} />} />
            </Switch>
        );
    }

}

export default UploadPrescription