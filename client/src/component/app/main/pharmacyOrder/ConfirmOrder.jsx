import { Grid, Divider, Button } from "@material-ui/core"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import clsx from "clsx"
import ReactStars from "react-stars"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "react-router-dom"
import fetchCall from "../../../../fetchCall/fetchCall"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
	container: {
		padding: "2rem 1rem",
	},
	name: {
		color: "white",
		fontSize: "1.1rem",
	},
	button1: {
		backgroundColor: "#99A6B1",
		fontSize: "1.2rem",
		padding: "0.1rem 2rem",
		color: "white",
	},
	button2: {
		backgroundColor: "#FFFFFF",
		fontSize: "1.2rem",
		padding: "0.1rem 2rem",
	},
}))

const ConfirmOrder = ({ name, address, stars, distance }) => {
	const classes = useStyles()
	const [flag, setFlag] = useState(false)

	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsImRlZmF1bHQiOltdLCJfaWQiOiI2MDJlMDUxNzVmN2IxYjFlMWY0Y2QzMDkiLCJwaG9uZSI6Iis5MTgxNDY2MDI3OTYiLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMi0xOFQwNjoxMTozNS44OTZaIiwidXBkYXRlZEF0IjoiMjAyMS0wMi0xOFQwNjoxMTozNS44OTZaIiwiX192IjowLCJpYXQiOjE2MTM2MjkxMDd9.GGI3wV58RlxvhYzejS_mhUXuxA5QSbQ2ZmD7rot3qE4"

	const image = useSelector((state) => state.prescription.image)
	const [placed, setPlaced] = useState(false)

	// const handleSubmit = async () => {
	// 	// const img = Buffer.from(image)

	// 	const img = await fetch(image)
	// 		.then((res) => res.blob())
	// 		.then((blob) => {
	// 			const file = new File([blob], "File name", { type: "image/jpeg" })
	// 			return file
	// 		})
	// 	let form = new FormData()
	// 	form.append("file", img)

	// const body = {
	// 	userId: "57668688w9e89",
	// 	patientName: "Yash Sharma",
	// 	mobileNumber: "89089898686989",
	// 	userPhoneNumber: "787989089898989",
	// 	date: `${Date.now()}`,
	// 	products,
	// 	grandTotal: totalCost,
	// 	address: address[selected],
	// 	image_url: link,
	// }

	// const data = await fetchCall("order", "POST", token, body)

	// if (data.sucess === true) {
	// 	setPlaced(true)
	// }

	// if (placed) {
	// 	return <Redirect to="success" />
	// }
	// }

	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			spacing={5}
		>
			<Grid container item spacing={2}>
				<Grid item spacing={1} container alignItems="center" xs={12}>
					<Grid item xs={2}>
						<Avatar alt="Cindy Baker" src="" />
					</Grid>
					<Grid xs={6} item className={classes.name}>
						{name}
					</Grid>
					<Grid item xs={4}>
						<ReactStars
							count={5}
							size={24}
							value={2}
							color1={"grey"}
							color2={"#FFC83D"}
						/>
					</Grid>
				</Grid>
				<Grid item container xs={12} justify="space-between">
					<Grid xs={8} item className={classes.name}>
						{address}
					</Grid>
					<Grid item xs={4} className={classes.name}>
						{distance}
					</Grid>
				</Grid>
			</Grid>
			<Grid container item xs={12} justify="space-evenly" spacing={3}>
				<Grid item>
					<Link to="/home">
						<Button className={clsx(classes.button1)}>No</Button>
					</Link>
				</Grid>
				<Grid item>
					<Link to="payment?order=pres">
						<Button className={clsx(classes.button2)}>Yes</Button>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ConfirmOrder
