import { Button, Grid, SwipeableDrawer } from "@material-ui/core"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles"
import ConfirmOrder from "./ConfirmOrder"

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "2rem 1rem",
	},
	img: {
		height: "55vh",
		width: "90vw",
	},
	swipe: {
		margin: "0 0.5rem",
		borderTopLeftRadius: "1rem",
		borderTopRightRadius: "1rem",
		minHeight: "30vh",
		backgroundColor: "#220555",
	},
	button: {
		backgroundColor: "#24D2BF",
		color: "white",
		padding: "0.2rem 1.5rem",
		fontSize: "1.5rem",
	},
}))

const LabOrderConfirm = () => {
	const classes = useStyles()

	const [confirm, setConfirm] = useState("")

	const image = useSelector((state) => state.prescription.image)

	return (
		<Grid
			container
			spacing={1}
			className={classes.container}
			direction="column"
		>
			<Grid item container xs={12}>
				<Grid item xs={6}>
					<h3>Patient's Name :</h3>
				</Grid>
				<Grid item xs={6}>
					<h3>Seth Meyers</h3>
				</Grid>
			</Grid>
			<Grid item container xs={12}>
				<Grid item xs={6}>
					<h3>Mobile Number : </h3>
				</Grid>
				<Grid item xs={6}>
					<h3>9876543210</h3>
				</Grid>
			</Grid>
			<Grid item container xs={12}>
				<Grid item xs={6}>
					<h3>Date and Time : </h3>
				</Grid>
				<Grid item xs={6}>
					<h3>{moment(Date.now()).format("MMM Do YYYY")}</h3>
				</Grid>
			</Grid>
			<Grid item>
				<img src={image} className={classes.img} alt="pres" />
			</Grid>
			<Grid item>
				<Button
					onClick={() => setConfirm(true)}
					size="button"
					className={classes.button}
				>
					Confirm
				</Button>
			</Grid>
			<Grid item>
				<SwipeableDrawer
					anchor="bottom"
					open={confirm}
					classes={{
						paper: classes.swipe,
					}}
				>
					<ConfirmOrder
						address="71/A belgachia Road."
						distance="2.5 km"
						name="Rajam Medical Store"
					/>
				</SwipeableDrawer>
			</Grid>
		</Grid>
	)
}

export default LabOrderConfirm
