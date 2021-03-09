import React from "react"
import Business from "./Business"
import BusinessHeader from "./BusinessHeader"
import { Button, Grid } from "@material-ui/core"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { Link, Redirect, useLocation } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem 2rem",
	},
	details: {
		fontSize: "1.2rem",
		fontWeight: "bold",
		color: "grey",
		margin: "1rem 0",
		textAlign: "left",
	},
	button1: {
		backgroundColor: "#99A6B1",
		fontSize: "1.2rem",
		padding: "0.1rem 2rem",
		color: "white",
		minWidth: "4rem",
	},
	button2: {
		backgroundColor: "#23D6BD",
		fontSize: "1.2rem",
		padding: "0.1rem 2rem",
		color: "white",
		minWidth: "4rem",
	},
}))

const Appointment = () => {
	const classes = useStyles()

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<BusinessHeader />
			</Grid>
			<Grid item xs={12}>
				<Business
					name={"Dr. Prakash"}
					price={300}
					time={"6pm-10pm"}
					desc={"Internal Medicine"}
				/>
			</Grid>
			<Grid item xs={12}>
				<h3 style={{ textAlign: "center", width: "100%" }}>Confirm Booking</h3>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Patient's Name
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					Seth Meyers
				</Grid>
			</Grid>
			<Grid container item alignItems="flex-start">
				<Grid alignContent="flex-start" className={classes.details} item xs={6}>
					Mobile
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					8910719124
				</Grid>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Date & Time
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					25.02.2021
				</Grid>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Address
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{"71/A, Belgachia Road"}, {700037}
				</Grid>
			</Grid>
			<Grid container direction="row" xs={12} justify="center" spacing={1}>
				<Grid item>
					<Button
						style={{
							backgroundColor: "#C8C8C8",
							color: "white",
							padding: "0.5rem 1rem",
							fontSize: "1.1rem",
						}}
					>
						Review
					</Button>
				</Grid>
				<Grid item>
					<Button
						style={{
							backgroundColor: "#22D8BC",
							color: "white",
							padding: "0.5rem 1rem",
							fontSize: "1.1rem",
						}}
					>
						Book Again
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Appointment
