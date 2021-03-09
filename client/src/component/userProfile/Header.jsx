import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Grid } from "@material-ui/core"

import DP from "./pexels-photo-220453.jpeg"

const useStyles = makeStyles((theme) => ({
	header: {
		width: "100vw",
		backgroundColor: "#220555",
		height: "10rem",
		padding: "1rem",
	},
	avatar: {
		width: "4rem",
		height: "4rem",
	},
	fontWhite: {
		color: "white",
	},
}))

const Header = ({ image, name, address }) => {
	const classes = useStyles()

	return (
		<div className={classes.header}>
			<Grid
				container
				direction="column"
				justify="space-evenly"
				alignItems="center"
				spacing={2}
			>
				<Grid item>
					<Avatar alt="Remy Sharp" className={classes.avatar} src={image} />
				</Grid>
				<Grid item>
					<h4 className={classes.fontWhite}>{name}</h4>
				</Grid>
				<Grid item>
					<h5 className={classes.fontWhite}>{address}</h5>
				</Grid>
			</Grid>
		</div>
	)
}

export default Header
