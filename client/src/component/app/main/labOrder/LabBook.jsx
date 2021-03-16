import React, { useState } from "react"
import { Grid, Button } from "@material-ui/core"
import Test from "./Test"
import clsx from "clsx"
import { Link, Redirect, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import fetchCall from "../../../../fetchCall/fetchCall"
import { emptyCartProduct } from "../../../../store/cart/cartActions"
import fetchCallFile from "../../../../fetchCall/fetchCallFile"
import moment from "moment"

const useStyles = makeStyles((theme) => ({
	container: {
		padding: "1rem 2rem",
	},
	details: {
		fontSize: "1.2rem",
		fontWeight: "bold",
		color: "grey",
		margin: "1rem 0",
		textAlign: "left",
	},
	button1: {
		backgroundColor: "#99A6B1",
		fontSize: "1.2rem",
		padding: "0.1rem 2rem",
		color: "white",
		minWidth: "4rem",
	},
	button2: {
		backgroundColor: "#23D6BD",
		fontSize: "1.2rem",
		padding: "0.1rem 2rem",
		color: "white",
		minWidth: "4rem",
	},
}))

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const LabBook = () => {
	const tests = useSelector((state) => state.lab.tests)
	const classes = useStyles()

	const query = useQuery()

	const type = query.get("order")

	const image = useSelector((state) => state.prescription.image)
	const user = useSelector((state) => state.login)
	const dispatch = useDispatch()
	const [payment, setPayment] = useState(1)
	const cart = useSelector((state) => state.cart)

	const address = useSelector((state) => state.lab.address)
	const [placed, setPlaced] = useState(false)

	const products = cart.map((prod) => {
		return {
			productId: prod.item._id,
			qty: prod.qty,
		}
	})

	const business = useSelector((state) => state.currentStore)
	const phoneNo = useSelector((state) => state.user.phoneNo)
	const patient = useSelector((state) => state.patient) || user

	const totalCost = 0

	const token =
		useSelector((state) => state.token.token) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwNDg2NGVlYzEwYWU4YzI4ZWMzM2Y5MSIsInBob25lIjoiKzkxODkxMDcxOTE0NyIsImFkZHJlc3MiOltdLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJfX3YiOjAsImlhdCI6MTYxNTM1NzE2Nn0.9CEx3xpRyG-J4dUtxUVBrRN8Eg7UOZ7zjaFTehhRBBw"

	const handleBook = async () => {
		const img = await fetch(image)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "File name", { type: "image/jpeg" })
				return file
			})
		let form = new FormData()
		form.append("file", img)
		const res = await fetchCallFile("blob/upload", "POST", token, form)
		const link = res.data.payload
		let body
		if (type === "pres") {
			body = {
				patient: {
					firstName: patient.name.split(" ")[0],
					lastName: patient.name.split(" ")[0],
					mobileNumber: patient.phone,
				},
				date: `${Date.now()}`,
				mobileNumber: phoneNo || "8910719147",
				address,
				image_url: link.location,
				businessType: business.type,
				businessName: business.businessName,
				businessPhoneNumber: business.phone,
			}
		} else {
			body = {
				patientName: "Yash Sharma",
				mobileNumber: "89089898686989",
				patient: {
					firstName: patient.name.split(" ")[0],
					lastName: patient.name.split(" ")[0],
					mobileNumber: patient.phone,
				},
				date: `${Date.now()}`,
				products,
				grandTotal: totalCost,
				address,
				businessType: business.type,
				businessName: business.businessName,
				businessPhoneNumber: business.phone,
			}
		}
		const data = await fetchCall("order", "POST", token, body)
		console.log(data)
		if (data.sucess === true) {
			setPlaced(true)
			dispatch(emptyCartProduct())
		}
	}

	if (placed) {
		return <Redirect to="success" />
	}

	return (
		<Grid container className={classes.container} spacing={6}>
			<Grid container item>
				{tests.map((test) => {
					return (
						<Grid item xs={12}>
							<Test
								name={test.name}
								price={test.price}
								fasting={test.fasting}
								desc={test.desc}
							/>
						</Grid>
					)
				})}
			</Grid>
			<Grid item xs={12}>
				<h3 style={{ textAlign: "center", width: "100%" }}>Confirm Booking</h3>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Patient's Name
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{patient.name}
				</Grid>
			</Grid>
			<Grid container item alignItems="flex-start">
				<Grid alignContent="flex-start" className={classes.details} item xs={6}>
					Mobile
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{patient.num}
				</Grid>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Date & Time
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{moment(Date.now()).format("MMM Do YYYY")}
				</Grid>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Address
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{address.area}, {address.pincode}
				</Grid>
			</Grid>
			<Grid container direction="column" item spacing={3}>
				<Grid item style={{ fontSize: "1.5rem" }}>
					Confirm Your Booking
				</Grid>
				<Grid container item xs={12} justify="space-evenly" spacing={3}>
					<Grid item>
						<Link to="/home">
							<Button className={clsx(classes.button1)}>Back</Button>
						</Link>
					</Grid>
					<Grid item>
						<Button onClick={handleBook} className={clsx(classes.button2)}>
							Yes
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default LabBook
