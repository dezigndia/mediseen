import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Grid,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import Address from "./Address.jsx"
import { Link } from "react-router-dom"

const address = [
	{
		ad1: "iayskdhakdjadasdasdadwa",
		ad2: "7687989 97979797",
	},
	{
		ad1: "iayskdhakdjadasdasdadwasdadwa",
		ad2: "7687989 97979797",
	},
	{
		ad1: "iayskdhakdjadasdasdadwasdadwa",
		ad2: "7687989 97979797",
	},
]

const useStyles = makeStyles(() => ({
	container: {
		padding: "2rem 0.5rem",
		height: "auto",
		overflowY: "scroll",
	},
	divider: {
		height: "0.1rem",
		backgroundColor: "grey",
		width: "100%",
		margin: "0.5rem 0",
	},
	bold: {
		fontWeight: "bold",
	},
	formControl: {
		minWidth: "15rem",
	},
	payment: {
		fontWeight: "bold",
		fontSize: "1.2rem",
		color: "black",
	},
}))

const PaymentPharm = () => {
	const classes = useStyles()

	const [payment, setPayment] = useState(1)

	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			spacing={3}
		>
			<Grid container item>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left" }}
					item
					xs={6}
				>
					Order NO 2356
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					item
					xs={3}
				>
					26/07/20
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					item
					xs={3}
				>
					2:40 AM
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid className={classes.bold} container item>
				<Grid
					className={classes.bold}
					style={{ textAlign: "left" }}
					item
					xs={6}
				>
					Grand Total
				</Grid>
				<Grid
					className={classes.bold}
					item
					style={{ textAlign: "right" }}
					xs={6}
				>
					Rs. 430
				</Grid>
			</Grid>
			<div className={classes.divider}></div>
			<Grid
				style={{ color: "grey" }}
				item
				xs={12}
				style={{ textAlign: "left" }}
			>
				Details
			</Grid>
			<Grid container item>
				<Grid
					className={classes.bold}
					xs={6}
					style={{ textAlign: "left" }}
					item
				>
					Sunjoy Ghosh
				</Grid>
				<Grid
					className={classes.bold}
					xs={6}
					style={{ textAlign: "right" }}
					item
				>
					+91 8997767998908
				</Grid>
			</Grid>
			<Grid item container alignItems="center">
				<Grid
					style={{ textAlign: "left" }}
					className={classes.bold}
					item
					xs={6}
				>
					Delivery Address
				</Grid>
				<Grid container item xs={6} alignItems="center">
					<Grid item className={classes.bold} style={{ fontSize: "1.2rem" }}>
						Add New
					</Grid>
					<Grid item>
						<Link to="/home/pharmacyOrder/add-address">
							<AddIcon style={{ fontSize: "3rem" }} />
						</Link>
					</Grid>
				</Grid>
				<Grid spacing={2} container item direction="column">
					{address.map((addr) => (
						<Grid item>
							<Address ad1={addr.ad1} ad2={addr.ad2} />
						</Grid>
					))}
				</Grid>
				<Grid
					container
					xs={12}
					justify="space-around"
					item
					alignItems="center"
					spacing={2}
					style={{ margin: "1rem 0" }}
				>
					<Grid item>
						<InputLabel
							className={classes.payment}
							id="demo-simple-select-label"
						>
							Payment
						</InputLabel>
					</Grid>
					<Grid item>
						<FormControl className={classes.formControl}>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={payment}
								onChange={(e) => setPayment(e.target.value)}
							>
								<MenuItem value={1}>COD/UPI</MenuItem>
								<MenuItem value={2}>Twenty</MenuItem>
								<MenuItem value={3}>Thirty</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" color="primary">
						Place Order
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PaymentPharm
