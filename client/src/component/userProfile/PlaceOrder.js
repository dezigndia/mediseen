import React, { useState,useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import {
	Grid,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Button,
} from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import AddIcon from "@material-ui/icons/Add"
import Address from "./Address.jsx"
import { Link, Redirect, useLocation } from "react-router-dom"
import fetchCall from "../../fetchCall/fetchCall"
import { emptyCartProduct } from "../../store/cart/cartActions"
import fetchCallFile from "../../fetchCall/fetchCallFile.js"
import { useParams } from "react-router-dom"

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
		padding: "4rem 0.5rem",
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

function useQuery() {
	return new URLSearchParams(useLocation().search)
}

const PlaceOrder = () => {
	const classes = useStyles()
	const query = useQuery()

	 const type = query.get("order")

    
//alert(type)
	const [flag, setFlag] = useState(false)

	const image = useSelector((state) => state.prescription.image)
	const { id } = useParams()
	const [payment, setPayment] = useState(1)

    const [order, setOrder] = useState([])
	let token =
		useSelector((state) => state.token.token) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwNDg2NGVlYzEwYWU4YzI4ZWMzM2Y5MSIsInBob25lIjoiKzkxODkxMDcxOTE0NyIsImFkZHJlc3MiOltdLCJjcmVhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJ1cGRhdGVkQXQiOiIyMDIxLTAzLTEwVDA2OjE5OjI2LjY5MloiLCJfX3YiOjAsImlhdCI6MTYxNTM1NzE2Nn0.9CEx3xpRyG-J4dUtxUVBrRN8Eg7UOZ7zjaFTehhRBBw"

	// const business = useSelector((state) => state.currentStore)

    useEffect(() => {
		const fetchOrder = async () => {
			const data = await fetchCall(`order/id/${id}`, "GET", token).then(
				(res) => res.data.payload
			)
			setOrder(data)
		}
		fetchOrder()
	}, [])

	const businessType = order.businessType?order.businessType:null
    const businessName = order.businessName?order.businessName:null
    const  businessPhoneNumber = order.businessPhoneNumber?order.businessPhoneNumber:null

	const cart = useSelector((state) => state.cart)
console.log(cart)
	const products =order.products?.map((prod) => {
		return {
			productId: prod.productId,
			name:prod.name,
			qty: prod.qty,
			sellingPrice:prod.sellingPrice,
		}
	})
	const user = useSelector((state) => state.user)
	console.log(products)

	const dispatch = useDispatch()

	let totalCost = 0

	order.products?.map((item) => {
		totalCost = item.sellingPrice * item.qty + totalCost
	})

	const [selected, setSelected] = useState(null)

	const [placed, setPlaced] = useState(false)

	const placeOrder = async () => {
		// const img = Buffer.from(image)

		const img = await fetch(image)
			.then((res) => res.blob())
			.then((blob) => {
				const file = new File([blob], "File name", { type: "image/jpeg" })
				return file
			})
		let form = new FormData()
		form.append("file", img)

		const res = await fetchCallFile("blob/upload", "POST", token, form, "file")

		console.log(res)

		const link = res.data.payload.location

		let body
		if (order.isPrescription ===true) {
			body = {
				userId:user._id,
				patientName: user.name,
				mobileNumber: user.phone,
				userPhoneNumber:  user.phone,
				date: Date.now(),
				address: address[selected],
				image_url: order.image_url,
                businessType: businessType,
				businessName: businessName,
				businessPhoneNumber:businessPhoneNumber,
				isPrescription:true
			}
		} else {
			body = {
				userId:user._id,
				patientName: user.name,
				mobileNumber: user.phone,
				userPhoneNumber:  user.phone,
				date: Date.now(),
				products,
				grandTotal: totalCost,
				address: address[selected],
				businessType: businessType,
				businessName: businessName,
				businessPhoneNumber:businessPhoneNumber,
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
		return <Redirect to="/user-profile/success" />
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
						{/* Order NO {Date.now()} */}
						{moment(Date.now()).format("MMM Do YYYY")}
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					item
					xs={3}
				>
					{/* {moment(Date.now()).format("MMM Do YYYY")} */}
				</Grid>
				<Grid
					className={classes.bold}
					style={{ textAlign: "right" }}
					item
					item
					xs={3}
				>
					{moment(Date.now()).format("LT")}
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
            <Grid className={classes.bold} container item>
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
					{user.name ? user.name : "Yash Sharma"}
				</Grid>
				<Grid
					className={classes.bold}
					xs={6}
					style={{ textAlign: "right" }}
					item
				>
					{user.phone}
				</Grid>
			</Grid></Grid>
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
						<Link to="/user-profile/add-address">
							<AddIcon style={{ fontSize: "3rem" }} />
						</Link>
					</Grid>
				</Grid>
				<Grid spacing={2} container item direction="column">
					{user.address.map((addr, ind) => (
						<Grid item>
							<Address
								setSelected={(value) => setSelected(value)}
								ad1={addr.name}
								ad2={`${addr.area}, ${addr.pincode}`}
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

export default PlaceOrder