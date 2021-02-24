import React from 'react';
import './setPatient.styles.scss';
import axios from 'axios';
import { Radio } from '@material-ui/core';
import { useSelector } from 'react-redux';

//importing services
import { createAppointment } from '../../../../../services/services';

//importing reusable components
import InputWithIcon from '../../../../reusableComponent/InputwithIcon/inputWithIcon.component';
import Icon from '../../../../reusableComponent/icon/icon.component';

//importing icon
import { FiPlus } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';

const SetPatient = ({ changeTab, goToSetHospitalOrDoctor, bookAppointment, dispatch }) => {

    const auth_token = useSelector(state => state.token);
    const currentVendor = useSelector(state => state.currentVendor);

    const book = () => {
        const data = {
            userPhoneNo: currentVendor.phoneNumber,
            businessName: currentVendor.businessName,
            businessType: currentVendor.businessType,
            timings: bookAppointment.timings,
            notes: bookAppointment.notes,
            mobileNumber: bookAppointment.refMobileNumber,
            patient: {
                firstName: bookAppointment.patientFirstName,
                lastName: bookAppointment.patientLastName,
                mobileNumber: bookAppointment.patientMobileNo,
                gender: bookAppointment.gender,
                dob: bookAppointment.gender,
                paymentStatus: bookAppointment.paymentStatus,
                videoConsulting: bookAppointment.videoConsulting
            }
        };

        console.log(data);

        axios
            .post(createAppointment, data, {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                //console.log(res.data.payload);
                changeTab();
            })
            .catch(err => {
                console.log(err);
                alert('appointment booking failed');
            });
    };

    return (
        <div className="setPatient">
            <div className="setPatientForm">
                <div className="setPatientFormHeader">
                    <div className='searchPatient'>
                        <label htmlFor="search Patient">Search Patient</label>
                        <InputWithIcon />
                    </div>
                    <div className='addPatient'>
                        <Icon>
                            <FiPlus />
                        </Icon>
                        <p>Add Patient</p>
                    </div>
                </div>
                <div className="editPatient">
                    <p> Edit Patient</p>
                    <Icon size='1.2em'>
                        <MdModeEdit />
                    </Icon>
                </div>
                <div className="patientFirstName patientInfoInput">
                    <label htmlFor="first name">First Name</label>
                    <input
                        type='text'
                        value={bookAppointment.patientFirstName}
                        onChange={(e) => dispatch({ type: 'setPatientFirstName', payload: e.target.value })}
                    />
                </div>
                <div className="patientLastName patientInfoInput">
                    <label htmlFor="last Name">Last Name</label>
                    <input
                        type='text'
                        value={bookAppointment.patientLastName}
                        onChange={(e) => dispatch({ type: 'setPatientLastName', payload: e.target.value })}
                    />
                </div>
                <div className="patientMobileNumber patientInfoInput">
                    <label htmlFor="Mobile No.">Mobile No.</label>
                    <input
                        type='text'
                        value={bookAppointment.patientMobileNo}
                        onChange={(e) => dispatch({ type: 'setPatientMobileNo', payload: e.target.value })}
                    />
                </div>
                <div className="patientGender patientInfoInput">
                    <label htmlFor="Gender">Gender</label>
                    <select value={bookAppointment.gender} onChange={(e) => dispatch({ type: 'setGender', payload: e.target.value })}>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className="patientDob patientInfoInput">
                    <label htmlFor="DOB">Date Of Birth</label>
                    <input
                        type='date'
                        value={bookAppointment.dob}
                        onChange={(e) => dispatch({ type: 'setDob', payload: e.target.value })}
                    />
                </div>
                <div className="patientAge patientInfoInput">
                    <label htmlFor="age">Age</label>
                    <input
                        type='text'
                        value={bookAppointment.age}
                        onChange={(e) => dispatch({ type: 'setAge', payload: e.target.value })}
                    />
                </div>
                <div className="patientPaymentStatus">
                    <label htmlFor="Payment Status">Payment Status</label>
                    <select value={bookAppointment.paymentStatus} onChange={(e) => dispatch({ type: 'setPaymentStatus', payload: e.target.value })}>
                        <option>Unpaid</option>
                        <option>Paid</option>
                    </select>
                </div>
                <div className="patientVideoConsulting">
                    <label htmlFor="Video consulting">Video Consulting</label>
                    <div>
                        <div>
                            <Radio
                                type='radio'
                                name='VideoConsulting'
                                checked={bookAppointment.videoConsulting}
                                onChange={(e) => dispatch({ type: 'setVideoConsulting', payload: true })}
                            />
                            <label htmlFor="Yes">Yes</label>
                        </div>
                        <div>
                            <Radio
                                type='radio'
                                name='VideoConsulting'
                                checked={!bookAppointment.videoConsulting}
                                onChange={(e) => dispatch({ type: 'setVideoConsulting', payload: false })}
                            />
                            <label htmlFor="No">No</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="setPatientsAction">
                <button className='whiteButton' onClick={goToSetHospitalOrDoctor}>Back</button>
                <button className='greenButton' onClick={book}>Book</button>
            </div>
        </div>
    );
}

export default SetPatient;