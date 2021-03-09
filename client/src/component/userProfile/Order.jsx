import React from "react"
import { Grid, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ItemTable from "./ItemTable"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import Business from "./Business"
import BusinessHeader from "./BusinessHeader"

const useStyles = makeStyles(() => ({
	container: {
		padding: "1rem 0.5rem",
		height: "auto",
		overflowY: "scroll",
	},
	payment: {
		color: "red",
		fontWeight: "bold",
	},
	bold: {
		fontWeight: "bold",
	},
	divider: {
		height: 1,
		backgroundColor: "grey",
		width: "100%",
	},
	btn: {
		padding: "0.5rem",
		width: "8rem",
		fontSize: "1.2rem",
	},
}))

const Order = () => {
	const classes = useStyles()

	return (
		<Grid container spacing={2}>
			<Grid item>
				<BusinessHeader />
			</Grid>
			<Grid container className={classes.container} item xs={12}>
				<Grid
					item
					className={classes.bold}
					xs={6}
					style={{ textAlign: "left" }}
				>
					Order NO 23456
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					xs={3}
				>
					26/07/20
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					xs={3}
				>
					2:40 AM
				</Grid>
			</Grid>
			<Grid container item>
				<Grid
					item
					xs={4}
					className={classes.payment}
					style={{ textAlign: "left" }}
				>
					COD
				</Grid>
				<Grid item xs={8} style={{ textAlign: "right", color: "gray" }}>
					Est Time Delivery : 23 Mins
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid item>
				<ItemTable />
			</Grid>
			<Grid container item>
				<Grid style={{ textAlign: "left", color: "gray" }} xs={6} item>
					Total Items : 10
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					xs={6}
					item
				>
					Rs. 100
				</Grid>
			</Grid>
			<Grid container item>
				<Grid style={{ textAlign: "left", color: "gray" }} xs={6} item>
					Delivery Charges
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					xs={6}
					item
				>
					Rs. 30
				</Grid>
			</Grid>
			<Grid container item>
				<Grid
					style={{ textAlign: "left" }}
					className={classes.bold}
					xs={6}
					item
				>
					Grand Total
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					xs={6}
					item
				>
					Rs. 130
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid container item>
				<Grid style={{ textAlign: "left", padding: "0.2rem 0" }} item xs={12}>
					Details
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left", padding: "0.5rem 0" }}
					item
					xs={6}
				>
					Sunjoy Ghosh
				</Grid>
				<Grid
					className={classes.bold}
					item
					style={{ textAlign: "right", padding: "0.5rem 0" }}
					xs={6}
				>
					+91 976976868328
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Button
						className={classes.btn}
						style={{ backgroundColor: "grey" }}
						variant="contained"
						color="primary"
					>
						Back
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Link to="/home/pharmacyOrder/payment">
						<Button
							style={{ backgroundColor: "#1FE0B9" }}
							className={classes.btn}
							variant="contained"
							color="primary"
						>
							Re-Order
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Order
