import React, { useState, useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import './appointment.styles.scss';
import { useSelector } from 'react-redux';

//importing reusable components
import DatePicker from '../../../../reusableComponent/datePicker/datePicker.component';

//importing custom components
import TimeSlots from '../../TimeSlots/timeSlots.component';
import BookAppointment from '../../bookAppointment/bookAppointment.component';

//importing services
import { getAppointmentByBusiness } from '../../../../../services/services';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturdy'];

const dummydata = [
    { timeSlot: { from: '10:00', to: '10:30' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '10:30', to: '11:00' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '11:00', to: '11:30' }, isBooked: false, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '12:00', to: '12:30' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '12:30', to: '1:00' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' }
];

const SHOW_APPOINTMENTS = 'showAppointments';
const ISSUE_NEW_APPOINTMENT = 'issueNewAppointments';

const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState({ date: (new Date()).getDate(), month: (new Date()).getMonth(), year: (new Date()).getFullYear() });
    const [tab, setTab] = useState(SHOW_APPOINTMENTS);
    const [timings, setTimings] = useState([]);
    const [appointmentSlots, setAppointmentSlots] = useState(null);

    //timings is array for storing all available time slots on a particular day
    //appointSlots is array for storing info necessary to render timeSlots

    //const [appointments,setAppointm]
    const doctorsList = useSelector(state => state.currentVendor.doctors);
    const auth_token = useSelector(state => state.token);

    const [bookAppointment, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setBusinessName':
                return { ...state, businessName: action.payload }
            case 'setRefMobileNo':
                return { ...state, refMobileNumber: action.payload }
            case 'setTimings':
                return { ...state, timings: action.payload }
            case 'setNotes':
                return { ...state, notes: action.payload }
            case 'setPatientFirstName':
                return { ...state, patientFirstName: action.payload }
            case 'setPatientLastName':
                return { ...state, patientLastName: action.payload }
            case 'setPatientMobileNo':
                return { ...state, patientMobileNo: action.payload }
            case 'setGender':
                return { ...state, gender: action.payload }
            case 'setDob':
                return { ...state, dob: action.payload }
            case 'setAge':
                return { ...state, age: action.payload }
            case 'setPaymentStatus':
                return { ...state, paymentStatus: action.payload }
            case 'setVideoConsulting':
                return { ...state, videoConsulting: action.payload }
            default:
                return state;
        }
    }, {
        businessName: '',
        refMobileNumber: '',
        timings: '',
        notes: '',
        patientFirstName: '',
        patientLastName: '',
        patientMobileNo: '',
        gender: 'Male',
        dob: '',
        age: '',
        paymentStatus: 'unpaid',
        videoConsulting: false
    });

    useEffect(() => {
        //runs only once for initializing timings field of reducer
        dispatch({ type: 'setTimings', payload: appointmentSlots && appointmentSlots[0].timeSlot })
    }, [dispatch, appointmentSlots]);

    useEffect(() => {
        //effect for making appointmentSlots array necessary for rendering TimeSlotComponent
        var isPresent = (arr, item) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].timings.from === item.from && arr[i].timings.to === item.to) {
                    return { present: true, index: i };
                }
            }
            return { present: false };
        }

        if (timings.length != 0) {
            axios
                .get(getAppointmentByBusiness, {
                    headers: {
                        'Authorization': `Bearer ${auth_token.accessToken}`
                    }
                })
                .then(res => {
                    let data = timings.map(item => {
                        //checking if a particulat timeslot is present in fetched appointment time slot  
                        let isDataPresent = isPresent(res.data.payload, item);

                        //isDataPresent = {present:true,index} if true
                        //isdataPresent = {present:false} if false

                        //index is the index at which data is present in fetched array

                        console.log(isDataPresent);
                        if (isDataPresent.present) {
                            return {
                                timeSlot: item,
                                isBooked: true,
                                customerName: `${res.data.payload[isDataPresent.index].patient.firstName} ${res.data.payload[isDataPresent.index].patient.lastName}`,
                                phoneNo: `${res.data.payload[isDataPresent.index].patient.mobileNumber}`
                            }
                        }
                        else {
                            return {
                                timeSlot: item,
                                isBooked: false,
                                customerName: '',
                                phoneNo: ''
                            }
                        }
                    });

                    setAppointmentSlots(data);
                })
                .catch(err => {
                    console.log(err);
                    alert('unable to fetch appointments');
                });
        }
    }, [setTimings, timings, setAppointmentSlots]);

    useEffect(() => {
        //effect for making all appointment timeslot array
        const makeAppointmentSlotsArray = (slotArr, startTime, endTime, suffix) => {
            var temp = startTime;
            console.log(startTime, endTime, temp);
            while (temp <= endTime) {
                var hrs = parseInt(temp.split(':')[0]);
                var min = parseInt(temp.split(':')[1].split(' ')[0]);
                var step = 1; //min addition start from 0
                console.log(startTime, endTime, temp);
                while (step <= 30) {
                    if (min < 59) {
                        min += 1;
                    }
                    else {
                        min = 0;
                        if (hrs < 12) {
                            hrs += 1;
                        }
                        else {
                            hrs = 1;
                        }
                    }
                    step += 1;
                    console.log(step);
                }  //30 minutes added to current time
                slotArr.push({ from: `${temp.split(':')[0]}:${temp.split(':')[1]}${suffix}`, to: `${hrs}:${min <= 9 ? `0${min}` : min}${suffix}` });
                temp = `${hrs}:${min <= 9 ? `0${min}` : min}`
            }
        }
        if (doctorsList.length) {
            let time = doctorsList.map(item => item.workingHours[days[(new Date).getDay()]]);
            let morningShift = [], eveningShift = [];
            time.forEach(item => {
                makeAppointmentSlotsArray(morningShift, item.morning.from, item.morning.to, 'am');
                makeAppointmentSlotsArray(eveningShift, item.evening.from, item.evening.to, 'pm');
            });
            setTimings(morningShift.concat(eveningShift));
            console.log(morningShift, eveningShift);
        }
    }, [doctorsList, setTimings]);

    const setTabShowAppointment = useCallback((e) => {
        if (tab !== SHOW_APPOINTMENTS)
            setTab(SHOW_APPOINTMENTS);
    }, [tab, setTab, SHOW_APPOINTMENTS]);

    const setTabIssueNewAppointment = useCallback((e) => {
        if (tab !== ISSUE_NEW_APPOINTMENT)
            setTab(ISSUE_NEW_APPOINTMENT);
    }, [tab, setTab, ISSUE_NEW_APPOINTMENT]);

    return (
        <div className="vendorAppointments">
            <DatePicker {...{ selectedDate, setSelectedDate }} />
            <div className="appointmentsContainer">
                {
                    tab === SHOW_APPOINTMENTS
                        ?
                        <>
                            <div className='hospitalList'>
                                <select>
                                    {
                                        doctorsList.map((item, index) => <option key={index}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            {
                                dummydata.map((item, index) =>
                                    <TimeSlots
                                        name={item.customerName}
                                        phoneNo={item.phoneNo}
                                        timings={item.timeSlot}
                                        isBooked={item.isBooked}
                                        key={index}
                                        changeTab={setTabIssueNewAppointment}
                                    />)
                            }
                        </>
                        : <BookAppointment
                            changeTab={setTabShowAppointment}
                            {...{ bookAppointment, dispatch, appointmentSlots, timings }}
                        />
                }
            </div>
        </div>
    );
}

export default Appointments;