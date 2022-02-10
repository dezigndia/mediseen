import React, { useState } from "react"
import { Grid, Avatar, Paper } from "@material-ui/core"

import TimeTable from "./TimeTable"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	paper: {
		width: "100%",
		height: "5rem",
		 backgroundColor: "#F9F9F9",
	},
	container: {
		padding: ".2rem",
		height: "100%",
		width: "100%",
	},
	time: {
		color: "#6456B4",
	},
}))

const Available = ({
	image="https://thumbs.dreamstime.com/z/smiling-female-doctor-holding-medical-records-lab-coat-her-office-clipboard-looking-camera-56673035.jpg", 
	name ,
	address ,
	specialist,
	morning,
	evening,
	today,
	doctors,
	ind
}) => {
	const classes = useStyles()

	const [open, setOpen] = useState(false)

	return (
		<Paper elevation={3} className={classes.paper}>
			<Grid container alignItems="center" className={classes.container}>
				<Grid item>
					<Avatar style={{ height: "3rem", width: "3rem",position:"inherit" }} src={image} />
				</Grid>
				<Grid container direction="column" item xs={6}>
					<Grid item>
						<h4>{name}</h4>
					</Grid>
					<Grid item>
						<h5 style={{ color: "gray" }}>{specialist}</h5>
					</Grid>
				</Grid>
				{/* {morning ? (
					<Grid container item xs={4}>
						<Grid item xs={12}>
							<h5
								className={classes.time}
								style={{ width: "100%", textAlign: "right" }}
							>
								{morning}
							</h5>
						</Grid>
						<Grid item xs={12}>
							<h5
								className={classes.time}
								style={{ width: "100%", textAlign: "right" }}
							>
								{evening}
							</h5>
						</Grid>
					</Grid>
				) : (
					<Grid item xs={4}>
						<h5
							style={{ width: "100%", textAlign: "right" }}
							className={classes.time}
							onClick={() => setOpen((prev) => !prev)}
						>
							View All Timings
						</h5>
					</Grid>
				)} */}
				<Grid item xs={4}>
						<h5
							style={{ width: "100%", textAlign: "right" }}
							className={classes.time}
							onClick={() => setOpen((prev) => !prev)}
						>
							View All Timings
						</h5>
					</Grid>
			</Grid>

			{open ? (
				<Grid container item xs={12} style={{position:"relative"}}>
					<Grid item xs={12}>
					<TimeTable  ind={ind} clinic={doctors.workingHours} today={today} />
					</Grid>
				</Grid>
			) : null}
		</Paper>
	)
}

export default Available
