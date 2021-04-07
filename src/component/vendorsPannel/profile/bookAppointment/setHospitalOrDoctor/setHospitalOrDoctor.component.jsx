import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import './setHospitalOrDoctor.styles.scss';

const SetHospitalOrDoctor = ({ changeTab, goToSetPatient, bookAppointment, dispatch, timings, appointmentSlots }) => {
    const [availableAppointmentTimings, setAvailableAppointmentTimings] = useState([]);
    const businessType = useSelector(state => state.currentVendor.businessType);
    const clinics = useSelector(state => state.currentVendor.clinic);
    const doctors = useSelector(state => state.currentVendor.doctors);

    const day = useMemo(() => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let date = new Date();
        date.setDate(bookAppointment.date.date);
        date.setMonth(bookAppointment.date.month);
        date.setFullYear(bookAppointment.date.year);
        return days[date.getDay()];
    }, [bookAppointment.date]);

    //effect to filter out booked timings and show only available timings
    useEffect(() => {
        appointmentSlots.forEach(item => {
            if (!item.isBooked) {
                setAvailableAppointmentTimings(prevState => [...prevState, item]);
            }
        });
    }, [setAvailableAppointmentTimings, appointmentSlots]);

    //effect to select doctor if none('All') is selected
    useEffect(() => {
        if (bookAppointment.businessName.name === 'All') {
            businessType === 'doctor'
                ? dispatch({ type: 'setBusinessName', payload: { name: clinics[0].name, id: clinics[0]._id } })
                : dispatch({ type: 'setBusinessName', payload: { name: doctors[0].name, id: doctors[0]._id } })
        }
    }, [dispatch, bookAppointment.businessName.name])

    const setTime = (e) => {
        dispatch({
            type: 'setTimings', payload: {
                from: e.target.value.split('-')[0],
                to: e.target.value.split('-')[1]
            }
        });
        dispatch({
            type: 'setTimeStampTimings',
            payload: {
                from: availableAppointmentTimings[e.target.selectedIndex].timeSlot.timeStampFrom,
                to: availableAppointmentTimings[e.target.selectedIndex].timeSlot.timeStampTo
            }
        });
    }

    return (
        <div className="setDoctorOrHospital">
            <div className="setDoctorOrHospitalForm">
                <div className='hospitalsName'>
                    <label htmlFor="hospital or doctor name">
                        {
                            businessType !== 'hospital' ? 'Hospital name' : 'Doctor name'
                        }
                    </label>
                    <select value={bookAppointment.businessName.name} onChange={(e) => dispatch({ type: 'setBusinessName', payload: { name: e.target.value, id: businessType === 'doctor' ? clinics[e.target.selectedIndex]?._id : doctors[e.target.selectedIndex]?._id } })}>
                        {
                            businessType === 'doctor'
                                ? clinics
                                    .filter((item, index) => {
                                        if (Object.keys(item.workingHours).find(item => item === day)) {
                                            return true;
                                        }
                                    }).map((item, index) => {
                                        return <option key={index} id={item._id}>{item.name}</option>
                                    })

                                : null
                        }
                        {
                            businessType == 'hospital'
                                ? doctors
                                    .filter((item, index) => {
                                        if (Object.keys(item.workingHours).find(item => item === day)) {
                                            return true;
                                        }
                                    }).map((item, index) => {
                                        return <option key={index} id={item._id}>{item.name}</option>
                                    })
                                : null
                        }
                    </select>
                </div>
                <div className='hospitalTime'>
                    <label htmlFor="hospital or doctor time">
                        {
                            businessType !== 'hospital' ? 'Hospital Time' : 'Doctor Time'
                        }
                    </label>
                    <select
                        value={`${bookAppointment.timings.from}-${bookAppointment.timings.to}`}
                        onChange={setTime}
                    >
                        {
                            availableAppointmentTimings.length && availableAppointmentTimings.map((item, index) => {
                                return <option key={index} id={index} value={`${item.timeSlot.from}-${item.timeSlot.to}`}>{item.timeSlot.from}-{item.timeSlot.to}</option>
                            })
                        }
                    </select>
                </div>
                <div className='notes'>
                    <label htmlFor="notes">Notes</label>
                    <input
                        type='text'
                        value={bookAppointment.notes}
                        onChange={(e) => dispatch({ type: 'setNotes', payload: e.target.value })}
                    />
                </div>
                <div className='RefrenceMobileNumber'>
                    <label htmlFor="Refrence mobile number">Refrence mobile number</label>
                    <input
                        type='text'
                        value={bookAppointment.refMobileNo}
                        onChange={(e) => dispatch({ type: 'setRefMobileNo', payload: e.target.value })}
                    />
                </div>
            </div>
            <div className="setDoctorOrHospitalActions">
                <button className='whiteButton' onClick={changeTab}>Back</button>
                <button className='greenButton' onClick={goToSetPatient}>Next</button>
            </div>
        </div>
    );
}

export default SetHospitalOrDoctor;