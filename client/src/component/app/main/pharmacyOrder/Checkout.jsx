import React from "react"
import { Paper, Grid } from "@material-ui/core"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem 2rem",
	},
	icon: {
		color: "#2BBEC8",
		fontSize: "2rem",
		margin: "0 1rem",
	},
	check: {
		fontSize: "1.5rem",
		fontWeight: "bold",
		color: "#2BBEC8",
	},
}))

const Checkout = () => {
	const classes = useStyles()
	return (
		<Paper elevation={3}>
			<Grid
				container
				justify="center"
				alignItems="center"
				className={classes.container}
			>
				<Grid item>
					<ShoppingCartIcon className={classes.icon} />
				</Grid>
				<Grid item className={classes.check}>
					Checkout To Cart
				</Grid>
			</Grid>
		</Paper>
	)
}

export default Checkout
