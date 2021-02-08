import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './appointment.styles.scss';

//importing reusable components
import DatePicker from '../../../../reusableComponent/datePicker/datePicker.component';



const Appointments = () => {

    const [selectedDate, setSelectedDate] = useState({ date: (new Date).getDate(), month: (new Date).getMonth(), year: (new Date).getFullYear() });
    //const [appointments,setAppointm]

    const hospitalList = useSelector(state => state.currentVendor.clinic);
    console.log(hospitalList);
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
            <div className="apiInfoPicker">

            </div>
            <div className="appointments">

            </div>
        </div>
    );
}

export default Appointments;