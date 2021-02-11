import React from 'react';
import './timeSlots.styles.scss';

const Appointments = ({ isBooked, name, phoneNo, timings, changeTab }) => {
    return (
        <div className={`appoinements ${isBooked ? 'booked' : 'vacant'}`}>
            {
                isBooked
                    ? <>
                        <div className="customerInfoContainer">
                            <div className="customerName">
                                {name}
                            </div>
                            <div className="customerInfo">
                                -
                            </div>
                            <div className="customerNumber">
                                {phoneNo}
                            </div>
                        </div>
                        <div className="appointmentActions">
                            <button>Delete</button>
                            <button>Accept</button>
                        </div>
                        <div className="appointmentTime">
                            {timings.from}-{timings.to}
                        </div>
                    </>
                    : <p onClick={changeTab}>{timings.from}-{timings.to}</p>
            }
        </div>
    );
}

export default Appointments;