import { Divider, Grid } from "@material-ui/core"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	fontPurple: {
		color: "#5C4DB1",
		fontWeight: "bold",
	},
	container: {
		padding: "0.1rem",
	},
}))

const TypeRow = ({ orderType, order }) => {
	const classes = useStyles()

	const date = new Date(order.createdAt)

	const returnOrder = () => {
		switch (orderType) {
			case "Book Again":
				return "apointment"
			case "Prescription":
				return "pres"
			case "Re-Order":
				return "order"
			default:
				break
		}
	}

	return (
		<Grid
			container
			direction="column"
			spacing={2}
			className={classes.container}
		>
			<Grid item alignItems="center" container spacing={4}>
				<Grid item xs={5}>
					<h2 style={{ fontSize: "1.4rem" }}>{order.businessName}</h2>
				</Grid>
				<Grid item xs={3}>
					<h5>{date.toLocaleDateString("en-US")}</h5>
					{/* <h5></h5> */}
				</Grid>
				<Grid item xs={4}>
					<Link to={`/user-profile/${returnOrder()}/${order._id}`}>
						<h4 className={classes.fontPurple}>{orderType}</h4>
					</Link>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
		</Grid>
	)
}

export default TypeRow
