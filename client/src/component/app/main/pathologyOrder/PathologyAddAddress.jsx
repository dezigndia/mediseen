import React, { useState } from "react"

import { Grid, TextField, Button } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { Link, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import fetchCall from "../../../../fetchCall/fetchCall"
import { addUser } from "../../../../store/user/userAction"

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
	btn: {
		padding: "0.5rem",
		width: "10rem",
		fontSize: "1.2rem",
		backgroundColor: "#1FE1B9",
	},
}))

const PharmAddAddress = () => {
	const classes = useStyles()

	const cart = useSelector((state) => state.cart)

	const products = cart.map((prod) => {
		return {
			productId: prod.item._id,
			qty: prod.qty,
		}
	})
	const user = useSelector((state) => state.user)

	console.log(products)

	const dispatch = useDispatch()

	let totalCost = 0

	cart.map((item) => {
		totalCost = item.item.sellingPrice * item.qty + totalCost
	})
	const [red, setRed] = useState(false)
	const [name, setName] = useState("")
	const [num, setNum] = useState("")
	const [add, setAdd] = useState("")
	const [pincode, setPincode] = useState("")

	const token =
		useSelector((state) => state.token.token) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwNDg2NGVlYzEwYWU4YzI4ZWMzM2Y5MSIsInBob25lIjoiKzkxODkxMDcxOTE0NyIsImFkZHJlc3MiOltdLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJfX3YiOjAsImlhdCI6MTYxNTM1NzE2Nn0.9CEx3xpRyG-J4dUtxUVBrRN8Eg7UOZ7zjaFTehhRBBw"

	const handleSubmit = async () => {
		let address = user.address

		address = [...address, { name, number: num, pincode, area: add }]

		const body = {
			address,
		}

		const data = await fetchCall("user", "PUT", token, body)

		if (data.sucess) {
			const user = await fetchCall("user/get/info", "GET", token).then(
				(res) => res.data.payload
			)

			dispatch(addUser(user))
			setRed(true)
		}
	}

	if (red) {
		return <Redirect to="/home/pharmacyOrder/payment" />
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
			<Grid item style={{ textAlign: "left" }}>
				Details
			</Grid>
			<Grid container item>
				<Grid item style={{ textAlign: "left" }} xs={6}>
					<h3>{user.name ? user.name : "Yash Sharma"}</h3>
				</Grid>
				<Grid item style={{ textAlign: "right" }} xs={6}>
					<h3>{user.phone}</h3>
				</Grid>
			</Grid>
			<Grid container item spacing={2}>
				{/* <Grid item xs={12}>
					<TextField
						id="outlined-basic"
						label="Delivery Address"
						variant="outlined"
						fullWidth={true}
					/>
				</Grid> */}
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Address Name"
						variant="outlined"
						fullWidth={true}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Phone Number"
						variant="outlined"
						fullWidth={true}
						value={num}
						onChange={(e) => setNum(e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Address"
						variant="outlined"
						fullWidth={true}
						value={add}
						onChange={(e) => setAdd(e.target.value)}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="outlined-basic"
						label="Pincode"
						variant="outlined"
						fullWidth={true}
						value={pincode}
						onChange={(e) => setPincode(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <Link to="/home/pharmacyOrder/payment"> */}
					<Button
						onClick={handleSubmit}
						className={classes.btn}
						variant="contained"
						color="primary"
					>
						Done
					</Button>
					{/* </Link> */}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default PharmAddAddress
