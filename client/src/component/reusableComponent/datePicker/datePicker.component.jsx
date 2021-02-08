import React, { useState, useEffect } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import './datePicker.styles.scss';

//importing icon 
import Icon from '../../reusableComponent/icon/icon.component';

//importing icons
import { FaCalendarAlt } from 'react-icons/fa';


const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DatePicker = ({ setSelectedDate, selectedDate }) => {
    const [dateArray, setDateArray] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const date = new Date();

    useEffect(() => {
        function getDay(date) {
            // Sun Feb 28 2021 00:00:00 GMT+0530
            return parseInt(date.toString().split(' ')[2]);
        }
        let lastDay = getDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        let currentDay = getDay(new Date());
        let date_array = [];
        for (let i = currentDay; i <= lastDay; i++) {
            date_array.push(i);
        }
        setDateArray(date_array);
    }, [setDateArray]);

    return (
        <div className='datePickerContainer'>
            <div className="datePicker">
                <div className="picker">
                    <Icon iconColor='white' onClick={() => setShowDatePicker(prevState => !prevState)}>
                        <FaCalendarAlt />
                    </Icon>
                    {
                        showDatePicker &&
                        <div className='calenderContiner'>
                            
                        </div>
                    }
                </div>
                <div className="selectDate">
                    {
                        dateArray.map((item, index) =>
                            <div key={index} className={`date ${selectedDate.date === item ? 'selectedDate' : null}`}>
                                <p onClick={() => setSelectedDate(prevState => ({ ...prevState, date: item }))}>
                                    {
                                        item <= 9
                                            ? `0${item}`
                                            : item
                                    }
                                </p>
                            </div>)
                    }
                </div>
            </div>
            <div className="selectedDate">
                <div>
                    {
                        selectedDate.date <= 9
                            ? `0${selectedDate.date}`
                            : selectedDate.date
                    }
                </div>
                <div>{monthNames[selectedDate.month]}</div>
                <div>{selectedDate.year}</div>
            </div>
        </div>
    );
}

export default DatePicker;