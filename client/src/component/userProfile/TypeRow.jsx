import { Divider, Grid } from "@material-ui/core"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	fontPurple: {
		color: "#5C4DB1",
		fontWeight: "bold",
	},
	container: {
		padding: "0.1rem",
	},
}))

const TypeRow = ({ order }) => {
	const classes = useStyles()
	return (
		<Grid
			container
			direction="column"
			spacing={2}
			className={classes.container}
		>
			<Grid item alignItems="center" container spacing={4}>
				<Grid item xs={5}>
					<h2 style={{ fontSize: "1.4rem" }}>Dr. Praksh</h2>
				</Grid>
				<Grid item xs={3}>
					<h5>06.08.2021</h5>
					<h5>ABSUH878</h5>
				</Grid>
				<Grid item xs={4}>
					<h4 className={classes.fontPurple}>{order}</h4>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
		</Grid>
	)
}

export default TypeRow
