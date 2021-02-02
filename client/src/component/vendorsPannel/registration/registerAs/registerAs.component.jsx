import React from 'react';
import './registerAs.styles.scss';

//importing routes
import {
    REGISTER_AS_DOCTOR,
    REGISTER_AS_HOSPITAL,
    REGISTER_AS_PATHOLOGY,
    REGISTER_AS_PHARMACY
} from '../routes';


const RegisterAs = ({ history, match }) => {
    const GotoPage = (page) => {
        let link = match.url.split('/');
        link.pop();
        link.push(page);
        link = link.join('/');
        console.log(link);
        history.push(link);
    }
    return (
        <div className="registerAs">
            <div className="registration">
                <div className="registerAsHeader">
                    Register As
                </div>
                <div className="registerAsButtons">
                    <div className="registerAsButton" onClick={(e) => GotoPage(REGISTER_AS_DOCTOR)}>
                        <div className="circle"></div>
                        <div className="buttonLabel" >Doctor</div>
                    </div>
                    <div className="registerAsButton" onClick={(e) => GotoPage(REGISTER_AS_HOSPITAL)}>
                        <div className="circle"></div>
                        <div className="buttonLabel" >Hospital</div>
                    </div>
                    <div className="registerAsButton" onClick={(e) => GotoPage(REGISTER_AS_PHARMACY)}>
                        <div className="circle"></div>
                        <div className="buttonLabel" >Pharmacy</div>
                    </div>
                    <div className="registerAsButton" onClick={(e) => GotoPage(REGISTER_AS_PATHOLOGY)}>
                        <div className="circle"></div>
                        <div className="buttonLabel" >Pathology</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterAs;