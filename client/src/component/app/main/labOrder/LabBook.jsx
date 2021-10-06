import React, { useState } from "react"
import { Grid, Button } from "@material-ui/core"
import Test from "./Test"
import clsx from "clsx"
import { Link, Redirect, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import fetchCall from "../../../../fetchCall/fetchCall"
import { emptyCartProduct } from "../../../../store/cart/cartActions"

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
	const dispatch = useDispatch()
	const [payment, setPayment] = useState(1)
	const cart = useSelector((state) => state.cart)

	const address = useSelector((state) => state.lab.address)
	const [placed, setPlaced] = useState(false)

	const products = cart.map((prod) => {
		return {
			productId: prod.item.id,
			qty: prod.qty,
		}
	})

	const totalCost = 0

	const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsImRlZmF1bHQiOltdLCJfaWQiOiI2MDJlMDUxNzVmN2IxYjFlMWY0Y2QzMDkiLCJwaG9uZSI6Iis5MTgxNDY2MDI3OTYiLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMi0xOFQwNjoxMTozNS44OTZaIiwidXBkYXRlZEF0IjoiMjAyMS0wMi0xOFQwNjoxMTozNS44OTZaIiwiX192IjowLCJpYXQiOjE2MTM2MjkxMDd9.GGI3wV58RlxvhYzejS_mhUXuxA5QSbQ2ZmD7rot3qE4`

	const handleBook = async () => {
		const img = await fetch(image)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "File name", { type: "image/jpeg" })
				return file
			})
		let form = new FormData()
		form.append("file", img)
		const res = await fetchCall("blob/upload", "POST", token, form)
		const link = res.data.payload
		let body
		if (type === "pres") {
			body = {
				userId: "57668688w9e89",
				patientName: "Yash Sharma",
				mobileNumber: "89089898686989",
				userPhoneNumber: "787989089898989",
				date: `${Date.now()}`,
				address,
				image_url: link,
			}
		} else {
			body = {
				userId: "57668688w9e89",
				patientName: "Yash Sharma",
				mobileNumber: "89089898686989",
				userPhoneNumber: "787989089898989",
				date: `${Date.now()}`,
				products,
				grandTotal: totalCost,
				address,
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
					Seth Meyers
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
					8910719124
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
					25.02.2021
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
