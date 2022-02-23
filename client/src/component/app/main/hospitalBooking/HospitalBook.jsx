// import React, { useState } from "react"
// import { Grid, Button } from "@material-ui/core"
// import clsx from "clsx"
// import { Link, Redirect, useLocation } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import { makeStyles } from "@material-ui/core/styles"
// import fetchCall from "../../../../fetchCall/fetchCall"
// import { emptyCartProduct } from "../../../../store/cart/cartActions"
// import fetchCallFile from "../../../../fetchCall/fetchCallFile"

// const useStyles = makeStyles((theme) => ({
// 	container: {
// 		marginTop:"50px",
// 		padding: "1rem 2rem",
// 	},
// 	details: {
// 		fontSize: "1.2rem",
// 		fontWeight: "bold",
// 		color: "grey",
// 		margin: "1rem 0",
// 		textAlign: "left",
// 	},
// 	button1: {
// 		backgroundColor: "#99A6B1",
// 		fontSize: "1.2rem",
// 		padding: "0.1rem 2rem",
// 		color: "white",
// 		minWidth: "4rem",
// 	},
// 	button2: {
// 		backgroundColor: "#23D6BD",
// 		fontSize: "1.2rem",
// 		padding: "0.1rem 2rem",
// 		color: "white",
// 		minWidth: "4rem",
// 	},
// }))

// function useQuery() {
// 	return new URLSearchParams(useLocation().search)
// }

// const HospitalBook = () => {
// 	const tests = useSelector((state) => state.lab.tests)
// 	const classes = useStyles()

// 	const query = useQuery()

// 	const ind = query.get("ind")

// 	const image = useSelector((state) => state.prescription.image)
// 	const dispatch = useDispatch()
// 	const [payment, setPayment] = useState(1)
// 	const cart = useSelector((state) => state.cart)
// 	const patient = useSelector((state) => state.patient)
// 	const timing = useSelector((state) => state.timing)

// 	const address = useSelector((state) => state.lab.address)
// 	const [placed, setPlaced] = useState(false)

// 	const products = cart.map((prod) => {
// 		return {
// 			productId: prod.item.id,
// 			qty: prod.qty,
// 		}
// 	})

// 	const business = useSelector((state) => state.currentStore)

// 	const totalCost = 0

// 	const token =
// 		useSelector((state) => state.token.token) ||
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwNDg2NGVlYzEwYWU4YzI4ZWMzM2Y5MSIsInBob25lIjoiKzkxODkxMDcxOTE0NyIsImFkZHJlc3MiOltdLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJfX3YiOjAsImlhdCI6MTYxNTM1NzE2Nn0.9CEx3xpRyG-J4dUtxUVBrRN8Eg7UOZ7zjaFTehhRBBw"

// 	const handleBook = async () => {
// 		let body = {
// 			patientName: patient.name,
// 			mobileNumber: patient.num,
// 			patient: {
// 				firstName: patient.name.split(" ")[0],
// 				lastName: patient.name.split(" ")[1],
// 				mobileNumber: patient.num,
// 			},
// 			userPhoneNumber: "787989089898989",
// 			timings: { from: timing.timing },
// 			date: Date.now(),
// 			businessType: business.type,
// 			businessName: business.businessName,
// 			businessPhoneNumber: business.phone,
// 		}

// 		const data = await fetchCall("appointment", "POST", token, body)

// 		if (data.sucess === true) {
// 			setPlaced(true)
// 			dispatch(emptyCartProduct())
// 		}
// 	}

// 	if (placed) {
// 		return <Redirect to="success" />
// 	}

// 	return (
// 		<Grid  className={classes.container} spacing={6}>
// 			{/* <Grid container item>
// 				{tests.map((test) => {
// 					return (
// 						<Grid item xs={12}>
// 							<Test
// 								name={test.name}
// 								price={test.price}
// 								fasting={test.fasting}
// 								desc={test.desc}
// 							/>
// 						</Grid>
// 					)
// 				})}
// 			</Grid> */}
// 			<Grid item xs={12}>
// 				<h3 style={{ textAlign: "center", width: "100%" }}>Confirm Booking</h3>
// 			</Grid>
// 			<Grid container item>
// 				<Grid className={classes.details} item xs={6}>
// 					Patient's Name
// 				</Grid>
// 				<Grid
// 					style={{ textAlign: "right" }}
// 					className={classes.details}
// 					item
// 					xs={6}
// 				>
// 					{patient.name}
// 				</Grid>
// 			</Grid>
// 			<Grid container item alignItems="flex-start">
// 				<Grid alignContent="flex-start" className={classes.details} item xs={6}>
// 					Mobile
// 				</Grid>
// 				<Grid
// 					style={{ textAlign: "right" }}
// 					className={classes.details}
// 					item
// 					xs={6}
// 				>
// 					{patient.num}
// 				</Grid>
// 			</Grid>
// 			<Grid container item>
// 				<Grid className={classes.details} item xs={6}>
// 					Date & Time
// 				</Grid>
// 				<Grid
// 					style={{ textAlign: "right" }}
// 					className={classes.details}
// 					item
// 					xs={6}
// 				>
// 					{timing.date} {timing.timing}
// 				</Grid>
// 			</Grid>
// 			<Grid container item>
// 				<Grid className={classes.details} item xs={6}>
// 					Doctor's Name
// 				</Grid>
// 				<Grid
// 					style={{ textAlign: "right" }}
// 					className={classes.details}
// 					item
// 					xs={6}
// 				>
// 					{business.doctors[ind].name}
// 				</Grid>
// 			</Grid>
// 			<Grid container item>
// 				<Grid className={classes.details} item xs={6}>
// 					Hospital/Clinic
// 				</Grid>
// 				<Grid
// 					style={{ textAlign: "right" }}
// 					className={classes.details}
// 					item
// 					xs={6}
// 				>
// 					{business.area}
// 					{business.pincode}
// 				</Grid>
// 			</Grid>
// 			<Grid container item spacing={3}>
// 			<Grid container item xs={12} justify="space-evenly" spacing={3}>
// 				<Grid item   xs={12} style={{ fontSize: "1.2rem" }}>
// 				Confirm Your Booking
// 				</Grid>
// 				</Grid>
// 				<Grid container item xs={12} justify="space-evenly" spacing={3}>
// 					<Grid  item xs={6}>
// 						<Link to="/home">
// 							<Button className={clsx(classes.button1)}>Back</Button>
// 						</Link>
// 					</Grid>
// 					<Grid item  item xs={6} spacing={6}>
// 						<Button onClick={handleBook} className={clsx(classes.button2)}>
// 							Yes
// 						</Button>
// 					</Grid>
// 				</Grid>
// 			</Grid>
// 		</Grid>
// 	)
// }

// export default HospitalBook

import React, { useState } from "react"
import { Grid, Button } from "@material-ui/core"
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
		marginTop:"50px",
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

const HospitalBook = () => {
	const tests = useSelector((state) => state.lab.tests)
	const classes = useStyles()

	const query = useQuery()

	// const type = query.get("order")
	const ind = query.get("ind")

	const image = useSelector((state) => state.prescription.image)
	const patient = useSelector((state) => state.patient)
	const timing = useSelector((state) => state.timing)
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

	const business = useSelector((state) => state.currentStore)

	const totalCost = 0

	const token =
		useSelector((state) => state.token.token) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwNDg2NGVlYzEwYWU4YzI4ZWMzM2Y5MSIsInBob25lIjoiKzkxODkxMDcxOTE0NyIsImFkZHJlc3MiOltdLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJfX3YiOjAsImlhdCI6MTYxNTM1NzE2Nn0.9CEx3xpRyG-J4dUtxUVBrRN8Eg7UOZ7zjaFTehhRBBw"

	const handleBook = async () => {
		let body = {
			patientName: patient.name,
			mobileNumber: patient.num,
			patient: {
				firstName: patient.name.split(" ")[0],
				lastName: patient.name.split(" ")[1],
				mobileNumber: patient.num,
			},
			userPhoneNumber: "787989089898989",
			// timings: { from: timing.timing.from , to:timing.timing.to},
			// date: Date.now(),
			timings: { from: timing.timing.timeStampFrom, to:timing.timing.timeStampTo},
			date: (timing.date)._d,
			businessType: business.type,
			businessName: business.businessName,
			businessPhoneNumber: business.phone,
		}

		const data = await fetchCall("appointment", "POST", token, body)

		if (data.sucess === true) {
			setPlaced(true)
			dispatch(emptyCartProduct())
		}
	}

	if (placed) {
		return <Redirect to="success" />
	}

	return (
		<Grid  className={classes.container} spacing={6}>
			{/* <Grid container item>
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
			</Grid> */}
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

			<div>{(moment(moment(timing.date)._d)).format("DD MMM YYYY")}</div>
			{/* <span>{moment(timing.timing.from).format("LT")+"-"+moment(timing.timing.to).format("LT")}</span>	 */}
			<span>{timing.timing.from+"-"+timing.timing.to}</span>	
				</Grid>
			</Grid>
			<Grid container item>
			<Grid className={classes.details} item xs={6}>
					Doctor's Name
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{business.doctors[ind].name}
				</Grid>
			</Grid>
			<Grid container item>
				<Grid className={classes.details} item xs={6}>
					Hospital/Clinic
				</Grid>
				<Grid
					style={{ textAlign: "right" }}
					className={classes.details}
					item
					xs={6}
				>
					{business.area}, {business.pincode}
				</Grid>
			</Grid>
			<Grid container item spacing={3}>
			<Grid container item xs={12} justify="space-evenly" spacing={3}>
				<Grid item   xs={12} style={{ fontSize: "1.2rem" }}>
				Confirm Your Booking
				</Grid>
				</Grid>
				<Grid container item xs={12} justify="space-evenly" spacing={3}>
					<Grid  item xs={6}>
						<Link to="/home">
							<Button className={clsx(classes.button1)}>Back</Button>
						</Link>
					</Grid>
					<Grid item  item xs={6} spacing={6}>
						<Button onClick={handleBook} className={clsx(classes.button2)}>
							Yes
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default HospitalBook
