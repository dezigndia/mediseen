import React from "react"
import CameraAltIcon from "@material-ui/icons/CameraAltOutlined"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import {
	Grid,
	TextField,
	Checkbox,
	FormControlLabel,
	Button,
} from "@material-ui/core"
const useStyles = makeStyles(() => ({
	container: {
		padding: "1rem 2rem",
	},
	image: {
		padding: "1rem",
		border: "1px solid gray",
		borderRadius: "1rem",
		width: "5rem",
	},
	btn: {
		fontSize: "1.2rem",
		backgroundColor: "#29C17E",
		color: "white",
		padding: "0.5rem 2rem",
	},
}))

const LabBooking = () => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			xs={12}
			spacing={2}
		>
			<Grid container direction="column" xs={2} item>
				<Grid item className={classes.image}>
					<CameraAltIcon color="disabled" fontSize="large" />
				</Grid>
				<Grid item>
					<h5 style={{ textAlign: "center", margin: "0.5rem 0" }}>
						Add images
					</h5>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<TextField id="standard-basic" label="Test Name" fullWidth={true} />
			</Grid>
			<Grid item xs={12}>
				<TextField id="standard-basic" label="CBC, WBC, RBC" fullWidth={true} />
			</Grid>
			<Grid container item spacing={1} xs={12}>
				<Grid item xs={6}>
					<TextField id="standard-basic" label="Rs. 2500" fullWidth={true} />
				</Grid>
				<Grid item xs={6}>
					<TextField id="standard-basic" label="Rs. 1250" fullWidth={true} />
				</Grid>
			</Grid>
			<Grid container item spacing={1} xs={12}>
				<Grid item xs={6}>
					<TextField id="standard-basic" label="10" fullWidth={true} />
				</Grid>
				<Grid item xs={6}>
					<TextField id="standard-basic" label="Tests" fullWidth={true} />
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<TextField id="standard-basic" label="Lorem Ipsum" fullWidth={true} />
			</Grid>
			<Grid item alignContent="flex-start">
				<FormControlLabel
					control={<Checkbox checked={true} />}
					label="Fasting required"
				/>
			</Grid>
			<Grid item>
				<Link to="/home/labOrder">
					<Button className={classes.btn} variant="contained">
						BOOK
					</Button>
				</Link>
			</Grid>
		</Grid>
	)
}

export default LabBooking
