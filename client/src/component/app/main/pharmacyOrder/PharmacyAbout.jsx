import { Grid } from "@material-ui/core"
import React, { useState } from "react"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
import Store from "./Store"
import About from "./About"

const useStyles = makeStyles((theme) => ({
	container: {
		// padding: "1rem",
	},
	heading: {
		fontSize: "1.5rem",
		color: "grey",
		margin: "0.5rem 1rem",
	},
	active: {
		color: "black",
		fontWeight: "bold",
	},
}))

const PharmacyAbout = () => {
	const classes = useStyles()

	const [active, setActive] = useState("STORE")

	return (
		<Grid container className={classes.container}>
			<Grid item container spacing={3}>
				<Grid
					item
					className={
						active === "STORE"
							? clsx(classes.active, classes.heading)
							: classes.heading
					}
					onClick={() => setActive("STORE")}
				>
					Store
				</Grid>
				<Grid
					item
					className={
						active === "ABOUT"
							? clsx(classes.active, classes.heading)
							: classes.heading
					}
					onClick={() => setActive("ABOUT")}
				>
					About
				</Grid>
			</Grid>
			<Grid item>{active === "STORE" ? <Store /> : <About />}</Grid>
		</Grid>
	)
}

export default PharmacyAbout
