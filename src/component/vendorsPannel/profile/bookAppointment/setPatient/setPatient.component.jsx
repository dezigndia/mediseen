import React, { useEffect, useState, useCallback } from 'react';
import './setPatient.styles.scss';
import axios from 'axios';
import { Radio } from '@material-ui/core';
import { useSelector } from 'react-redux';

//importing services
import { createAppointment, GET_ALL_PATIENTS } from '../../../../../services/services';

//importing reusable components
import InputWithIcon from '../../../../reusableComponent/InputwithIcon/inputWithIcon.component';
import Icon from '../../../../reusableComponent/icon/icon.component';

//importing icon
import { FiPlus } from 'react-icons/fi';
import { MdModeEdit } from 'react-icons/md';
import SearchSuggestion from './searchSuggestion/searchSuggestion.component';

const createTimeStamp = (selectedDate) => {
    let date = new Date();
    date.setDate(selectedDate.date);
    date.setMonth(selectedDate.month);
    date.setFullYear(selectedDate.year);
    return date.getTime();
}


const ifTimeSlotPresentInAppointmentSlots = (appointmentSlots, timeSlot) => {

    //function to check if timeslot selected by user is present in time slot
    for (let i = 0; i < appointmentSlots.length; i++) {
        if (appointmentSlots[i].timeSlot.timeStampFrom === timeSlot.from && appointmentSlots[i].timeSlot.timeStampTo === timeSlot.to) {
            return true;
        }
    }
    return false;
}

const SetPatient = ({ changeTab, goToSetHospitalOrDoctor, bookAppointment, dispatch, setAppointmentSlots, appointmentSlots }) => {

    const auth_token = useSelector(state => state.token);
    const currentVendor = useSelector(state => state.currentVendor);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        axios
            .get(GET_ALL_PATIENTS(searchInput), {
                headers: {
                    'Authorization': `Bearer ${auth_token.accessToken}`
                }
            })
            .then(res => {
                setSearchResult(res.data.payload);
            })
            .catch(err => {
                console.log(err);
            });
    }, [searchInput]);

    const setPatient = useCallback((patientInfo) => {
        dispatch({ type: 'setPatientFirstName', payload: patientInfo.firstName });
        dispatch({ type: 'setPatientLastName', payload: patientInfo.lastName });
        dispatch({ type: 'setPatientMobileNo', payload: patientInfo.mobileNumber });
        dispatch({ type: 'setGender', payload: patientInfo.gender });
        dispatch({ type: 'setDob', payload: patientInfo.dob });
        dispatch({ type: 'setAge', payload: patientInfo.age });
        setSearchResult([]);
        setSearchInput('');
    }, [searchResult, setSearchResult]);

    const book = () => {
        const data = {
            businessName: currentVendor.businessName,
            businessType: currentVendor.businessType,
            timings: bookAppointment.timeStampTimings,
            notes: bookAppointment.notes,
            userPhoneNumber: currentVendor.phone,
            businessPhoneNumber: currentVendor.phoneNumber,
            mobileNumber: bookAppointment.refMobileNumber,
            date: createTimeStamp(bookAppointment.date),
            patient: {
                firstName: bookAppointment.patientFirstName,
                lastName: bookAppointment.patientLastName,
                mobileNumber: bookAppointment.patientMobileNo,
                gender: bookAppointment.gender,
                dob: bookAppointment.dob,
                paymentStatus: bookAppointment.paymentStatus,
                videoConsulting: bookAppointment.videoConsulting,
                age: bookAppointment.age
            }
        };

        if (currentVendor.businessType === 'hospital') {
            data['doctorId'] = bookAppointment.businessName.id;
        }
        else {
            data['clinicId'] = bookAppointment.businessName.id;
        }

        if (ifTimeSlotPresentInAppointmentSlots(appointmentSlots, data.timings)) {
            axios
                .post(createAppointment, data, {
                    headers: {
                        'Authorization': `Bearer ${auth_token.accessToken}`
                    }
                })
                .then(res => {
                    //clearing form
                    dispatch({ type: 'clear' });
                    //console.log(res.data.payload);
                    setAppointmentSlots(prevState => {
                        let arr = prevState;
                        for (let i = 0; i < prevState.length; i++) {
                            if (bookAppointment.timings.from.replace(' ', '') === prevState[i].timeSlot.from.replace(' ', '') &&
                                bookAppointment.timings.to.replace(' ', '') === prevState[i].timeSlot.to.replace(' ', '')) {
                                // targeting the time appointment was booked 
                                arr[i].timeSlot = {
                                    from: bookAppointment.timings.from,
                                    to: bookAppointment.timings.to,
                                    hospitalName: prevState[i].timeSlot.doctorName,
                                    doctorName: prevState[i].timeSlot.hospitalName
                                    //setting both as the one not required will be set to null and ignored by others components
                                };
                                arr[i].isBooked = true;
                                arr[i].customerName = `${bookAppointment.patientFirstName}  ${bookAppointment.patientLastName}`
                                arr[i].phoneNo = bookAppointment.patientMobileNo;
                                arr[i]._id = res.data.payload._id;
                            }
                        }
                        return arr;
                    });//changing the status of appointment as booked
                    changeTab();
                })
                .catch(err => {
                    console.log(err);
                    alert('appointment booking failed');
                });
        }
        else {
            alert('time slot is not present in appointment slots of doctor , you changed date while booking appointment');
        }
    };

    return (
        <div className="setPatient">
            <div className="setPatientForm">
                <div className="setPatientFormHeader">
                    <div className='searchPatient'>
                        <label htmlFor="search Patient">Search Patient</label>
                        <InputWithIcon value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        {
                            searchInput !== '' && searchResult.length && <SearchSuggestion searchResult={searchResult} onClick={setPatient} />
                        }
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