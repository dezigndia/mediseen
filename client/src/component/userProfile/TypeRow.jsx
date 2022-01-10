import { Button, Divider, Grid } from "@material-ui/core"
import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	fontPurple: {
		color: "#5C4DB1",
		fontWeight: "bold",
		fontSize:"12px"
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
					<h2 style={{ fontSize: "0.9rem" }}>{order.businessName}</h2>
				</Grid>
				<Grid item xs={3}>
					<h5 style={{ fontSize: "0.9rem" }}>{date.toLocaleDateString("en-US")}</h5>
				</Grid>
				<Grid item xs={4}>
					<Link to={`/user-profile/${returnOrder()}/${order._id}`}>
						<Button  style={{background:"#2BBEC8",color:"white"}}	variant="outlined" size="small" className={classes.fontPurple}>{orderType}</Button>
					
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
