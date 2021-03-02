import React from "react"
import clsx from "clsx"
import Header from "./Header"
import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import TypeCard from "./TypeCard"
import ContactManager from "./ContactManager"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import FacebookIcon from "@material-ui/icons/Facebook"
import TwitterIcon from "@material-ui/icons/Twitter"
import YouTubeIcon from "@material-ui/icons/YouTube"

const useStyles = makeStyles((theme) => ({
	fontGrey: {
		color: "#404040",
		textAlign: "left",
	},
	container: {
		padding: "1rem 1rem",
	},
	paper: {
		padding: "1rem 1rem",
	},
	fontGreen: {
		color: "#2CBEC8",
		fontWeight: "bold",
		margin: "0 0.1rem",
		textAlign: "left",
	},
	fb: {
		color: "#1677E5",
	},
	twitter: {
		color: "#00CBF5",
	},
	yt: {
		color: "#FF0000",
	},
}))

const Profile = () => {
	const classes = useStyles()

	return (
		<Grid container direction="column">
			<Grid item>
				<Header />
			</Grid>
			<Grid
				container
				item
				direction="column"
				spacing={2}
				className={classes.container}
			>
				<Grid item>
					<h3 className={classes.fontGrey}>My Records</h3>
				</Grid>
				<Grid item>
					<TypeCard type="My Apointments" />
				</Grid>
				<Grid item>
					<TypeCard type="Prescriptions" />
				</Grid>
				<Grid item>
					<TypeCard type="Orders" />
				</Grid>
				<Grid item>
					<ContactManager />
				</Grid>
				<Grid item xs={12}>
					<Paper elevation={3} className={classes.paper}>
						<Grid container alignItems="center" xs={12}>
							<Grid item xs={2}>
								<ExitToAppIcon className={classes.fontGreen} />
							</Grid>
							<Grid item xs={10}>
								<h3 className={classes.fontGreen}>Sign Out</h3>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper elevation={3} className={classes.paper}>
						<Grid container alignItems="center" xs={12}>
							<Grid item xs={6}>
								<h3 className={classes.fontGreen}>Social Media</h3>
							</Grid>
							<Grid item xs={2}>
								<FacebookIcon className={classes.fb} />
							</Grid>
							<Grid item xs={2}>
								<TwitterIcon className={classes.twitter} />
							</Grid>
							<Grid item xs={2}>
								<YouTubeIcon className={classes.yt} />
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Profile
