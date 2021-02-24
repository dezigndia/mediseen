import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './appointment.styles.scss';

//importing reusable components
import DatePicker from '../../../../reusableComponent/datePicker/datePicker.component';

//importing custom components
import TimeSlots from '../../TimeSlots/timeSlots.component';
import BookAppointment from '../../bookAppointment/bookAppointment.component';

//importing services
import { getAppointmentByBusiness } from '../../../../../services/services';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturdy'];

const SHOW_APPOINTMENTS = 'showAppointments';
const ISSUE_NEW_APPOINTMENT = 'issueNewAppointments';

const Appointments = () => {

    const [selectedDate, setSelectedDate] = useState({ date: (new Date()).getDate(), month: (new Date()).getMonth(), year: (new Date()).getFullYear() });
    const [tab, setTab] = useState(SHOW_APPOINTMENTS);
    const [timings, setTimings] = useState([]);
    const [appointmentSlots, setAppointmentSlots] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState('All');

    //timings is array for storing all available time slots on a particular day
    //appointSlots is array for storing info necessary to render timeSlots

    const hospitalList = useSelector(state => state.currentVendor.clinic);
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
        //runs only for initializing timings field of reducer
        dispatch({ type: 'setTimings', payload: appointmentSlots && appointmentSlots[0] && appointmentSlots[0].timeSlot })
    }, [dispatch, appointmentSlots]);

    useEffect(() => {
        //effect for making appointmentSlots array necessary for rendering TimeSlotComponent
        var isPresent = (arr, item) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].timings.from.replace(' ', '') === item.from.replace(' ', '') && arr[i].timings.to.replace(' ', '') === item.to.replace(' ', '')) {
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
        else {
            setAppointmentSlots([]);
        }
    }, [setTimings, timings, setAppointmentSlots]);

    useEffect(() => {
        //effect for making all appointment timeslot array
        const convertToDateObject = (hrs, min) => {
            let date = new Date();
            date.setHours(hrs);
            date.setMinutes(min);
            date.setSeconds(0);
            return date;
        }

        const makeAppointmentSlotsArray = (slotArr, startTime, endTime, suffix, hospitalName) => {
            var temp = startTime;
            var start_time = convertToDateObject(startTime.split(':')[0], startTime.split(':')[1].split(' ')[0]);
            var end_time = convertToDateObject(endTime.split(':')[0], endTime.split(':')[1].split(' ')[0]);

            var temp_time = start_time; //eg 6:00 am

            //pushing to the array in the interval of 30 minutes
            while (temp_time < end_time) {
                let next_temp_time = new Date(temp_time.getTime() + 30 * 60 * 1000);//added 30 minutes , fix this
                slotArr.push({
                    from: `${temp_time.getHours()}:${temp_time.getMinutes() <= 9 ? `0${temp_time.getMinutes()}` : temp_time.getMinutes()} ${suffix}`,
                    to: `${next_temp_time.getHours()}:${next_temp_time.getMinutes() <= 9 ? `0${next_temp_time.getMinutes()}` : next_temp_time.getMinutes()} ${suffix}`,
                    hospitalName
                });
                temp_time = next_temp_time;
            }
        }
        if (hospitalList) {
            let dayIndex = new Date(selectedDate.year, selectedDate.month, selectedDate.date).getDay();
            let time = hospitalList.map(item => ({ workingHours: item.workingHours[days[dayIndex]], hospitalName: item.name }));
            let morningShift = [], eveningShift = [];
            console.log(time);
            time[0].workingHours !== undefined && time.forEach(item => {
                makeAppointmentSlotsArray(morningShift, item.workingHours.morning.from, item.workingHours.morning.to, 'am', item.hospitalName);
                makeAppointmentSlotsArray(eveningShift, item.workingHours.evening.from, item.workingHours.evening.to, 'pm', item.hospitalName);
            });
            console.log(time);
            setTimings(morningShift.concat(eveningShift));
        }
    }, [hospitalList, setTimings, selectedDate.year, selectedDate.month, selectedDate.date]);

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
                                <select value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
                                    <option value='All'>All</option>
                                    {
                                        hospitalList.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
                                    }
                                </select>
                            </div>
                            {
                                appointmentSlots &&
                                appointmentSlots.length > 0 &&
                                appointmentSlots
                                    .filter(item => selectedHospital === 'All' || item.timeSlot.hospitalName === selectedHospital)
                                    .map((item, index) =>
                                        <>
                                            <TimeSlots
                                                key={index}
                                                name={item.customerName}
                                                phoneNo={item.phoneNo}
                                                timings={item.timeSlot}
                                                isBooked={item.isBooked}
                                                key={index}
                                                changeTab={setTabIssueNewAppointment}
                                            />

                                        </>
                                    )
                            }
                        </>
                        : <BookAppointment
                            changeTab={setTabShowAppointment}
                            {...{ bookAppointment, dispatch, appointmentSlots, setAppointmentSlots, timings }}
                        />
                }
            </div>
        </div>
    );
}

export default Appointments;