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
import { useSelector } from "react-redux"
import AddIcon from "@material-ui/icons/Add"
import Address from "./Address.jsx"
import { Link, Redirect } from "react-router-dom"
import fetchCall from "../../../../fetchCall/fetchCall"

const address = [
	{
		city: "Kolkata",
		state: "West Bengal",
		country: "India",
		pincode: 808989,
		area: "71/A Belgachia",
		payment: "UPI",
	},
	{
		city: "Kol",
		state: "West",
		country: "India",
		pincode: 808989,
		area: "71/A Kolakta",
		payment: "UPI",
	},
	{
		city: "Sunderban",
		state: "West Bengal",
		country: "India",
		pincode: 808989,
		area: "71/A Sunderban",
		payment: "UPI",
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
	btn: {
		padding: "0.5rem",
		width: "10rem",
		fontSize: "1.2rem",
		backgroundColor: "#1FE1B9",
	},
}))

const PaymentPharm = () => {
	const classes = useStyles()

	const [payment, setPayment] = useState(1)

	const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsImRlZmF1bHQiOltdLCJfaWQiOiI2MDJlMDUxNzVmN2IxYjFlMWY0Y2QzMDkiLCJwaG9uZSI6Iis5MTgxNDY2MDI3OTYiLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMi0xOFQwNjoxMTozNS44OTZaIiwidXBkYXRlZEF0IjoiMjAyMS0wMi0xOFQwNjoxMTozNS44OTZaIiwiX192IjowLCJpYXQiOjE2MTM2MjkxMDd9.GGI3wV58RlxvhYzejS_mhUXuxA5QSbQ2ZmD7rot3qE4`

	const cart = useSelector((state) => state.cart)

	const products = cart.map((prod) => {
		return {
			productId: prod.item.id,
			qty: prod.qty,
		}
	})

	let totalCost = 0

	cart.map((item) => {
		totalCost = item.item.sellingPrice + totalCost
	})

	const [selected, setSelected] = useState(null)

	const [placed, setPlaced] = useState(false)

	const placeOrder = async () => {
		const body = {
			userId: "57668688w9e89",
			patientName: "Yash Sharma",
			mobileNumber: "89089898686989",
			userPhoneNumber: "787989089898989",
			date: `${Date.now()}`,
			products,
			grandTotal: totalCost,
			address: address[selected],
		}

		const data = await fetchCall("order", "POST", token, body)

		if (data.sucess === true) {
			setPlaced(true)
		}
	}

	if (placed) {
		return <Redirect to="success" />
	}

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
					Rs. {totalCost}
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
					{address.map((addr, ind) => (
						<Grid item>
							<Address
								setSelected={(value) => setSelected(value)}
								ad1={addr.area}
								ad2={`${addr.city}, ${addr.pincode}`}
								ind={ind}
								checked={selected === ind ? true : false}
							/>
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
					<Button
						onClick={placeOrder}
						className={classes.btn}
						variant="contained"
						color="primary"
					>
						Place Order
					</Button>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PaymentPharm
