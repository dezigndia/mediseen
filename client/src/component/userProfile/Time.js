import React, { useEffect, useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid, TextField } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addTiming } from "../../store/book-timing/timingActions"
import moment from "moment"
import { useParams } from "react-router-dom"
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

const Time = ({  date, type, clinic }) => {
	const classes = useStyles()
	const { id } = useParams()

	const [active, setActive] = useState(null)
	const [isAvailable, setAvailable] = useState([])
	const dispatch = useDispatch()

	// const day = moment().format("dddd")
const day = moment(new Date()).format("dddd")
// const day = "Monday"
// const time = currentDate.getHours()


	// const time = clinic.map((clin) => {
	// 	clin.workingHours["Monday"].evening.from.split(" ")[0]
	// })
// console.log(clinic)
// 	useEffect(() => {
// 		if (clinic) {
// 			const avail = clinic.map((clin) => {
// 				return clin.workingHours[day].evening.from.split(" ")[0] 
// 			})
// 			alert(avail)
// 			setAvailable(avail+"dfdfdf")
// 		}
// 	}, [clinic])
// console.log(isAvailable)
	return (
		<Grid container direction="column">
			{timeArray.map((time, index) => (
				<Grid container direction="column" item>
					<Grid
						onClick={() => setActive(index)}
						className={classes.container}
						item
					>
						{time}
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
								value={time.split(" ")[1]}
							/>
						</Grid>
						<Grid item xs={4}>
							<Link
								to={`/user-profile/appointment/${id}`}
							>
								<Button
									onClick={() =>
										dispatch(addTiming({ date, timing: timeArray[active] }))
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