import React from 'react';
import Badge from '@mui/material/Badge';
import './timeSlots.styles.scss';

const TimeSlots = ({ accepted, start, completed, isBooked, name, phoneNo, timings, changeTab, _id, deleteAppointment,acceptAppointment, startAppointment,endAppointment,dispatch,slot }) => {

    return (
        <div className={`appoinements ${isBooked ? 'booked' : 'vacant'} ${accepted ? 'accepted' : 'notAccepted'}`}>
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
                            {
                                !accepted && !start && !completed ? <>
                                     
                                                                             <button onClick={() => deleteAppointment(_id, timings)} > Reject</button>
                                        <button onClick={() => acceptAppointment(_id, timings)}>Accept</button>
                                    </>
                                    : <div>
                                    {!start && !completed ?<><div>
                                    <Badge badgeContent={"Accepted"} color="secondary"  style={{marginLeft:"35px"}}></Badge>     </div>
                                    <div  style={{marginTop:"10px"}}>
                                    <button onClick={() =>  startAppointment(_id, timings)} style={{padding: "2% 3%",border: "none",
    color: "white",
    borderRadius: "5px",
    outline: "none",
    cursor: "pointer",
    background:"#666a6af0"}}
    > Start Appointment</button>   </div>
                                    </>:null}
                                    </div>
                            }

                            {
                                  start && !completed?<><div>
                                  <Badge badgeContent={"Started"} color="secondary"  style={{marginLeft:"35px"}}></Badge>
                                  </div>
                                  <div  style={{marginTop:"10px"}}>
                                    <button onClick={() =>  endAppointment(_id, timings)} style={{padding: "2% 3%",border: "none",
    color: "white",
    borderRadius: "5px",
    outline: "none",
    cursor: "pointer",
    background:"#666a6af0"}}> End Appointment</button></div>
                                    </>
                                    :  null
                          }
                            {
                                completed ? 
                                <div>
                                <Badge badgeContent={"Completed"} color="success" style={{marginLeft:"35px"}}> </Badge></div>
                                    : null
                            }
                        </div>
                        <div className="appointmentTime bookedAppointmentTime">
                            <p>{timings.from}</p>
                            <p>-</p>
                            <p>{timings.to}</p>
                        </div>
                    </>
                    : <div onClick={(e) => {
                        changeTab();
                        dispatch({ type: 'setTimings', payload: timings });
                        dispatch({ type: 'setTimeStampTimings', payload: { from: timings.timeStampFrom, to: timings.timeStampTo } });
                    }}
                        className='appointmentTime'
                    >
                        <p>{slot}</p>
                        <p>{timings.from}</p>
                        {/* <p>-</p> */}
                        {/* <p>{timings.to}</p> */}
                    </div>
            }
        </div>
    );
}

export default TimeSlots;