import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './appointment.styles.scss';

//importing reusable components
import DatePicker from '../../../../reusableComponent/datePicker/datePicker.component';

//importing custm components
import TimeSlots from '../../TimeSlots/timeSlots.component';


const dummydata = [
    { timeSlot: { from: '10:00', to: '10:30' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '10:30', to: '11:00' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '11:00', to: '11:30' }, isBooked: false, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '12:00', to: '12:30' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' },
    { timeSlot: { from: '12:30', to: '1:00' }, isBooked: true, customerName: 'Amresh Kumar', phoneNo: '9219158811' }
]

const Appointments = () => {

    const [selectedDate, setSelectedDate] = useState({ date: (new Date).getDate(), month: (new Date).getMonth(), year: (new Date).getFullYear() });
    //const [appointments,setAppointm]
    const hospitalList = useSelector(state => state.currentVendor.clinic);

    return (
        <div className="vendorAppointments">
            <DatePicker {...{ selectedDate, setSelectedDate }} />
            <div className='hospitalList'>
                <select>
                    {
                        hospitalList.map((item, index) => <option key={index}>{item.name}</option>)
                    }
                </select>
            </div>
            <div className="appointmentsContainer">
                {
                    dummydata.map((item, index) =>
                        <TimeSlots
                            name={item.customerName}
                            phoneNo={item.phoneNo}
                            timings={item.timeSlot}
                            isBooked={item.isBooked}
                            key={index}
                        />)
                }
            </div>
        </div>
    );
}

export default Appointments;