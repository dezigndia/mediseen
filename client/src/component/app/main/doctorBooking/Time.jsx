import React, { useEffect, useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid, TextField } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addTiming } from "../../../../store/book-timing/timingActions"
import moment from "moment"
const useStyles = makeStyles(() => ({
	container: {
		width: "100%",
		border: "1px solid black",
		padding: "1rem",
		margin: "0.5rem 0",
		borderRadius: "0.5rem",
		backgroundColor: "#F9F9F9",
	},
}))

// const timeArray = [
// 	"Morning 9:30 AM",
// 	"Morning 10:00 AM",
// 	"Morning 10:30 AM",
// 	"Afternoon 2:30 PM",
// 	"Afternoon 2:45 PM",
// 	"Evening 8:30 PM",
// 	"Evening 9:00 PM",
// ]

// const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturdy",
// ]

const makeAppointmentSlotsArray = (slotArr, startTime, endTime, hospitalName, timeSlotPerPatient,slot) => {

    endTime = new Date(endTime);
    var temp_time = new Date(startTime)

    //pushing to the array in the interval of 30 minutes
    while (temp_time < endTime) {
        let next_temp_time = new Date(temp_time.getTime() + timeSlotPerPatient * 60 * 1000) //added 30 minutes , fix this

        let current_hrs = temp_time.getHours();
        let current_suffix = current_hrs >= 12 ? 'pm' : 'am';
        current_hrs = current_hrs > 12 ? current_hrs - 12 : current_hrs;
        let current_mins = temp_time.getMinutes();
        current_mins = current_mins <= 9 ? `0${current_mins}` : current_mins;

        let next_hrs = endTime.getHours();
        let next_suffix = next_hrs >= 12 ? 'pm' : 'am';
        next_hrs = next_hrs >= 12 ? next_hrs - 12 : next_hrs;
        let next_mins = endTime.getMinutes();
        next_mins = next_mins <= 9 ? `0${next_mins}` : next_mins;

        slotArr.push({
            from: `${current_hrs}:${current_mins} ${current_suffix}`,
            to: `${next_hrs}:${next_mins} ${next_suffix}`,
            hospitalName,
            timeSlotPerPatient,
			slot,
		   timeStampFrom: temp_time,
           timeStampTo: next_temp_time,
        })
        temp_time = next_temp_time;
		slot=slot;
    }
}

const Time = ({ date, type, clinic,day }) => {
	const classes = useStyles()

	const [active, setActive] = useState(null)
	const [isAvailable, setAvailable] = useState([])
	const dispatch = useDispatch()
   const [clinicData, setClinicData]=useState([clinic]);
   const [appointmentSlots, setAppointmentSlots] = useState(null);
// const day = moment(date).format("dddd");



let morningShift = [], eveningShift = [];
let time = clinicData.filter(item => item.status === "accepted").map(item => ({ workingHours: item.workingHours[day], hospitalName: item.name, timeSlotPerPatient: item.timePerSlot,slot:day }));
console.log(time)
let Morning="Morning";
let Evening ="Evening";
time && time.forEach(item => {
	if (item.workingHours !== undefined) {
		console.log(JSON.stringify(item.workingHours))
		makeAppointmentSlotsArray(morningShift, item.workingHours.morning.from, item.workingHours.morning.to, item.hospitalName, item.timeSlotPerPatient,Morning);
        makeAppointmentSlotsArray(eveningShift, item.workingHours.evening.from, item.workingHours.evening.to, item.hospitalName, item.timeSlotPerPatient,Evening);
	}
});

// setTimings(morningShift.concat(eveningShift));

let Timings = morningShift.concat(eveningShift), appSlots = [];
// const day = "Monday"
// const time = currentDate.getHours()

	// const time = clinic.map((clin) => {
	// return	clin.workingHours[day].evening.from.split(" ")[0];
	// })

	useEffect(() => {
		if (clinicData) {
			let avail = clinicData && clinicData.map((clin) => {
				return clin.workingHours[`${day}`];
			})
			let timeq=[]
			avail =avail.filter((clin,ind) => {
				if(clin!==undefined){
					if(clin.morning){
					timeq.push(clin.morning)
					}if(clin.evening){
						timeq.push(clin.evening)
					}
				}
				return timeq;
			})
			setAvailable(timeq)
		}
	}, [clinicData,date]);


	return (
		<Grid container direction="column">
			{Timings.map((time, index) => (
				<Grid container direction="column" item>
					<Grid
						onClick={() => setActive(index)}
						className={classes.container}
						item
					>
						{time.slot}	{time.from}
					</Grid>
					<Grid
						container
						item
						justify="space-between"
						alignItems="center"
						style={{ display: active !== index ? "none" : null }}
					>
						<Grid item xs={4}>
							<TextField
								variant="outlined"
								disabled={true}
								// value={time.split(" ")[1]}
								value={time.from}
							/>
						</Grid>
						<Grid item xs={4}>
							<Link
								to={`/home/doctorBooking/checkout?${
									type === "doc" ? "order=doc" : ""
								}`}
							>
								<Button
									onClick={() =>
										dispatch(addTiming({ date, timing: Timings[active] }))
									}
									variant="contained"
									color="primary"
								>
									Confirm
								</Button>
							</Link>
						</Grid>
					</Grid>
				</Grid>
		// <Grid container direction="column">
		// 	{isAvailable && isAvailable.map((time, index) => (
		// 		<Grid container direction="column" item>
		// 			<Grid
		// 				onClick={() => setActive(index)}
		// 				className={classes.container}
		// 				item
		// 			>
		
		// 				{moment(time.from).format("LT")} - {moment(time.to).format("LT")}
		// 			</Grid>
		// 			<Grid
		// 				container
		// 				item
		// 				justify="space-between"
		// 				alignItems="center"
		// 				style={{ display: active !== index ? "none" : null }}
		// 			>
		// 				<Grid item xs={4}>
		// 					<TextField
		// 						variant="outlined"
		// 						disabled={true}
		// 						// value={time.split(" ")[1]}
		// 						value={moment(time.from).format("LT")+"-"+moment(time.to).format("LT")}
		// 					/>
		// 				</Grid> 

		// 				<Grid item xs={4}>
		// 					<Link
		// 						to={`/home/doctorBooking/checkout?${
		// 							type === "doc" ? "order=doc" : ""
		// 						}`}
		// 					>
		// 						<Button
		// 							onClick={() =>
		// 								dispatch(addTiming({ date, timing: isAvailable[active] }))
		// 							}
		// 							variant="contained"
		// 							color="primary"
		// 						>
		// 							Confirm
		// 						</Button>
		// 					</Link>
		// 				</Grid>
		// 			</Grid>
		// 		</Grid>
			))}
		</Grid>
	)
}

export default Time
