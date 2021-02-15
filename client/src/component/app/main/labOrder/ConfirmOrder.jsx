import { Grid, Button } from "@material-ui/core"
import React from "react"
import clsx from "clsx"
import ReactStars from "react-stars"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles(() => ({
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
					<Link to="">
						<Button className={clsx(classes.button2)}>Yes</Button>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ConfirmOrder
