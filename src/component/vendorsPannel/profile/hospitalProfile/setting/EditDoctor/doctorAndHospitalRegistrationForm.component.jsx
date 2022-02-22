import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './doctorAndHospitalRegistrationForm.styles.scss';
import { Radio } from '@material-ui/core';
import { useSelector } from "react-redux"
import { VALIDATE } from './validator/validator';

//importing custom components
// import AddDayAndTime from '../addDayAndTime/addDayAndTime.component';
import AddDayAndTime from '../../../../registration/addDayAndTime/addDayAndTime.component';

//importing reusable components
import InfoCard from '../../../../../reusableComponent/infoCard/infoCard.component.';

//importing actions
import {
    setName,
    setPhoneNumber,
    setAddress,
    setDegree,
    setTimeSlotForpatient,
    setFees,
    setTimings,
    setFeesCollectionOnAccountOf,
    setTeleconsulting,
    setCurrentVendor
} from '../../../../../../actions/action';

//importing services
import { UPDATE_REGISTERED_USER,GET_VENDOR_DETAILS_BY_ID, GET_USER_DEETAIL_BY_TOKEN, GET_MATCHING_DOCTORS_LIST, GET_MATCHING_HOSPITAL_LISTS } from '../../../../../../services/services';
import {NotificationManager} from 'react-notifications';
import NotificationContainer from "react-notifications/lib/NotificationContainer"
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const DoctorAndHospitalRegistrationForm = (props) => {

    const [errorFields, setErrorFields] = useState({});
    const [suggestionList, setSuggestionList] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedSuggestionId,setSelectedSuggestionId]=useState(props.selectData.doctorId);
    const currentVendor = useSelector(state => state.currentVendor);

    const goBack = (e) => {
        e.preventDefault();
        props.history.goBack();
    }

    useEffect(() => {
        let searchBusinessType = currentVendor.businessType === 'doctor' ? 'hospital' : 'doctor';
        axios.get(GET_VENDOR_DETAILS_BY_ID(searchBusinessType, props.selectData.doctorId))
                .then(res => {
               setSelectedData(res.data.payload);
            })
            .catch(err => {
                alert('cant fetch suggestion list');
                console.log(err);
            })

            let link = props.currentVendor.businessType === 'doctor' ? GET_MATCHING_HOSPITAL_LISTS : GET_MATCHING_DOCTORS_LIST;
            axios
                .get(link(props.name))
                .then(res => {
                    setSuggestionList(res.data.payload);
                })
                .catch(err => {
                    alert('cant fetch suggestion list');
                    console.log(err);
                })
    }, [props.name]);

    const selectFromSuggestion = (data) => {
        props.setName(data.businessName);
        props.setAddress(`${data.area} ${data.city} ${data.state}, ${data.pincode}`);
        props.setDegree(data.degree);
        props.setPhoneNumber(parseInt(data.phone));
        setSelectedSuggestionId(data._id);
        setSuggestionList([]);
    }

    const save = (e) => {
             props.setName(selectedData.businessName);
                props.setAddress(`${selectedData.area} ${selectedData.city} ${selectedData.state}, ${selectedData.pincode}`);
                props.setDegree(selectedData.degree);
                props.setPhoneNumber(parseInt(selectedData.phone));
                setSelectedSuggestionId(selectedData._id);
                setSuggestionList([]);
        e.preventDefault();
        let data;

        //extracting times
        let timing={};
        Object.keys(props.timing).forEach(item => {
            if (props.timing[item].isSelected) {
                timing[item.charAt(0).toUpperCase() + item.slice(1)] = { morning: props.timing[item].morning, evening: props.timing[item].evening }
            }
        });

        if (props.currentVendor.businessType === 'hospital') {
            data = {
                doctors: [
                    {
                        doctorId:selectedSuggestionId,
                        name: props.name,
                        degree: props.degree,
                        mobileNumber: props.phoneNumber,
                        fee: props.fees,
                        timePerSlot: props.timeSlot,
                        feeCollect: props.feesCollectOnAccountOf.hospital ? 'hospital' : 'doctor',
                        teleConsulting: props.teleConsulting,
                        workingHours: timing
                    },
                    ...props.currentVendor.doctors
                ],
                update:true
            }
        }
        else if (props.currentVendor.businessType === 'doctor') {
            data = {
                clinic: [
                    {
                        clinicId:selectedSuggestionId,
                        name: props.name,
                        contact: props.phoneNumber,
                        address: props.address,
                        fee: props.fees ? props.fees:props.selectData.fee,
                        timePerSlot: props.timeSlot ?props.timeSlot :props.selectData.timePerSlot,
                        feeCollect: props.feesCollectOnAccountOf.hospital ? 'hospital' : 'doctor',
                        teleConsulting: props.teleConsulting ,
                        workingHours: JSON.stringify(timing)!="{}"? timing: props.selectData.workingHours
                    },
                    ...props.currentVendor.clinic
                ],
                update:true
            }
        }

        let validatedData = {};//VALIDATE(data, props.currentVendor.businessType);
        if (Object.keys(validatedData).length == 0) {
            
            axios
                .put(UPDATE_REGISTERED_USER, data, {
                    headers: {
                        'Authorization': `Bearer ${props.auth_token.accessToken}`
                    }
                })
                .then(res => {
                    if(res.data.message==="duplicate"){
                        NotificationManager.error('error message', 'Already Added this Hospital !!', 2000, () => {
                        });
                    }else{
                        NotificationManager.success('success message', 'Hospital Updated !!', 2000, () => {
                        });
                        // setTimeout(() => {
                        //     props.history.goBack();
                        //   }, 2000);
                    }
                    axios
                        .get(GET_USER_DEETAIL_BY_TOKEN, {
                            headers: {
                                'Authorization': `Bearer ${props.auth_token.accessToken}`
                            }
                        })
                        .then(response => {
                            console.log(response.data.payload , "WE are getting payload");
                            props.setCurrentVendor(response.data.payload)
                        })
                        .catch(err => {
                            console.log(err);
                            alert('something went wrong');
                        });
                    // props.history.goBack();
                })
                .catch(err => {
                    console.log(err);
                    alert('something went wrong');
                });
        }
        else {
            setErrorFields(validatedData);
        }
    }

    return (
        <div>
        <NotificationContainer/>
        <form className="doctorAndHospitalRegistrationForm">
            <h3>Edit {props.currentVendor.businessType === 'doctor' ? 'Hospital/Clinic' : 'Doctor'}</h3>
            <div className="name" style={{ position: 'relative', backgroundColor: 'white' }}>
           {console.log(selectedData)}
                <input
                    type='text'
                    disabled
                    placeholder={`Enter name of the ${props.currentVendor.businessType === 'doctor' ? 'hospital' : 'doctor'}`}
                    value={selectedData.businessName}
                    onchange={(e) => { props.setName(e.target.value) }}
                    className={`${errorFields.name ? 'erroredInput' : null}`}
                />
                {/* {
                    suggestionList.length > 0 && props.name !== ''
                        ? <div style={{ position: 'absolute', width: '100%', zIndex: 1, padding: '5px', backgroundColor: 'white', border: '1px solid #ccc', boxShadow: '0 0 5px @ccc', maxHeight: '500px', top: '90%', overflowY: 'scroll', overflowX: 'auto' }}>
                            {
                                suggestionList.map(item => <div className='suggestionInfoCard' onClick={(e) => { e.stopPropagation(); e.cancelable = true; selectFromSuggestion(item); }}><InfoCard data={item} cancelTouch /></div>)
                            }
                        </div>
                        : null
                } */}
            </div>
            {   //in adding hospitals
                props.currentVendor.businessType === 'doctor'
                    ? <div className="address">
                        <input
                            type='text'
                            disabled
                            placeholder={`Enter address of hospital`}
                            value={props.selectData.address}
                            onChange={(e) => { props.setAddress(e.target.value) }}
                            className={`${errorFields.address ? 'erroredInput' : null}`}
                        />
                    </div>
                    : null
            }
            {   //in adding doctors
                props.currentVendor.businessType === 'hospital'
                    ? <div className="degree">
                        <input
                        disabled
                            type='text'
                            placeholder={`Enter degree of doctor`}
                            value={props.selectData.degree}
                            onChange={(e) => { props.setDegree(e.target.value) }}
                            className={`${errorFields.degree ? 'erroredInput' : null}`}
                        />
                    </div>
                    : null
            }
            <div className="phoneNo">
    
                <input
                    type='text'
                    disabled
                    placeholder={`Enter phone no. ${props.currentVendor.businessType === 'doctor' ? 'hospital' : 'doctor'}`}
                    value={selectedData.phone}
                    onChange={(e) => { props.setPhoneNumber(e.target.value) }}
                    className={`${errorFields.mobileNumber || errorFields.contact ? 'erroredInput' : null}`}
                />
            </div>
            <div className='timeSlotAndFees'>
                <div className="fees">
                    <input
                        type='text'
                        placeholder='fees'
                        value={props.selectData.fee}
                        onChange={(e) => { props.setFees(e.target.value) }}
                        className={`${errorFields.fee ? 'erroredInput' : null}`}
                    />
                </div>
                <div className="timeSlotPerPatient">
                    <input
                        type='text'
                        placeholder='eg: 30 mins'
                        value={props.selectData.timePerSlot}
                        onChange={(e) => { props.setTimeSlotForpatient(e.target.value) }}
                        className={`${errorFields.timePerSlot ? 'erroredInput' : null}`}
                    />
                </div>
            </div>
            <div className="feeCollectionBy">
                <div>
                    <label htmlFor="fee Collection On The Accoun tOf">Fees collection On The Account Of </label>
                </div>
                <div className='labelInput'>
                    <Radio
                        name='feeCollcetionBy'
                        value={props.selectData.feeCollect}
                        checked={props.feesCollectOnAccountOf.hospital ? true : false}
                        onChange={(e) => props.setFeesCollectionOnAccountOf({ hospital: true, doctor: false })}
                    />
                    <label htmlFor="hospital">hospital</label>
                </div>
                <div className='labelInput'>
                    <Radio
                        name='feeCollcetionBy'
                        value={props.selectData.feeCollect}
                        checked={props.feesCollectOnAccountOf.doctor ? true : false}
                        onChange={(e) => props.setFeesCollectionOnAccountOf({ hospital: false, doctor: true })}
                    />
                    <label htmlFor="doctor">doctor</label>
                </div>
            </div>
            <div className="teleConsulting">
                <div>
                    <label htmlFor="teteConsulting">Teleconsulting</label>
                </div>
                <div className='labelInput'>
                    <Radio
                        name='teleConsulting'
                        value={props.selectData.teleConsulting}
                        checked={props.teleConsulting ? false : true}
                        onChange={(e) => props.setTeleconsulting(false)}
                    />
                    <label htmlFor="no">no</label>
                </div>
                <div className='labelInput'>
                    <Radio
                        name='teleConsulting'
                        value={props.selectData.teleConsulting}
                        checked={props.teleConsulting ? true : false}
                        onChange={(e) => props.setTeleconsulting(true)}
                    />
                    <label htmlFor="yes">yes</label>
                </div>
            </div>
            <div className="setTimings">
                <h3>Add Timing For Hospital</h3>
                {
                    days.map((item, index) => (
                        <>
                        <AddDayAndTime
                            key={index}
                            day={item}
                            setTimings={props.setTimings}
                            data={props.selectData.workingHours}
                            // data={(!props.selectData.workingHours.filter((val) => val === item))}
                            error={errorFields[`workingHours ${item}`]}
                        /></>
                    ))
                     }
            </div>
            <div className="formButtons">
                <button onClick={goBack}>Go Back</button>
                <button onClick={save}>Update</button>
            </div>
        </form></div>
    );
}

const mapStatetoProps = state => ({
    name: state.doctorAndHospitalRegistration.name,
    address: state.doctorAndHospitalRegistration.address,
    degree: state.doctorAndHospitalRegistration.degree,
    phoneNumber: state.doctorAndHospitalRegistration.phoneNumber,
    fees: state.doctorAndHospitalRegistration.fees,
    timeSlot: state.doctorAndHospitalRegistration.timeSlotPerPatient,
    feesCollectOnAccountOf: state.doctorAndHospitalRegistration.feesCollectOnAccountOf,
    teleConsulting: state.doctorAndHospitalRegistration.teleConsulting,
    timing: state.doctorAndHospitalRegistration.timing,
    currentVendor: state.currentVendor,
    auth_token: state.token,
    selectData:state.search.selectedData
});

const mapDispatchToProps = dispatch => ({
    setName: (name) => dispatch(setName(name)),
    setAddress: (address) => dispatch(setAddress(address)),
    setDegree: (degree) => dispatch(setDegree(degree)),
    setPhoneNumber: (phoneNo) => dispatch(setPhoneNumber(phoneNo)),
    setFees: (fees) => dispatch(setFees(fees)),
    setTimeSlotForpatient: (time) => dispatch(setTimeSlotForpatient(time)),
    setTeleconsulting: (option) => dispatch(setTeleconsulting(option)),
    setFeesCollectionOnAccountOf: ({ doctor = false, hospital = true }) => dispatch(setFeesCollectionOnAccountOf({ doctor, hospital })),
    setTimings: (day, timings) => dispatch(setTimings(day, timings)),
    setCurrentVendor: (payload) => dispatch(setCurrentVendor(payload))
});

export default connect(mapStatetoProps, mapDispatchToProps)(withRouter(DoctorAndHospitalRegistrationForm));
