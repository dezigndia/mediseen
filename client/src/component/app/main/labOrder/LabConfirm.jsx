import { Grid, Paper, InputBase, Button } from "@material-ui/core"
import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Test from "./Test"
import Address from "./Address"

const tests = [
	{
		name: "Full body Test",
		price: 300,
		fasting: true,
		desc: "Internal Medicine physician",
	},
]

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem",
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
	paper: {
		display: "flex",
		alignItems: "center",
		padding: "0.2rem 0.5rem",
		width: "100%",
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontSize: "1.2rem",
		padding: "0.3rem 0.2rem",
	},
}))

const LabConfirm = () => {
	const classes = useStyles()

	const [otp, setOtp] = useState(false)

	return (
		<Grid container className={classes.container} spacing={2}>
			<Grid container item>
				{tests.map((test) => {
					return (
						<Grid item xs={12}>
							<Test
								name={test.name}
								price={test.price}
								fasting={test.fasting}
								desc={test.desc}
							/>
						</Grid>
					)
				})}
			</Grid>
			<Grid item xs={12}>
				<h3 style={{ textAlign: "center", width: "100%" }}>Confirm Details</h3>
			</Grid>
			<Grid item xs={12}>
				<Paper component="form" elevation={3} className={classes.paper}>
					<InputBase
						className={classes.input}
						placeholder="Patient's Name"
						inputProps={{ "aria-label": "search google maps" }}
					/>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Paper component="form" elevation={3} className={classes.paper}>
					<InputBase
						className={classes.input}
						placeholder="Patient's Phone Number"
						inputProps={{ "aria-label": "search google maps" }}
					/>
				</Paper>
			</Grid>
			{!otp ? (
				<Grid item xs={12}>
					<Button
						onClick={() => setOtp(true)}
						variant="contained"
						color="primary"
						onClick={() => setOtp(true)}
					>
						Send
					</Button>
				</Grid>
			) : (
				<Grid container direction="column" item xs={12} spacing={2}>
					<Grid item>
						<h4 style={{ textAlign: "left" }}>Enter SMS Code /OTP</h4>
					</Grid>
					<Grid item>
						<Paper component="form" elevation={3} className={classes.paper}>
							<InputBase
								className={classes.input}
								placeholder="Patient's Phone Number"
								inputProps={{ "aria-label": "search google maps" }}
							/>
						</Paper>
					</Grid>
				</Grid>
			)}
			<Grid item xs={12}>
				<Address ad1="71/a belgachia road" ad2="kolkata - 70037" />
			</Grid>
		</Grid>
	)
}

export default LabConfirm
