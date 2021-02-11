import React from 'react';
import './setPatient.styles.scss';

//importing reusable components
import InputWithIcon from '../../../../reusableComponent/InputwithIcon/inputWithIcon.component';
import Icon from '../../../../reusableComponent/icon/icon.component';

//importing icon
import { FiPlus } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

const SetPatient = ({ changeTab, goToSetHospitalOrDoctor }) => {
    return (
        <div className="setPatient">
            <div className="setPatientForm">
                <div className="setPatientFormHeader">
                    <div>
                        <label htmlFor="search Patient">Search Patient</label>
                        <InputWithIcon />
                    </div>
                    <div>
                        <Icon>
                            <FiPlus />
                        </Icon>
                        <p>
                            Add Patient
                    </p>
                    </div>
                </div>
                <div className="searchPatient">
                    <div className="editPatient">
                        <p>
                            Edit Patient
                        </p>
                        <Icon>
                            <MdModeEdit />
                        </Icon>
                    </div>
                </div>
            </div>
            <div className="setPatientsAction">
                <button onClick={goToSetHospitalOrDoctor}>Back</button>
                <button onClick={changeTab}>Book</button>
            </div>
        </div>
    );
}

export default SetPatient;