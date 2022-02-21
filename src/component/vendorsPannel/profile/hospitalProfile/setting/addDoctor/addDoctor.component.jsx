import React from 'react';
import './addDoctor.styles.scss';

//importing custom component from doctors registration
import DoctorAndHospitalRegistrationForm from '../../../../registration/doctorAndHospitalRegistrationForm/doctorAndHospitalRegistrationForm.component';

const AddDoctor = () => {
    return (
        <div className="vendorsAddHospitals">
            <DoctorAndHospitalRegistrationForm />
        </div>
    );
}

export default AddDoctor;

