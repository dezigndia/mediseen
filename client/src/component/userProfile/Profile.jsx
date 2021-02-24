import React from "react"
import clsx from "clsx"
import Header from "./Header"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	fontGrey: {
		color: "#404040",
	},
}))

const Profile = () => {
	const classes = useStyles()

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item>
				<Header />
			</Grid>
			<Grid item alignContent="flex-start">
				<h3 className={classes.fontGrey}>My Records </h3>
			</Grid>
		</Grid>
	)
}

export default Profile
