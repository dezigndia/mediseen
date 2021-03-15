import React, { useEffect, useState } from "react"
import Business from "./Business"
import BusinessHeader from "./BusinessHeader"
import { Button, Grid } from "@material-ui/core"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import { Link, Redirect, useLocation, useParams } from "react-router-dom"
import fetchCall from "../../fetchCall/fetchCall"
import { useSelector } from "react-redux"

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

	const { id } = useParams()
	const [app, setApp] = useState({})

	let token = useSelector((state) => state.token.token)
	token = token
		? token
		: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo"

	useEffect(() => {
		const fetchAppointment = async () => {
			const data = await fetchCall(`appointment/id/${id}`, "GET", token).then(
				(res) => res.data.payload
			)
			setApp(data)
			console.log(data)
		}
		fetchAppointment()
	}, [])

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<BusinessHeader name={app.businessName} />
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
				<h3 style={{ textAlign: "center", width: "100%" }}>Booking Details</h3>
			</Grid>
			<Grid container item style={{ padding: "0 1rem" }}>
				<Grid className={classes.details} item xs={6}>
					Patient's Name
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{(app.patient && app.patient.firstName + app.patient.lastName) ||
						"Yash Sharma"}
				</Grid>
				<Grid container item alignItems="flex-start">
					<Grid
						alignContent="flex-start"
						className={classes.details}
						item
						xs={6}
					>
						Mobile
					</Grid>
					<Grid
						style={{ textAlign: "right" }}
						className={classes.details}
						item
						xs={6}
					>
						{(app.patient && app.patient.mobileNumber) || "8910719147"}
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
						{app.date && app.date.split("T")[0]}
					</Grid>
				</Grid>
				<Grid container item>
					<Grid className={classes.details} item xs={6}>
						Hospital/Clinic
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
			</Grid>
			<Grid item container direction="row" xs={12} justify="center" spacing={1}>
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
