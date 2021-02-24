import { Button, Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import BeenhereIcon from "@material-ui/icons/Beenhere"
import { Link } from "react-router-dom"

const useStyles = makeStyles(() => ({
	container: {
		padding: "1rem",
	},
	paper: {
		padding: "1rem",
	},
	icon: {
		color: "#8A7FC6",
		fontSize: "2rem",
	},
	success: {
		fontWeight: "bold",
		color: "#8A7FC6",
	},
	btn: {
		padding: "0.5rem",
		width: "12rem",
		fontSize: "1rem",
		backgroundColor: "#1FE1B9",
		color: "white",
	},
	btn1: {
		padding: "0.5rem",
		width: "12rem",
		fontSize: "1rem",
		backgroundColor: "white",
		color: "#1FE1B9",
		border: "2px solid #1FE1B9",
		fontWeight: "bold",
	},
}))

const LabSuccess = () => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.container}
			spacing={5}
			direction="column"
		>
			<Grid item xs={12}>
				<Paper elevation={5}>
					<Grid
						container
						className={classes.paper}
						alignItems="center"
						spacing={3}
					>
						<Grid item container>
							<Grid item xs={12}>
								<BeenhereIcon className={classes.icon} />
							</Grid>
							<Grid item xs={12} className={classes.success}>
								<h3>Your Order was Successfull.</h3>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<h4>Lab will confirm your prescription by calling you.</h4>
						</Grid>
						<Grid item xs={12}>
							<h4>You will recieve update about order soon.</h4>
						</Grid>
						<Grid item xs={12}>
							<h4>Still you can track from below.</h4>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Button className={classes.btn1}>Track Order</Button>
			</Grid>
			<Grid item xs={12}>
				<Link to="/home">
					<Button className={classes.btn}>Continue Shopping</Button>
				</Link>
			</Grid>
		</Grid>
	)
}

export default LabSuccess
