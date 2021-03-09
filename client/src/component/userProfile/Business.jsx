import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Grid, Avatar } from "@material-ui/core"
const useStyles = makeStyles(() => ({
	container: {
		backgroundColor: "#F9F9F9",
		padding: "1rem",
	},
	price: {
		backgroundColor: "#5C4DB1",
		width: "4rem",
		borderRadius: "2rem",
		color: "white",
		textAlign: "center",
		fontSize: "0.9rem",
		marginTop: "0.5rem",
	},
}))

const Business = ({ name, fasting, price, desc }) => {
	const classes = useStyles()

	return (
		<Grid
			container
			className={classes.container}
			spacing={2}
			direction="column"
		>
			<Grid container item xs={12} alignItems="center" spacing={2}>
				<Grid itemxs={4}>
					<Avatar
						alt="Remy Sharp"
						className={classes.avatar}
						src={
							"http://thyroid-endocrine.com/wp-content/uploads/2017/02/dr-profile-pic.png"
						}
					/>
				</Grid>
				<Grid item style={{ textAlign: "left" }} xs={8}>
					<h3>{name}</h3>
				</Grid>
			</Grid>
			<Grid
				style={{
					textAlign: "left",
					color: "grey",
				}}
				item
				xs={12}
			>
				<h4>{desc}</h4>
			</Grid>
			<Grid item container justify="space-between" alignItems="center">
				<Grid item className={classes.price}>
					<h5>Rs. {price}</h5>
				</Grid>
				<Grid item>
					{fasting ? (
						<h5 style={{ marginTop: "0.5rem" }}>Fasting Required</h5>
					) : (
						<h5>Fasting Not Required</h5>
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Business
