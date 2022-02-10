// import React, { useState } from "react"

// import { makeStyles } from "@material-ui/core/styles"
// import { Button, Grid, TextField } from "@material-ui/core"
// import { useSelector, useDispatch } from "react-redux"
// import { Link } from "react-router-dom"
// import { addTiming } from "../../../../store/book-timing/timingActions"
// const useStyles = makeStyles(() => ({
// 	container: {
// 		width: "100%",
// 		border: "1px solid black",
// 		padding: "1rem",
// 		margin: "0.5rem 0",
// 		borderRadius: "0.5rem",
// 		backgroundColor: "#F9F9F9",
// 	},
// }))

// const timeArray = [
// 	"Morning 9:30 AM",
// 	"Morning 10:00 AM",
// 	"Morning 10:30 AM",
// 	"Afternoon 2:30 PM",
// 	"Afternoon 2:45 PM",
// 	"Evening 8:30 PM",
// 	"Evening 9:00 PM",
// ]

// const Time = ({ date, type, ind ,doctor}) => {
// 	const classes = useStyles()

// 	const [active, setActive] = useState(null)

// 	const dispatch = useDispatch()

// 	return (
// 		<Grid container direction="column">
// 			{timeArray.map((time, index) => (
// 				<Grid container direction="column" item>
// 					<Grid
// 						onClick={() => setActive(index)}
// 						className={classes.container}
// 						item
// 					>
// 						{time}
// 					</Grid>
// 					<Grid
// 						container
// 						item
// 						justify="space-between"
// 						alignItems="center"
// 						style={{ display: active !== index ? "none" : null }}
// 					>
// 						<Grid item xs={4}>
// 							<TextField
// 								variant="outlined"
// 								disabled={true}
// 								value={time.split(" ")[1]}
// 							/>
// 						</Grid>
// 						<Grid item xs={4}>
// 							<Link to={`/home/hospitalBooking/checkout?ind=${ind}`}>
// 								<Button
// 									onClick={() =>
// 										dispatch(addTiming({ date, timing: timeArray[active] }))
// 									}
// 									variant="contained"
// 									color="primary"
// 								>
// 									Confirm
// 								</Button>
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</Grid>
// 			))}
// 		</Grid>
// 	)
// }

// export default Time

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

const timeArray = [
	"Morning 9:30 AM",
	"Morning 10:00 AM",
	"Morning 10:30 AM",
	"Afternoon 2:30 PM",
	"Afternoon 2:45 PM",
	"Evening 8:30 PM",
	"Evening 9:00 PM",
]

const Time = ({ date, type, ind ,doctor}) => {
	const classes = useStyles()

	const [active, setActive] = useState(null)
	const [isAvailable, setAvailable] = useState([])
	const dispatch = useDispatch()

const day = moment(date).format("dddd");
// const day = "Monday"
// const time = currentDate.getHours()

	// const time = clinic.map((clin) => {
	// return	clin.workingHours[day].evening.from.split(" ")[0];
	// })

	useEffect(() => {
		if (doctor) {
			let avail = doctor && doctor.map((doctor) => {
				return doctor.workingHours[`${day}`];
			})
			let timeq=[]
			avail =avail.filter((doctor,ind) => {
				if(doctor!==undefined){
					if(doctor.morning){
					timeq.push(doctor.morning)
					}if(doctor.evening){
						timeq.push(doctor.evening)
					}
				}
				return timeq;
			})
			console.log(avail)
			setAvailable(timeq)
		}
	}, [doctor,date]);


	return (
		// <Grid container direction="column">
		// 	{timeArray.map((time, index) => (
		// 		<Grid container direction="column" item>
		// 			<Grid
		// 				onClick={() => setActive(index)}
		// 				className={classes.container}
		// 				item
		// 			>
		// 				{time}
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
		// 						value={time.split(" ")[1]}
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
		// 								dispatch(addTiming({ date, timing: timeArray[active] }))
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
		<Grid container direction="column">
			{isAvailable && isAvailable.map((time, index) => (
				<Grid container direction="column" item>
					<Grid
						onClick={() => setActive(index)}
						className={classes.container}
						item
					>
		
						{moment(time.from).format("LT")} - {moment(time.to).format("LT")}
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
								value={moment(time.from).format("LT")+"-"+moment(time.to).format("LT")}
							/>
						</Grid> 

						<Grid item xs={4}>
						<Link to={`/home/hospitalBooking/checkout?ind=${ind}`}>
								<Button
									onClick={() =>
										dispatch(addTiming({ date, timing: isAvailable[active] }))
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
			))}
		</Grid>
	)
}

export default Time

