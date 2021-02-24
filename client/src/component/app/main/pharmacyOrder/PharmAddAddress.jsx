import React from "react"

import { Grid, TextField, Button } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles(() => ({
	container: {
		padding: "2rem 0.5rem",
		height: "auto",
		overflowY: "scroll",
	},
	divider: {
		height: "0.1rem",
		backgroundColor: "grey",
		width: "100%",
		margin: "0.5rem 0",
	},
	bold: {
		fontWeight: "bold",
	},
	btn: {
		padding: "0.5rem",
		width: "10rem",
		fontSize: "1.2rem",
		backgroundColor: "#1FE1B9",
	},
}))

const PharmAddAddress = () => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			spacing={3}
		>
			<Grid container item>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left" }}
					item
					xs={6}
				>
					Order NO 2356
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					item
					xs={3}
				>
					26/07/20
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					item
					xs={3}
				>
					2:40 AM
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid className={classes.bold} container item>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left" }}
					item
					xs={6}
				>
					Grand Total
				</Grid>
				<Grid
					className={classes.bold}
					item
					style={{ textAlign: "right" }}
					xs={6}
				>
					Rs. 430
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid item style={{ textAlign: "left" }}>
				Details
			</Grid>
			<Grid container item>
				<Grid item style={{ textAlign: "left" }} xs={6}>
					<h3>Sujoy Ghosh</h3>
				</Grid>
				<Grid item style={{ textAlign: "right" }} xs={6}>
					<h3>8988997098787</h3>
				</Grid>
			</Grid>
			<Grid container item spacing={2}>
				<Grid item xs={12}>
					<TextField
						id="outlined-basic"
						label="Delivery Address"
						variant="outlined"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Delivery Address"
						variant="outlined"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Delivery Address"
						variant="outlined"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Delivery Address"
						variant="outlined"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Delivery Address"
						variant="outlined"
						fullWidth={true}
					/>
				</Grid>
				<Grid item xs={12}>
					<Link to="/home/pharmacyOrder/payment">
						<Button className={classes.btn} variant="contained" color="primary">
							Back
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PharmAddAddress
